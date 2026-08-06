import type { OfferRecord } from './types';

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatPrice(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return currency.format(value);
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) return 'agora';
  if (minutes < 60) return `há ${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `há ${days}d`;

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

export function formatCapturedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getCouponCodes(offer: OfferRecord): string[] {
  const raw = offer.coupon_codes;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  return String(raw)
    .split(/[,;]/)
    .map((c) => c.trim())
    .filter(Boolean);
}

export function getOfferLink(offer: OfferRecord): string {
  return offer.source_url || offer.product_url || '#';
}

export function parseInstallments(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    const count = obj.count ?? obj.quantidade ?? obj.times;
    const amount = obj.amount ?? obj.valor ?? obj.value;
    if (count && amount) {
      return `Em até ${count}x ${formatPrice(Number(amount))} sem juros`;
    }
  }
  return null;
}

export function discountPercent(
  price: number,
  original: number | null
): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function starRating(rating: number | null | undefined): string {
  const full = Math.round(rating ?? 0);
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
}
