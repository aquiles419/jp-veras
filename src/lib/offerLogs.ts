import {
  buildPaginatedMeta,
  getAuthHeaders,
  getUserId,
  parseTotalFromContentRange,
} from './http';
import type {
  GetOfferLogsOptions,
  OfferLogMetadata,
  OfferLogRecord,
  PaginatedResponse,
} from './types';

const API_BASE =
  process.env.API_BASE_URL ?? 'https://disparapromo.com.br/api/database/records';

const OFFER_LOG_SELECT = [
  'id',
  'offer_hash',
  'short_id',
  'title',
  'price',
  'image_url',
  'target_url',
  'created_at',
  'category',
  'platforms(name,logo_url)',
].join(',');

export class OfferLogService {
  static async getByUserId(
    options: GetOfferLogsOptions = {}
  ): Promise<PaginatedResponse<OfferLogRecord>> {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 20;

    if (page < 1) throw new Error('page deve ser >= 1');
    if (pageSize < 1) throw new Error('pageSize deve ser >= 1');

    const offset = (page - 1) * pageSize;

    try {
      const params = new URLSearchParams();
      params.set('select', OFFER_LOG_SELECT);
      params.set('user_id', `eq.${getUserId()}`);
      params.set('status', `eq.${options.status ?? 'sent'}`);
      params.set('order', 'created_at.desc');
      params.set('limit', String(pageSize));
      params.set('offset', String(offset));

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
      const raw = (await response.json()) as unknown;

      if (!Array.isArray(raw)) {
        throw new Error('Resposta de offer_logs inválida: esperado um array');
      }

      return {
        data: raw as OfferLogRecord[],
        ...buildPaginatedMeta(total, page, pageSize),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`OfferLogService.getByUserId: ${message}`);
    }
  }

  /**
   * URL de conversão rastreada (metadata.converted_url) do envio mais recente
   * dessa oferta para o usuário da env. Retorna null se a oferta nunca foi
   * enviada a esse usuário.
   */
  static async getConvertedUrl(offerHash: string): Promise<string | null> {
    try {
      const params = new URLSearchParams();
      params.set('select', 'metadata');
      params.set('offer_hash', `eq.${offerHash}`);
      params.set('user_id', `eq.${getUserId()}`);
      params.set('order', 'created_at.desc');
      params.set('limit', '1');

      const response = await fetch(`${API_BASE}/offer_logs?${params.toString()}`, {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Falha ao buscar offer_logs (${response.status}): ${body}`);
      }

      const raw = (await response.json()) as { metadata: OfferLogMetadata | null }[];
      return raw[0]?.metadata?.converted_url ?? null;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`OfferLogService.getConvertedUrl: ${message}`);
    }
  }
}

export function getOfferLogs(options?: GetOfferLogsOptions) {
  return OfferLogService.getByUserId(options);
}
