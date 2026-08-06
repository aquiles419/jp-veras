'use client';

import { LoaderCircle, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { OfferRecord, PaginatedResponse } from '@/lib/types';
import { OfferCard } from './OfferCard';

type Filters = {
  q?: string;
  category?: string;
  store?: string;
  sort?: string;
};

type InfiniteOfferGridProps = {
  initialOffers: OfferRecord[];
  initialPage: number;
  totalPages: number;
  filters: Filters;
};

export function InfiniteOfferGrid({
  initialOffers,
  initialPage,
  totalPages,
  filters,
}: InfiniteOfferGridProps) {
  const [offers, setOffers] = useState(initialOffers);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    setLoading((current) => {
      if (current) return current;
      return true;
    });
  }, []);

  useEffect(() => {
    if (!loading) return;
    const nextPage = page + 1;
    const params = new URLSearchParams();
    params.set('page', String(nextPage));
    if (filters.q) params.set('q', filters.q);
    if (filters.category) params.set('category', filters.category);
    if (filters.store) params.set('store', filters.store);
    if (filters.sort) params.set('sort', filters.sort);

    let cancelled = false;
    setFailed(false);

    fetch(`/api/offers?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar ofertas');
        return res.json() as Promise<PaginatedResponse<OfferRecord>>;
      })
      .then((json) => {
        if (cancelled) return;
        setOffers((prev) => {
          const seenIds = new Set(prev.map((offer) => offer.id));
          const newOffers = json.data.filter((offer) => !seenIds.has(offer.id));
          return [...prev, ...newOffers];
        });
        setPage(nextPage);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '900px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      <div className="mt-[22px] grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
        {offers.map((offer, index) => (
          <OfferCard key={offer.id} offer={offer} index={index} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="mt-10 flex min-h-10 items-center justify-center">
          {loading && (
            <div className="flex items-center gap-2 text-sm font-semibold text-text-faint">
              <LoaderCircle size={16} className="animate-spin text-accent" />
              Carregando mais ofertas...
            </div>
          )}
          {!loading && failed && (
            <button
              type="button"
              onClick={loadMore}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent"
            >
              <RefreshCw size={15} strokeWidth={2.2} />
              As ofertas não carregaram — tentar novamente
            </button>
          )}
        </div>
      )}

      {!hasMore && offers.length > 0 && (
        <p className="mt-10 text-center text-[13px] text-text-faint">
          Você viu todas as {offers.length.toLocaleString('pt-BR')} ofertas desta busca.
        </p>
      )}
    </>
  );
}
