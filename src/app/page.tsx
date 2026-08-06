import { Suspense } from 'react';
import { CategoryChips } from '@/components/CategoryChips';
import { FeaturedOffer } from '@/components/FeaturedOffer';
import { OfferCard } from '@/components/OfferCard';
import { OfferControls } from '@/components/OfferControls';
import { Pagination } from '@/components/Pagination';
import { SiteHeader } from '@/components/SiteHeader';
import { StoreHero } from '@/components/StoreHero';
import { discountPercent } from '@/lib/format';
import { OfferService } from '@/lib/offers';

type HomeProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    store?: string;
    sort?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomeProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const pageSize = 12;
  const sort = sp.sort === 'preco' || sp.sort === 'desconto' ? sp.sort : 'recentes';

  const [result, stats] = await Promise.all([
    OfferService.getOffers({
      page,
      pageSize,
      search: sp.q,
      category: sp.category,
      storeName: sp.store,
      sortBy: sort === 'preco' ? 'preco' : 'recentes',
    }),
    OfferService.getStorefrontStats(),
  ]);

  const offers =
    sort === 'desconto'
      ? [...result.data].sort(
          (a, b) =>
            (discountPercent(b.price, b.price_original) ?? 0) -
            (discountPercent(a.price, a.price_original) ?? 0)
        )
      : result.data;

  const featured = offers.length
    ? [...offers].sort(
        (a, b) =>
          (discountPercent(b.price, b.price_original) ?? 0) -
          (discountPercent(a.price, a.price_original) ?? 0)
      )[0]
    : null;
  const gridOffers = featured ? offers.filter((o) => o.id !== featured.id) : offers;

  return (
    <div className="min-h-screen bg-bg text-text">
      <SiteHeader mode="store" offersTodayCount={result.total} />

      <main className="mx-auto max-w-[1280px] px-4 pb-16 md:px-8">
        <StoreHero
          totalOffers={result.total}
          avgDiscountPct={stats.avgDiscountPct}
          storeCount={stats.storeCount}
        />

        <CategoryChips
          categories={stats.categories}
          activeCategory={sp.category}
          searchParams={{ q: sp.q, store: sp.store, sort: sp.sort }}
        />

        <Suspense fallback={<div className="mt-1.5 h-11 animate-pulse rounded-xl bg-surface-alt" />}>
          <OfferControls stores={stats.stores} resultCount={result.total} />
        </Suspense>

        {result.data.length === 0 ? (
          <div className="mt-8 rounded-[22px] border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="font-display text-xl font-bold text-text">Nenhuma oferta</p>
            <p className="mt-2 text-sm text-text-faint">
              Tente outro termo ou remova os filtros.
            </p>
          </div>
        ) : (
          <>
            {featured && <FeaturedOffer offer={featured} />}

            <div className="mt-[22px] grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
              {gridOffers.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} index={index} />
              ))}
            </div>

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              searchParams={{
                q: sp.q,
                category: sp.category,
                store: sp.store,
                sort: sp.sort,
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
