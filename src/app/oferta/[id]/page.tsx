import { ArrowUpRight, CircleAlert, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CouponButton } from '@/components/CouponButton';
import { ImageLightbox } from '@/components/ImageLightbox';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/config/site';
import {
  discountPercent,
  formatCapturedAt,
  formatPrice,
  getCouponCodes,
  getOfferLink,
  parseInstallments,
  starRating,
} from '@/lib/format';
import { OfferLogService } from '@/lib/offerLogs';
import { OfferService } from '@/lib/offers';

type OfferPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: OfferPageProps) {
  const { id } = await params;
  const offer = await OfferService.getOfferById(id);
  if (!offer) return { title: 'Oferta não encontrada' };
  return {
    title: `${offer.title} | ${siteConfig.name}`,
    description: offer.coupon_description ?? offer.preco_extenso ?? offer.title,
  };
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { id } = await params;
  const offer = await OfferService.getOfferById(id);
  if (!offer) notFound();

  const [{ total }, related, convertedUrl] = await Promise.all([
    OfferService.getOffers({ page: 1, pageSize: 1 }),
    OfferService.getOffers({ category: offer.category ?? undefined, pageSize: 5 }),
    OfferLogService.getConvertedUrl(offer.id),
  ]);

  const coupons = getCouponCodes(offer);
  const discount = discountPercent(offer.price, offer.price_original);
  const installments = parseInstallments(offer.installments);
  const link = convertedUrl ?? getOfferLink(offer);
  const relatedOffers = related.data.filter((o) => o.id !== offer.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg text-text">
      <SiteHeader mode="detail" offersTodayCount={total} breadcrumbCategory={offer.category} />

      <main className="mx-auto max-w-[1100px] px-4 pb-16 pt-8 md:px-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-[1_1_420px] flex-col gap-3.5">
            <div className="flex h-[400px] items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_3px_8px_-6px_rgba(0,0,0,0.2)]">
              {offer.image_url ? (
                <ImageLightbox src={offer.image_url} alt={offer.title} />
              ) : (
                <span className="text-sm text-black/35">Sem imagem</span>
              )}
            </div>
          </div>

          <div className="flex flex-[1_1_380px] flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {offer.category && (
                <span className="rounded-lg bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
                  {offer.category}
                </span>
              )}
              {offer.store_name && (
                <span className="rounded-lg bg-surface-alt px-2.5 py-1 text-[11px] font-bold text-text-soft">
                  {offer.store_name}
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl font-extrabold leading-tight text-balance text-text md:text-3xl">
              {offer.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-[13px] text-text-faint">
              {offer.rating != null && (
                <>
                  <span className="text-[#f5a623]">{starRating(offer.rating)}</span>
                  <span className="font-bold text-text">{offer.rating.toFixed(1)}</span>
                  {offer.reviews_count != null && <span>({offer.reviews_count} avaliações)</span>}
                  <span>·</span>
                </>
              )}
              {offer.sales_count != null && <span>{offer.sales_count}+ vendidos</span>}
            </div>

            <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-surface p-[22px]">
              {coupons.length > 0 && (
                <div className="flex flex-col gap-2 rounded-xl border border-dashed border-accent bg-accent-soft p-3.5">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-accent">
                    <Tag size={14} strokeWidth={1.8} />
                    Cupom de Desconto
                  </div>
                  <div className="flex flex-col gap-2">
                    {coupons.map((code) => (
                      <CouponButton key={code} code={code} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-text-faint">
                  Preço Hoje
                </div>
                <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                  {offer.price_original != null && offer.price_original > offer.price && (
                    <span className="text-[15px] text-text-faint line-through">
                      {formatPrice(offer.price_original)}
                    </span>
                  )}
                  <span className="font-display text-[34px] font-extrabold text-price">
                    {formatPrice(offer.price)}
                  </span>
                  {discount != null && (
                    <span className="rounded-md bg-discount-bg px-2 py-0.5 text-xs font-extrabold text-discount-text">
                      -{discount}%
                    </span>
                  )}
                </div>
                {installments && (
                  <div className="mt-1 text-[13px] text-text-soft">{installments}</div>
                )}
                <div className="mt-1.5 text-[11.5px] text-text-faint">
                  Capturado em {formatCapturedAt(offer.received_at)}
                </div>
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-[15px] font-body text-[15px] font-extrabold text-black transition hover:opacity-90"
              >
                Ir para a Oferta
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </a>
            </div>

            <div className="flex gap-2.5 rounded-[10px] bg-surface-alt px-3.5 py-3 text-xs leading-relaxed text-text-soft">
              <CircleAlert size={15} strokeWidth={1.8} className="mt-0.5 shrink-0" />
              <span>
                Condições sujeitas a alteração. Preço, cupom e estoque podem ter mudado desde a
                captura. Confira os dados na loja antes de finalizar a compra.
              </span>
            </div>

            <div className="text-center text-[11.5px] text-text-faint">
              Compartilhado via <span className="font-bold text-accent">{siteConfig.name}</span>
            </div>
          </div>
        </div>

        {relatedOffers.length > 0 && (
          <div className="mt-10">
            <div className="mb-3.5 font-display text-[17px] font-extrabold text-text">
              Ofertas relacionadas
            </div>
            <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {relatedOffers.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/oferta/${rel.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-[2px] hover:border-accent/40"
                >
                  <div className="p-2 pb-0">
                    <div className="relative h-[110px] overflow-hidden rounded-lg bg-white shadow-[0_2px_6px_-4px_rgba(0,0,0,0.18)]">
                      {rel.image_url && (
                        <Image
                          src={rel.image_url}
                          alt={rel.title}
                          fill
                          sizes="200px"
                          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-110"
                          unoptimized
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-2.5">
                    <div className="line-clamp-2 text-[12.5px] font-bold leading-tight text-text">
                      {rel.title}
                    </div>
                    <span className="font-display text-sm font-extrabold text-price">
                      {formatPrice(rel.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
