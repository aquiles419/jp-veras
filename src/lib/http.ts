export function getAuthHeaders(): HeadersInit {
  const token = process.env.BEARER_TOKEN;
  if (!token) {
    throw new Error('BEARER_TOKEN não definido. Configure no arquivo .env');
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
}

/** Ex.: "0-4/73007" → 73007 */
export function parseTotalFromContentRange(contentRange: string | null): number {
  if (!contentRange) return 0;
  const match = contentRange.match(/\/(\d+|\*)$/);
  if (!match || match[1] === '*') return 0;
  return Number.parseInt(match[1], 10);
}

export function buildPaginatedMeta(total: number, page: number, pageSize: number) {
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);
  return {
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages,
  };
}
