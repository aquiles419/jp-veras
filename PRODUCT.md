# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Compradores online buscando promoções e cupons de desconto atualizados diariamente. Chegam pela vitrine para navegar/filtrar por categoria, loja ou busca, e saem para a loja de origem (Amazon, Mercado Livre, Shopee, Magalu, AliExpress) para concluir a compra.

## Product Purpose

Vitrine de ofertas ("JP Veras Tech") que agrega promoções, cupons e preços de múltiplas lojas parceiras, atualizada continuamente, para ajudar o visitante a encontrar e aproveitar descontos antes que expirem.

## Positioning

Curadoria multi-loja em um só lugar (Amazon, Mercado Livre, Shopee, Magalu, AliExpress) com atualização diária e cupons prontos para copiar — não é uma loja própria, é um agregador/curador de ofertas de terceiros.

## Operating Context

- Dados de ofertas vêm de uma API própria (`OfferService`, `disparapromo.com.br`) com paginação, busca, filtro por categoria/loja e ordenação (recentes, preço, desconto).
- Rotas: vitrine (`/`) com hero, chips de categoria, controles, grade de ofertas e oferta em destaque; página de detalhe (`/oferta/[id]`) com preço, cupom, parcelamento, link de saída e ofertas relacionadas; 404 (`/oferta` inexistente).
- Marca também opera canais externos (YouTube, TikTok, WhatsApp, Telegram) linkados na vitrine.
- Tema claro/escuro com preferência persistida em localStorage (padrão escuro).

## Capabilities and Constraints

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4, fontes Manrope (display) e Inter (body).
- Imagens de produto vêm de URLs externas de terceiros (`unoptimized`, nem sempre confiáveis/consistentes em proporção).
- Sem autenticação, carrinho ou checkout — toda conversão acontece fora do site, no destino do link.
- Preços, cupons e estoque podem estar desatualizados em relação à loja de origem (aviso já exibido na página de detalhe).

## Brand Commitments

- Nome: JP Veras Tech. Logo circular já em uso (`public/jpverastech-logo.jpg`).
- Cor de destaque dourada (`#f0b90b`) e tema escuro como identidade visual já estabelecida — usuário confirmou manter e refinar, não substituir.
- Tom de voz direto e popular em pt-BR ("Promoções atualizadas todos os dias!", "Entre agora e não perca as promoções relâmpago!").

## Evidence on Hand

Nenhum dado de teste com usuários reais, benchmark de conversão ou depoimento disponível — nada disso deve ser inventado nas próximas etapas.

## Product Principles

- Velocidade de varredura: o visitante deve reconhecer desconto, loja e credibilidade da oferta em menos de um segundo por card.
- Confiança apesar de ser agregador: transparência sobre desatualização de preço/cupom, sem prometer o que a loja de origem não garante.
- Saída limpa: o objetivo final de cada tela é levar o visitante, sem atrito, ao link da loja de origem ou ao cupom.
- Identidade visual (dourado + escuro + Manrope/Inter) é ativo de marca já validado; evolução deve refinar, não substituir.
