import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';

const BRAND_NAME = 'JP Veras Tech';

type SiteHeaderProps =
  | { mode: 'store'; offersTodayCount: number }
  | { mode: 'detail'; offersTodayCount: number; breadcrumbCategory: string | null };

export function SiteHeader(props: SiteHeaderProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1280px] items-center gap-5 px-4 py-3.5 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/jpverastech-logo.jpg"
            alt={BRAND_NAME}
            width={654}
            height={640}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
            priority
          />
          <span className="whitespace-nowrap font-display text-[15px] font-extrabold text-text">
            {BRAND_NAME}
          </span>
        </Link>

        {props.mode === 'detail' ? (
          <div className="flex flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[13px] text-text-faint">
            <Link href="/" className="font-semibold text-text-soft hover:text-accent">
              Vitrine
            </Link>
            <span>/</span>
            <span>{props.breadcrumbCategory ?? 'Oferta'}</span>
          </div>
        ) : (
          <>
            <Suspense fallback={<div className="h-[42px] max-w-[480px] flex-1 rounded-xl bg-surface-alt" />}>
              <HeaderSearch />
            </Suspense>
            <div className="flex-1" />
          </>
        )}

        <div className="hidden shrink-0 items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent sm:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
          {props.offersTodayCount.toLocaleString('pt-BR')} ofertas hoje
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}
