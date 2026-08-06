import {
  buildPaginatedMeta,
  getAuthHeaders,
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
        options.sortBy === 'preco' ? 'price.asc' : 'received_at.desc'
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
    const result = await this.getOffers({ page: 1, pageSize: 100 });

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

export function getOfferById(id: string) {
  return OfferService.getOfferById(id);
}
