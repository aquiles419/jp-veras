import { BadgeCheck, Flame, MessageCircle, Music2, Send, Video, Zap } from 'lucide-react';
import Image from 'next/image';

const LINKS = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@JPVerasTech',
    hint: 'JPVerasTech',
    icon: Video,
    color: '#E0402F',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mundo.pc8',
    hint: '@mundo.pc8',
    icon: Music2,
    color: '#111111',
  },
  {
    label: 'WhatsApp',
    href: 'https://whatsapp.com/channel/',
    hint: 'Canal de ofertas',
    icon: MessageCircle,
    color: '#25D366',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/',
    hint: 'Grupo ativo',
    icon: Send,
    color: '#26A5E4',
  },
];

type StoreHeroProps = {
  totalOffers: number;
  avgDiscountPct: number;
  storeCount: number;
};

export function StoreHero({ totalOffers, avgDiscountPct, storeCount }: StoreHeroProps) {
  return (
    <div className="animate-rise relative mt-6 overflow-hidden rounded-[22px] border border-border bg-surface-alt">
      <div
        aria-hidden
        className="h-40 bg-[linear-gradient(120deg,color-mix(in_oklab,var(--color-accent)_35%,transparent),color-mix(in_oklab,var(--color-accent)_8%,transparent))]"
      />

      <div className="flex flex-wrap items-start gap-5 px-7 -mt-[42px]">
        <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-black">
          <Image
            src="/jpverastech-logo.jpg"
            alt="JP Veras Tech"
            width={654}
            height={640}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-[96px] min-w-[220px] flex-1 flex-col justify-end gap-1">
          <div className="flex items-center gap-1.5">
            <Flame size={18} className="shrink-0 text-accent" fill="var(--color-accent)" />
            <span className="font-display text-[21px] font-extrabold text-text">
              JP Veras Tech
            </span>
            <BadgeCheck size={16} className="shrink-0 text-accent" fill="var(--color-accent)" stroke="var(--color-surface)" />
          </div>
          <span className="text-[13px] font-semibold text-accent">@jpverastech</span>
        </div>
        <div className="flex h-[96px] flex-wrap items-end gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-[10px] border border-border bg-surface px-3 py-2 text-text transition hover:border-accent"
            >
              <div
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] text-white"
                style={{ background: link.color }}
              >
                <link.icon size={11} strokeWidth={2.4} />
              </div>
              <span className="text-xs font-semibold">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="px-7 pb-6">
        <p className="flex max-w-[640px] items-start gap-1.5 text-[13.5px] leading-relaxed text-text-soft">
          <Flame size={15} className="mt-0.5 shrink-0 text-accent" fill="var(--color-accent)" />
          <span>
            Promoções atualizadas todos os dias! Ofertas de Amazon, Mercado Livre, Shopee,
            Magalu e AliExpress. Entre agora e não perca as promoções relâmpago!
          </span>
        </p>

        <div className="mt-[18px] flex flex-wrap gap-3.5">
          <div className="min-w-[130px] rounded-xl border border-border bg-surface px-[18px] py-3">
            <div className="font-display text-[22px] font-extrabold text-text">
              {totalOffers.toLocaleString('pt-BR')}
            </div>
            <div className="text-[11.5px] font-semibold text-text-faint">Ofertas hoje</div>
          </div>
          <div className="min-w-[130px] rounded-xl border border-border bg-surface px-[18px] py-3">
            <div className="font-display text-[22px] font-extrabold text-price">
              {avgDiscountPct}%
            </div>
            <div className="text-[11.5px] font-semibold text-text-faint">Economia média</div>
          </div>
          <div className="min-w-[130px] rounded-xl border border-border bg-surface px-[18px] py-3">
            <div className="font-display text-[22px] font-extrabold text-text">{storeCount}</div>
            <div className="text-[11.5px] font-semibold text-text-faint">Lojas parceiras</div>
          </div>
          <div className="flex min-w-[130px] flex-1 items-center justify-end gap-1.5">
            <Zap size={13} className="text-text-faint" />
            <span className="text-[11.5px] text-text-faint">
              Powered by <b className="text-text-soft">JP Veras Tech</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
