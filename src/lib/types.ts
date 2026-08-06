/**
 * Registro completo da tabela `offers` — produto, loja e cupom unificados.
 */
export interface OfferRecord {
  id: string;
  product_id: string | null;
  product_url: string | null;
  source_url: string | null;
  platform_id: string | null;
  category: string | null;
  title: string;
  price: number;
  price_original: number | null;
  installments: unknown | null;
  rating: number | null;
  reviews_count: number | null;
  sales_count: number | null;
  store_name: string | null;
  image_url: string | null;
  has_coupon: boolean;
  coupon_codes: string[] | string | null;
  coupon_urls: string[] | string | null;
  coupon_description: string | null;
  raw_caption: string | null;
  status: string | null;
  received_at: string;
  preco_extenso: string | null;
  is_international: boolean | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface GetOffersOptions {
  page?: number;
  pageSize?: number;
  onlyWithCoupons?: boolean;
  category?: string;
  storeName?: string;
  search?: string;
  sortBy?: 'recentes' | 'preco';
}

export interface CategoryFacet {
  label: string;
  count: number;
}

export interface StorefrontStats {
  categories: CategoryFacet[];
  stores: string[];
  avgDiscountPct: number;
  storeCount: number;
}
