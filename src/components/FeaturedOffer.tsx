import { ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  discountPercent,
  formatPrice,
  formatRelativeTime,
  starRating,
} from '@/lib/format';
import type { OfferRecord } from '@/lib/types';

type FeaturedOfferProps = {
  offer: OfferRecord;
};

export function FeaturedOffer({ offer }: FeaturedOfferProps) {
  const discount = discountPercent(offer.price, offer.price_original);

  return (
    <Link
      href={`/oferta/${offer.id}`}
      aria-label={`Oferta em destaque: ${offer.title} — ${formatPrice(offer.price)}`}
      className="animate-rise group mt-[22px] flex flex-wrap overflow-hidden rounded-[20px] border border-border bg-surface transition hover:border-accent"
    >
      <div className="flex-[1_1_320px] p-4">
        <div className="relative h-[248px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_18px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.42)]">
          {offer.image_url ? (
            <Image
              src={offer.image_url}
              alt=""
              fill
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-black/35">
              Sem imagem
            </div>
          )}
          <div className="absolute left-3.5 top-3.5 flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1.5 text-[11.5px] font-extrabold text-black shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]">
            <Star size={12} fill="currentColor" />
            OFERTA EM DESTAQUE
          </div>
        </div>
      </div>

      <div className="flex flex-[1_1_320px] flex-col justify-center gap-2.5 p-7">
        <div className="flex gap-1.5">
          {offer.store_name && (
            <span className="rounded-md bg-surface-alt px-2.5 py-1 text-[11px] font-bold text-text-soft">
              {offer.store_name}
            </span>
          )}
          {offer.category && (
            <span className="rounded-md bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
              {offer.category}
            </span>
          )}
        </div>

        <div className="font-display text-[21px] font-extrabold leading-[1.3] text-text">
          {offer.title}
        </div>

        <div className="flex items-center gap-1.5 text-[12.5px] text-text-faint">
          {offer.rating != null && (
            <>
              <span className="text-[#f5a623]">{starRating(offer.rating)}</span>
              <span>{offer.rating.toFixed(1)}</span>
              <span>·</span>
            </>
          )}
          <span>{formatRelativeTime(offer.received_at)}</span>
        </div>

        {discount != null && (
          <div className="flex items-baseline gap-2.5">
            <span className="text-sm text-text-faint line-through">
              {formatPrice(offer.price_original)}
            </span>
            <span className="rounded-md bg-discount-bg px-2 py-0.5 text-xs font-extrabold text-discount-text">
              -{discount}%
            </span>
          </div>
        )}

        <span className="font-display text-[28px] font-extrabold text-price">
          {formatPrice(offer.price)}
        </span>

        <span className="mt-1.5 flex w-fit items-center gap-1.5 rounded-[11px] bg-accent px-5 py-3 font-body text-sm font-bold text-black transition-transform group-hover:translate-x-0.5">
          Ver oferta em destaque
          <ArrowUpRight size={15} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
