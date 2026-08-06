---
name: JP Veras Tech
description: Vitrine de ofertas multi-loja em tema escuro dourado, focada em varredura rápida de descontos.
colors:
  bg: "oklch(0.15 0.01 260)"
  surface: "oklch(0.19 0.012 260)"
  surface-alt: "oklch(0.23 0.014 260)"
  border: "oklch(0.28 0.014 260)"
  text: "oklch(0.96 0.005 260)"
  text-soft: "oklch(0.68 0.02 260)"
  text-faint: "oklch(0.60 0.02 260)"
  price: "oklch(0.72 0.15 155)"
  discount-bg: "oklch(0.35 0.14 25)"
  discount-text: "#ffffff"
  accent: "#f0b90b"
  accent-soft: "color-mix(in oklab, #f0b90b 13%, transparent)"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 800
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
rounded:
  chip: "9999px"
  control: "10px"
  card: "16px"
  panel: "20px"
  hero: "22px"
spacing:
  tight: "8px"
  default: "14px"
  section: "22px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.control}"
    padding: "8px 20px"
  chip-active:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.chip}"
    padding: "8px 16px"
  chip-inactive:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.chip}"
    padding: "8px 16px"
---

# Design System: JP Veras Tech

## Overview

**Creative North Star: "The Gold-Rush Deals Wall"**

JP Veras Tech é uma vitrine de ofertas em tempo real: escura como uma tela de scanner de preços à noite, pontuada por um dourado de destaque que marca exatamente onde está o desconto e a ação. A densidade é alta — muitas ofertas, pouco texto por card — porque o trabalho do visitante é varrer rapidamente, não ler. O dourado nunca decora; ele sempre marca algo acionável ou vencedor (preço, cupom, CTA, categoria ativa). Cantos generosamente arredondados e cartões com borda sutil dão ao painel denso uma sensação organizada, não uma sensação de planilha.

**Key Characteristics:**
- Fundo quase preto (dark-by-default) com um único acento dourado saturado, nunca dois acentos competindo.
- Verde reservado exclusivamente para preço atual — nunca decorativo.
- Vermelho reservado exclusivamente para desconto/urgência.
- Tipografia display (Manrope, peso 800) só em títulos e números; tudo o mais é Inter.
- Cantos arredondados generosos (12–22px) em todo container; nunca esquadrejado.

## Colors

Paleta restrita: neutros escuros + um único acento dourado saturado (estratégia Restrained). Verde e vermelho são cores semânticas fixas (preço/desconto), não paleta decorativa.

### Primary
- **Ouro de Destaque** (`#f0b90b`): CTA primário, categoria/preço ativo, ícones de destaque, foco de teclado. Nunca ultrapassa ~10% de qualquer tela — sua raridade é o que o torna legível como "aja aqui".

### Neutral
- **Grafite Profundo** (`oklch(0.15 0.01 260)` bg / `0.19` surface / `0.23` surface-alt): três camadas de profundidade sem usar sombra — bg < surface < surface-alt.
- **Branco Neblina** (`oklch(0.96 0.005 260)`): texto primário.
- **Cinza Névoa** (`oklch(0.68 0.02 260)` soft / `0.60` faint): texto secundário e terciário; ambos calibrados para ≥4.5:1 de contraste contra bg e surface no tema escuro.

### Semantic
- **Verde Economia** (`oklch(0.72 0.15 155)`): preço atual, "economia média" — a única cor de sucesso do sistema.
- **Vermelho Alerta** (`oklch(0.35 0.14 25)` bg escuro / `0.52` claro, texto branco): badge de desconto e estados de erro.

### Named Rules
**The One Gold Rule.** O dourado marca ação ou vitória (CTA, preço/categoria ativa, foco). Nunca é usado como decoração de fundo ou padrão repetido.

## Typography

**Display Font:** Manrope (pesos 500/700/800)
**Body Font:** Inter (pesos 400/500/600/700)

**Character:** Manrope Extrabold carrega números e títulos com peso de anúncio de loja; Inter conduz toda a leitura corrida com neutralidade absoluta.

### Hierarchy
- **Display** (800, 19–34px): preço em destaque, títulos de card, H1 de oferta.
- **Title** (700, 14–21px): título de card/hero, nomes de produto.
- **Body** (400–600, 12–15px): descrições, metadados, controles.
- **Label** (700, 10.5–13px, badges maiúsculos ou não): loja, categoria, contagem, cupom.

