import { NextRequest, NextResponse } from 'next/server';
import { discountPercent } from '@/lib/format';
import { OfferService } from '@/lib/offers';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const page = Math.max(1, Number(sp.get('page') ?? 1) || 1);
  const q = sp.get('q') ?? undefined;
  const category = sp.get('category') ?? undefined;
  const store = sp.get('store') ?? undefined;
  const sortParam = sp.get('sort');
  const sort = sortParam === 'preco' || sortParam === 'desconto' ? sortParam : 'recentes';

  try {
    const result = await OfferService.getUserFeed({
      page,
      pageSize: 12,
      search: q,
      category,
      storeName: store,
      sortBy: sort === 'preco' ? 'preco' : 'recentes',
    });

    const data =
      sort === 'desconto'
        ? [...result.data].sort(
            (a, b) =>
              (discountPercent(b.price, b.price_original) ?? 0) -
              (discountPercent(a.price, a.price_original) ?? 0)
          )
        : result.data;

    return NextResponse.json({ ...result, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
