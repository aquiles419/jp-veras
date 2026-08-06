import { BadgeCheck, Flame, Zap } from 'lucide-react';
import Image from 'next/image';

const LINKS = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@JPVerasTech',
    hint: 'JPVerasTech',
    logo: '/youtube.svg',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mundo.pc8',
    hint: '@mundo.pc8',
    logo: '/tiktok.svg',
    backdrop: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://whatsapp.com/channel/',
    hint: 'Canal de ofertas',
    logo: '/whatsapp.svg',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/',
    hint: 'Grupo ativo',
    logo: '/telegram.svg',
  },
];

type StoreHeroProps = {
  totalOffers: number;
  avgDiscountPct: number;
  storeCount: number;
};

export function StoreHero({ totalOffers, avgDiscountPct, storeCount }: StoreHeroProps) {
  return (
    <div className="animate-rise relative mt-5 overflow-hidden rounded-2xl border border-border bg-surface-alt">
      <div
        aria-hidden
        className="h-[68px] bg-[linear-gradient(120deg,color-mix(in_oklab,var(--color-accent)_35%,transparent),color-mix(in_oklab,var(--color-accent)_8%,transparent))]"
      />

      <div className="flex flex-wrap items-center gap-3.5 px-5 -mt-6">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-surface bg-black">
          <Image
            src="/jpverastech-logo.jpg"
            alt="JP Veras Tech"
            width={654}
            height={640}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-w-[180px] flex-1 flex-col gap-0.5 pt-6">
          <div className="flex items-center gap-1.5">
            <Flame size={15} className="shrink-0 text-accent" fill="var(--color-accent)" />
            <span className="font-display text-[16px] font-extrabold text-text">
              JP Veras Tech
            </span>
            <BadgeCheck size={14} className="shrink-0 text-accent" fill="var(--color-accent)" stroke="var(--color-surface)" />
          </div>
          <span className="text-[12px] font-semibold text-accent">@jpverastech</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 pt-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-[9px] border border-border bg-surface px-2.5 py-1.5 text-text transition hover:border-accent"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-[4px] ${
                  link.backdrop ? 'bg-white p-[2px]' : ''
                }`}
              >
                <Image
                  src={link.logo}
                  alt=""
                  width={16}
                  height={16}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="hidden text-[11.5px] font-semibold sm:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <p className="mt-2.5 flex max-w-[640px] items-start gap-1.5 text-[12.5px] leading-relaxed text-text-soft">
          <Flame size={13} className="mt-0.5 shrink-0 text-accent" fill="var(--color-accent)" />
          <span className="line-clamp-1">
            Promoções atualizadas todos os dias de Amazon, Mercado Livre, Shopee, Magalu e
            AliExpress!
          </span>
        </p>

        <div className="mt-2.5 flex flex-wrap gap-2.5">
          <div className="min-w-[92px] rounded-lg border border-border bg-surface px-3 py-1.5">
            <div className="font-display text-[16px] font-extrabold text-text">
              {totalOffers.toLocaleString('pt-BR')}
            </div>
            <div className="text-[10px] font-semibold text-text-faint">Ofertas hoje</div>
          </div>
          <div className="min-w-[92px] rounded-lg border border-border bg-surface px-3 py-1.5">
            <div className="font-display text-[16px] font-extrabold text-price">
              {avgDiscountPct}%
            </div>
            <div className="text-[10px] font-semibold text-text-faint">Economia média</div>
          </div>
          <div className="min-w-[92px] rounded-lg border border-border bg-surface px-3 py-1.5">
            <div className="font-display text-[16px] font-extrabold text-text">{storeCount}</div>
            <div className="text-[10px] font-semibold text-text-faint">Lojas parceiras</div>
          </div>
          <div className="flex min-w-[92px] flex-1 items-center justify-end gap-1.5">
            <Zap size={12} className="text-text-faint" />
            <span className="text-[10.5px] text-text-faint">
              Powered by <b className="text-text-soft">JP Veras Tech</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
