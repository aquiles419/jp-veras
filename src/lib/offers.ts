import {
  buildPaginatedMeta,
  getAuthHeaders,
  getUserId,
  parseTotalFromContentRange,
} from './http';
import type {
  GetOffersOptions,
  OfferRecord,
  PaginatedResponse,
  StorefrontStats,
} from './types';

const API_BASE =
  process.env.API_BASE_URL ?? 'https://disparapromo.com.br/api/database/records';

const OFFER_SELECT = [
  'id',
  'product_id',
  'product_url',
  'source_url',
  'platform_id',
  'category',
  'title',
  'price',
  'price_original',
  'installments',
  'rating',
  'reviews_count',
  'sales_count',
  'store_name',
  'image_url',
  'has_coupon',
  'coupon_codes',
  'coupon_urls',
  'coupon_description',
  'raw_caption',
  'status',
  'received_at',
  'preco_extenso',
  'is_international',
].join(',');

const USER_FEED_LOG_SELECT = [
  'id',
  'offer_hash',
  'title',
  'price',
  'image_url',
  'category',
  'created_at',
  'platforms(name)',
].join(',');

type UserFeedLogRow = {
  id: string;
  offer_hash: string;
  title: string;
  price: number;
  image_url: string | null;
  category: string | null;
  created_at: string;
  platforms: { name: string } | null;
};

export class OfferService {
  static async getOffers(
    options: GetOffersOptions = {}
  ): Promise<PaginatedResponse<OfferRecord>> {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 12;

    if (page < 1) throw new Error('page deve ser >= 1');
    if (pageSize < 1) throw new Error('pageSize deve ser >= 1');

    const offset = (page - 1) * pageSize;

    try {
      const params = new URLSearchParams();
      params.set('select', OFFER_SELECT);
      params.set(
        'order',
        options.sortBy === 'preco' ? 'price.asc,id.asc' : 'received_at.desc,id.asc'
      );
      params.set('limit', String(pageSize));
      params.set('offset', String(offset));

      if (options.onlyWithCoupons) {
        params.set('has_coupon', 'eq.true');
      }
      if (options.category) {
        params.set('category', `eq.${options.category}`);
      }
      if (options.storeName) {
        params.set('store_name', `eq.${options.storeName}`);
      }
      if (options.search?.trim()) {
        params.set('title', `ilike.*${options.search.trim()}*`);
      }

      const response = await fetch(`${API_BASE}/offers?${params.toString()}`, {
        headers: {
          ...getAuthHeaders(),
          Prefer: 'count=exact',
        },
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Falha ao buscar offers (${response.status}): ${body}`);
      }

      const total = parseTotalFromContentRange(response.headers.get('content-range'));
      const raw = (await response.json()) as unknown;

      if (!Array.isArray(raw)) {
        throw new Error('Resposta de offers inválida: esperado um array');
      }

      return {
        data: raw as OfferRecord[],
        ...buildPaginatedMeta(total, page, pageSize),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`OfferService.getOffers: ${message}`);
    }
  }

  /**
   * Feed pessoal: as ofertas efetivamente enviadas (offer_logs) ao usuário
   * da env, na mesma ordem/itens da vitrine deles, enriquecidas com os
   * dados completos de `offers` (desconto, avaliação, cupom) via `offer_hash`.
   */
  static async getUserFeed(
    options: GetOffersOptions = {}
  ): Promise<PaginatedResponse<OfferRecord>> {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 12;

    if (page < 1) throw new Error('page deve ser >= 1');
    if (pageSize < 1) throw new Error('pageSize deve ser >= 1');

    const offset = (page - 1) * pageSize;

    try {
      const params = new URLSearchParams();
      const select = options.storeName
        ? USER_FEED_LOG_SELECT.replace('platforms(', 'platforms!inner(')
        : USER_FEED_LOG_SELECT;
      params.set('select', select);
      params.set('user_id', `eq.${getUserId()}`);
      params.set('status', 'eq.sent');
      params.set(
        'order',
        options.sortBy === 'preco' ? 'price.asc,id.asc' : 'created_at.desc,id.asc'
      );
      params.set('limit', String(pageSize));
      params.set('offset', String(offset));

      if (options.category) params.set('category', `eq.${options.category}`);
      if (options.search?.trim()) params.set('title', `ilike.*${options.search.trim()}*`);
      if (options.storeName) params.set('platforms.name', `eq.${options.storeName}`);

      const response = await fetch(`${API_BASE}/offer_logs?${params.toString()}`, {
        headers: {
          ...getAuthHeaders(),
          Prefer: 'count=exact',
        },
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Falha ao buscar offer_logs (${response.status}): ${body}`);
      }

      const total = parseTotalFromContentRange(response.headers.get('content-range'));
      const logs = (await response.json()) as UserFeedLogRow[];

      const seenHashes = new Set<string>();
      const dedupedLogs = logs.filter((log) => {
        if (seenHashes.has(log.offer_hash)) return false;
        seenHashes.add(log.offer_hash);
        return true;
      });

      const offersById = new Map<string, OfferRecord>();
      if (dedupedLogs.length) {
        const offerParams = new URLSearchParams();
        offerParams.set('select', OFFER_SELECT);
        offerParams.set(
          'id',
          `in.(${dedupedLogs.map((log) => log.offer_hash).join(',')})`
        );

        const offersResponse = await fetch(`${API_BASE}/offers?${offerParams.toString()}`, {
          headers: getAuthHeaders(),
          next: { revalidate: 60 },
        });

        if (offersResponse.ok) {
          const rows = (await offersResponse.json()) as OfferRecord[];
          for (const row of rows) offersById.set(row.id, row);
        }
      }

      const data: OfferRecord[] = dedupedLogs.map((log) => {
        const base = offersById.get(log.offer_hash);
        return {
          id: log.offer_hash,
          product_id: base?.product_id ?? null,
          product_url: base?.product_url ?? null,
          source_url: base?.source_url ?? null,
          platform_id: base?.platform_id ?? null,
          category: log.category ?? base?.category ?? null,
          title: log.title,
          price: log.price,
          price_original: base?.price_original ?? null,
          installments: base?.installments ?? null,
          rating: base?.rating ?? null,
          reviews_count: base?.reviews_count ?? null,
          sales_count: base?.sales_count ?? null,
          store_name: log.platforms?.name ?? base?.store_name ?? null,
          image_url: log.image_url ?? base?.image_url ?? null,
          has_coupon: base?.has_coupon ?? false,
          coupon_codes: base?.coupon_codes ?? null,
          coupon_urls: base?.coupon_urls ?? null,
          coupon_description: base?.coupon_description ?? null,
          raw_caption: base?.raw_caption ?? null,
          status: base?.status ?? null,
          received_at: log.created_at,
          preco_extenso: base?.preco_extenso ?? null,
          is_international: base?.is_international ?? null,
        };
      });

      return {
        data,
        ...buildPaginatedMeta(total, page, pageSize),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`OfferService.getUserFeed: ${message}`);
    }
  }

