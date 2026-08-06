import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type PaginationProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

export function Pagination({ page, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  function hrefFor(target: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== 'page') params.set(key, value);
    }
    if (target > 1) params.set('page', String(target));
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  return (
    <nav
      className="mt-8 flex items-center justify-between gap-4"
      aria-label="Paginação"
    >
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition ${
          page <= 1 ? 'pointer-events-none opacity-40' : 'hover:border-accent'
        }`}
      >
        <ChevronLeft size={16} strokeWidth={2.2} />
        Anterior
      </Link>

      <p className="text-sm text-text-faint">
        Página <span className="font-semibold text-text">{page}</span> de{' '}
        <span className="font-semibold text-text">{totalPages}</span>
      </p>

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition ${
          page >= totalPages ? 'pointer-events-none opacity-40' : 'hover:border-accent'
        }`}
      >
        Próxima
        <ChevronRight size={16} strokeWidth={2.2} />
      </Link>
    </nav>
  );
}
