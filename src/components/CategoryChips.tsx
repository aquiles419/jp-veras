import {
  Baby,
  Bike,
  BookOpen,
  Car,
  Dumbbell,
  Footprints,
  Gamepad2,
  Gem,
  Headphones,
  HeartPulse,
  Laptop,
  LayoutGrid,
  type LucideIcon,
  PawPrint,
  Plug,
  Refrigerator,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  Tag,
  Ticket,
  Watch,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import type { CategoryFacet } from '@/lib/types';

const CATEGORY_ICONS: [RegExp, LucideIcon][] = [
  [/aliment|mercearia|bebida/i, ShoppingBasket],
  [/cupom/i, Ticket],
  [/celular|smartphone/i, Smartphone],
  [/inform[aá]tica|notebook|computador/i, Laptop],
  [/áudio|audio|som|tv\b|eletr[ôo]nico|fone/i, Headphones],
  [/eletrodom[ée]stico|geladeira|lavadora/i, Refrigerator],
  [/eletroport[áa]til/i, Plug],
  [/automotivo|carro|moto\b/i, Car],
  [/bicicleta|ciclis/i, Bike],
  [/bolsa|mochila|mala/i, ShoppingBag],
  [/brinquedo|infantil|beb[êe]/i, Baby],
  [/casa|m[óo]vel|decora[çc][ãa]o|sofá/i, Sofa],
  [/esporte|lazer|fitness|academia/i, Dumbbell],
  [/ferramenta/i, Wrench],
  [/game|jogo|console/i, Gamepad2],
  [/livro/i, BookOpen],
  [/moda|roupa|vestu[áa]rio|acess[óo]rio/i, Shirt],
  [/t[êe]nis|cal[çc]ado/i, Footprints],
  [/perfum|beleza|cosm[ée]tico/i, Sparkles],
  [/pet\b|animal|animais/i, PawPrint],
  [/sa[úu]de/i, HeartPulse],
  [/rel[óo]gio|joia|bijuteria/i, Watch],
  [/gema|pedra preciosa/i, Gem],
];

function iconForCategory(label: string): LucideIcon {
  for (const [pattern, icon] of CATEGORY_ICONS) {
    if (pattern.test(label)) return icon;
  }
  return Tag;
}

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
    <div className="mt-[22px]">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-text-faint">
        <LayoutGrid size={12} strokeWidth={2.4} />
        Categorias
      </div>
      <div className="fade-scroll-x flex items-center gap-2.5 overflow-x-auto pb-1.5">
        <Link
          href={hrefFor(undefined)}
          className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
            !activeCategory
              ? 'bg-accent text-black'
              : 'bg-surface-alt text-text-soft hover:text-text'
          }`}
        >
          <LayoutGrid size={14} strokeWidth={2.2} />
          Todas
        </Link>
        {categories.map((chip) => {
          const Icon = iconForCategory(chip.label);
          return (
            <Link
              key={chip.label}
              href={hrefFor(chip.label)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                activeCategory === chip.label
                  ? 'bg-accent text-black'
                  : 'bg-surface-alt text-text-soft hover:text-text'
              }`}
            >
              <Icon size={14} strokeWidth={2.2} />
              {chip.label} · {chip.count}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