  static async getOfferById(id: string): Promise<OfferRecord | null> {
    try {
      const params = new URLSearchParams();
      params.set('select', OFFER_SELECT);
      params.set('id', `eq.${id}`);
      params.set('limit', '1');

      const response = await fetch(`${API_BASE}/offers?${params.toString()}`, {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Falha ao buscar oferta (${response.status}): ${body}`);
      }

      const raw = (await response.json()) as unknown;
      if (!Array.isArray(raw) || raw.length === 0) return null;
      return raw[0] as OfferRecord;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`OfferService.getOfferById: ${message}`);
    }
  }

  /** Categorias, lojas e agregados a partir de uma amostra recente. */
  static async getStorefrontStats(): Promise<StorefrontStats> {
    const result = await this.getUserFeed({ page: 1, pageSize: 100 });

    const categoryCounts = new Map<string, number>();
    for (const offer of result.data) {
      if (!offer.category) continue;
      categoryCounts.set(offer.category, (categoryCounts.get(offer.category) ?? 0) + 1);
    }
    const categories = [...categoryCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

    const stores = [
      ...new Set(result.data.map((o) => o.store_name).filter(Boolean) as string[]),
    ].sort((a, b) => a.localeCompare(b, 'pt-BR'));

    const discounted = result.data.filter(
      (o) => o.price_original != null && o.price_original > o.price
    );
    const avgDiscountPct = discounted.length
      ? Math.round(
          discounted.reduce(
            (sum, o) => sum + (1 - o.price / (o.price_original as number)) * 100,
            0
          ) / discounted.length
        )
      : 0;

    return { categories, stores, avgDiscountPct, storeCount: stores.length };
  }
}

export function getOffers(options?: GetOffersOptions) {
  return OfferService.getOffers(options);
}

export function getUserFeed(options?: GetOffersOptions) {
  return OfferService.getUserFeed(options);
}

export function getOfferById(id: string) {
  return OfferService.getOfferById(id);
}