### Named Rules
**The Numbers-Are-Display Rule.** Qualquer número que representa dinheiro ou desconto (preço, %, contagem de ofertas) usa a fonte display em peso extrabold — nunca a fonte de corpo.

## Layout

Container central `max-w-[1280px]` (`max-w-[1100px]` na página de detalhe) com padding responsivo `px-4 md:px-8`. Grade de cards usa `repeat(auto-fill, minmax(250px,1fr))` — de 1 a 4+ colunas conforme a largura, sem breakpoints manuais. Ritmo vertical em múltiplos de ~18–22px entre seções principais; espaçamento interno de card em ~14px. Categoria em scroll horizontal com fade nas bordas (`fade-scroll-x`) em vez de setas de navegação.

## Elevation & Depth

Sistema tonal, não baseado em sombra: profundidade vem de três camadas de superfície (`bg` < `surface` < `surface-alt`) e borda de 1px, não de `box-shadow`. A única sombra real do sistema aparece no hover de card (`0 12px 24px -12px rgba(0,0,0,.35)`), sinalizando elevação interativa — nunca em repouso.

### Named Rules
**The Flat-At-Rest Rule.** Nenhum elemento tem sombra em estado padrão; sombra só aparece como resposta a hover.

## Shapes

Cantos generosamente arredondados em toda a hierarquia: `9999px` (chips/pills), `10px` (controles/botões), `16px` (cards de oferta), `20–22px` (painéis grandes: hero, destaque). Bordas finas de 1–1.5px em `--color-border` definem contorno sem sombra. Nunca esquadrejado; nunca radius abaixo de 9px em superfície clicável.

## Components

### Buttons
- **Shape:** `10–11px` de raio.
- **Primary:** fundo `accent` sólido, texto preto, peso extrabold — reservado para a ação de saída (ir à loja, oferta em destaque).
- **Ghost:** borda `1.5px` dourada, fundo transparente, preenche de dourado só no hover — usado quando o botão não é a única saída da tela (ex.: "Ver Detalhes" dentro de um card que já é 100% clicável).
- **Hover/Focus:** anel de foco dourado de 2px (`outline`) visível em teclado; hover troca cor de fundo/borda, nunca sombra dura.

### Chips (categoria)
- **Style:** pill `9999px`; ativo = fundo dourado sólido + texto preto; inativo = `surface-alt` + texto soft, clareando no hover.

### Cards / Containers
- **Corner Style:** `16px` (oferta), `20px` (destaque), `22px` (hero/painel).
- **Background:** `surface` sobre `bg`; imagem em contêiner `surface-alt`.
- **Shadow Strategy:** nenhuma em repouso; elevação suave só no hover (ver Elevation).
- **Border:** `1px` `border`, vira `accent`/`accent/40%` no hover.
- **Internal Padding:** `14px` (card padrão), `22–28px` (hero/painel/destaque).

### Inputs / Fields
- **Style:** fundo `surface-alt`, sem borda visível em repouso, `10–12px` de raio.
- **Focus:** borda dourada aparece (`focus-within`), sem glow.

### Navigation (SiteHeader)
- **Style:** barra fixa no topo (`sticky`), fundo `surface`, borda inferior `1px`; logo circular + nome à esquerda, busca central, badge de contagem + toggle de tema à direita. Em telas de detalhe, a busca é substituída por breadcrumb.

### Coupon Card (componente-assinatura)
Bloco tracejado dourado com o código do cupom em Manrope extrabold e um botão de copiar que troca para verde + ícone de check por 1.6s após copiar — o único momento de confirmação de sucesso explícito do sistema.

## Do's and Don'ts

### Do:
- **Do** reservar o dourado para ação/vitória: CTA primário, categoria/preço ativos, foco de teclado.
- **Do** manter os três tons de superfície (`bg`/`surface`/`surface-alt`) como única fonte de profundidade — sem sombra em repouso.
- **Do** usar Manrope extrabold em todo número monetário ou percentual.
- **Do** manter cada card como uma única região clicável (um `<Link>` por card, nunca múltiplos links redundantes para o mesmo destino).
- **Do** manter contraste de texto secundário/terciário ≥4.5:1 contra o fundo em ambos os temas ao ajustar tokens de cor.

### Don't:
- **Don't** introduzir um segundo acento saturado competindo com o dourado.
- **Don't** usar sombra dura ou `box-shadow` com offset zero — não é a linguagem deste sistema.
- **Don't** esquadrejar cantos em qualquer superfície clicável (mínimo 9px de raio).
- **Don't** adicionar eyebrow/kicker acima de títulos — o título já carrega o peso necessário em Manrope extrabold.
