'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

export function HeaderSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get('q') ?? '');

  function search() {
    const next = new URLSearchParams(params.toString());
    next.delete('page');
    if (value.trim()) next.set('q', value.trim());
    else next.delete('q');
    const qs = next.toString();
    router.push(qs ? `/?${qs}` : '/');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') search();
  }

  return (
    <div className="flex max-w-[480px] flex-1 items-center gap-2.5 rounded-xl border border-transparent bg-surface-alt px-3.5 py-2.5 transition-colors focus-within:border-accent">
      <Search size={15} strokeWidth={2} className="shrink-0 text-text-faint" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={search}
        placeholder="Buscar oferta, categoria ou loja..."
        aria-label="Buscar oferta, categoria ou loja"
        className="w-full border-none bg-transparent font-body text-[13.5px] text-text outline-none placeholder:text-text-faint"
      />
    </div>
  );
}
