import Image from 'next/image';
import Link from 'next/link';
import {
  discountPercent,
  formatPrice,
  formatRelativeTime,
  starRating,
} from '@/lib/format';
import type { OfferRecord } from '@/lib/types';

type OfferCardProps = {
  offer: OfferRecord;
  index?: number;
};

export function OfferCard({ offer, index = 0 }: OfferCardProps) {
  const discount = discountPercent(offer.price, offer.price_original);
  const delayClass =
    index % 3 === 1
      ? 'animate-rise-delay-1'
      : index % 3 === 2
        ? 'animate-rise-delay-2'
        : '';

  return (
    <Link
      href={`/oferta/${offer.id}`}
      aria-label={`${offer.title} — ${formatPrice(offer.price)}`}
      className={`animate-rise ${delayClass} group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-150 hover:-translate-y-[3px] hover:border-accent/40 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)]`}
    >
      <div className="relative h-40 bg-surface-alt">
        {offer.image_url ? (
          <Image
            src={offer.image_url}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-faint">
            Sem imagem
          </div>
        )}

        {discount != null && (
          <div className="absolute left-2.5 top-2.5 rounded-lg bg-discount-bg px-2 py-1 text-[11.5px] font-extrabold text-discount-text">
            -{discount}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex flex-wrap gap-1.5">
          {offer.store_name && (
            <span className="rounded-md bg-surface-alt px-2 py-0.5 text-[10.5px] font-bold text-text-soft">
              {offer.store_name}
            </span>
          )}
          {offer.category && (
            <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[10.5px] font-bold text-accent">
              {offer.category}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 min-h-[39px] font-display text-[14.5px] font-bold leading-[1.35] text-text transition-colors group-hover:text-accent">
          {offer.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-text-faint">
          {offer.rating != null && (
            <>
              <span className="tracking-[-1px] text-[#f5a623]">{starRating(offer.rating)}</span>
              <span>{offer.rating.toFixed(1)}</span>
              <span>·</span>
            </>
          )}
          <span>{formatRelativeTime(offer.received_at)}</span>
        </div>

        <div className="mt-0.5 flex items-baseline gap-2">
          {offer.price_original != null && offer.price_original > offer.price && (
            <span className="text-[12.5px] text-text-faint line-through">
              {formatPrice(offer.price_original)}
            </span>
          )}
          <span className="font-display text-[19px] font-extrabold text-price">
            {formatPrice(offer.price)}
          </span>
        </div>

        <span className="mt-1.5 rounded-[10px] border-[1.5px] border-accent bg-transparent py-2 text-center font-body text-[13px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-black">
          Ver Detalhes
        </span>
      </div>
    </Link>
  );
}
