import Link from 'next/link';
import type { CategoryFacet } from '@/lib/types';

type CategoryChipsProps = {
  categories: CategoryFacet[];
  activeCategory?: string;
  searchParams: Record<string, string | undefined>;
};

export function CategoryChips({
  categories,
  activeCategory,
  searchParams,
}: CategoryChipsProps) {
  function hrefFor(category?: string) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== 'category' && key !== 'page') params.set(key, value);
    }
    if (category) params.set('category', category);
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  return (
    <div className="fade-scroll-x mt-[22px] flex items-center gap-2.5 overflow-x-auto pb-1.5">
      <Link
        href={hrefFor(undefined)}
        className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
          !activeCategory
            ? 'bg-accent text-black'
            : 'bg-surface-alt text-text-soft hover:text-text'
        }`}
      >
        Todas
      </Link>
      {categories.map((chip) => (
        <Link
          key={chip.label}
          href={hrefFor(chip.label)}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
            activeCategory === chip.label
              ? 'bg-accent text-black'
              : 'bg-surface-alt text-text-soft hover:text-text'
          }`}
        >
          {chip.label} · {chip.count}
        </Link>
      ))}
    </div>
  );
}
