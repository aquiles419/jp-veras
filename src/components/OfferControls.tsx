'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type OfferControlsProps = {
  stores: string[];
  resultCount: number;
};

export function OfferControls({ stores, resultCount }: OfferControlsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    next.delete('page');
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `/?${qs}` : '/');
    });
  }

  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
      <select
        value={params.get('store') ?? ''}
        onChange={(e) => update('store', e.target.value)}
        aria-label="Filtrar por loja"
        className="cursor-pointer rounded-xl border border-border bg-surface px-3.5 py-2.5 font-body text-[13px] font-semibold text-text transition-colors hover:border-accent/50"
      >
        <option value="">Todas Lojas</option>
        {stores.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={params.get('sort') ?? 'recentes'}
        onChange={(e) => update('sort', e.target.value)}
        aria-label="Ordenar ofertas"
        className="cursor-pointer rounded-xl border border-border bg-surface px-3.5 py-2.5 font-body text-[13px] font-semibold text-text transition-colors hover:border-accent/50"
      >
        <option value="recentes">Mais recentes</option>
        <option value="preco">Menor preço</option>
        <option value="desconto">Maior desconto</option>
      </select>

      <div className="flex-1" />
      <span className="self-center text-[12.5px] font-medium text-text-faint" aria-live="polite">
        {resultCount} oferta{resultCount === 1 ? '' : 's'}
      </span>
    </div>
  );
}
