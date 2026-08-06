/**
 * Identidade da loja — único lugar a editar ao clonar este projeto
 * para um novo white label (nome, logo, redes e textos de marca).
 */
export const siteConfig = {
  name: 'JP Veras Tech',
  handle: '@jpverastech',
  tagline: 'Ofertas atualizadas diariamente de Amazon, Shopee, Magalu e mais.',
  heroDescription:
    'Promoções atualizadas todos os dias de Amazon, Mercado Livre, Shopee, Magalu e AliExpress!',
  logo: '/logo.jpg',
  social: [
    {
      label: 'YouTube',
      href: 'https://youtube.com/@JPVerasTech',
      logo: '/youtube.svg',
      backdrop: false,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@mundo.pc8',
      logo: '/tiktok.svg',
      backdrop: true,
    },
    {
      label: 'WhatsApp',
      href: 'https://whatsapp.com/channel/',
      logo: '/whatsapp.svg',
      backdrop: false,
    },
    {
      label: 'Telegram',
      href: 'https://t.me/',
      logo: '/telegram.svg',
      backdrop: false,
    },
  ],
} as const;
