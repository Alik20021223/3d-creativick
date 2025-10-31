import { ProductTranslation, StockBalance } from './cart';

export type FavoriteType = {
  id: number;
  uuid: string;
  shop_id: number;
  category_id: number;
  brand_id: number;
  bar_code: string;
  status: 'published' | 'draft' | 'archived'; // если знаешь все варианты — добавь
  active: boolean;
  addon: boolean;
  visibility: boolean;
  vegetarian: boolean;
  img: string;
  stocks_count: number;
  net_price: number;
  sell_price: number;
  min_qty: number;
  max_qty: number;
  created_at: string; // "2025-10-23 21:41:16Z"
  updated_at: string;
  stock_balances: StockBalance[];
  translation: ProductTranslation;
};

export type FavoriteResponse = {
  data: FavoriteType[];
};
