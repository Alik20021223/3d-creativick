import { DiscountType } from "@/shared/types";

export type HexColor = `#${string}`;
export interface ProductTranslation {
  id: number;
  locale: string;
  title: string;
  description: string | null;
}
export interface StockBalance {
  id: number;
  price: number;
  color: HexColor | string;
  size: string; // "250" | "500" | "700" | ...
  quantity: number;
  location_type: string;
  location_id: number;
  bar_code: string;
}

export interface Product {
  id: number;
  uuid: string;
  shop_id: number;
  category_id: number | null;
  brand_id: number | null;
  bar_code: string | null;
  status: string;
  active: boolean;
  addon: boolean;
  visibility: boolean;
  vegetarian: boolean;
  img: string | null;
  stocks_count: number;
  net_price: number | null;
  sell_price: number | null;
  min_qty: number | null;
  max_qty: number | null;
  created_at: string;
  updated_at: string;
  rating_percent: number | null;
  translation: ProductTranslation | null;
  reviews: unknown[];
  stock_balances: StockBalance[];
}
export interface Stock {
  id: number;
  countable_id: number;
  price: number;
  quantity: number;
  variation: string;
  color: HexColor | string;
  size: string;
  discount: number;
  addon: boolean;
  product: Product;
}

export interface CartDetail {
  id: number;
  quantity: number;
  bonus: boolean;
  price: number;
  discount: DiscountType;
  updated_at: string;
  stock: Stock;
  addons: unknown[];
}

export interface UserCart {
  id: number;
  cart_id: number;
  user_id: number;
  status: boolean;
  name: string | null;
  uuid: string;
  cartDetails: CartDetail[];
}
export interface ShoppingCart {
  id: number;
  owner_id: number;
  shop_id: number;
  status: boolean;
  total_price: number;
  currency_id: number;
  rate: number;
  group: boolean;
  user_carts: UserCart[];
}

export type ShoppingCartResponse = ShoppingCart;

export type CalcProductAuthPayload = {
  cart_id: number;
  currency_id: number;
  coupon?: string;
  shop_id?: number;
  type: 'pickup' | 'delivery';
};

export type CalcProductAuthResponse = {
  subtotal_price: number;
  discount_total: number;
  total_price: number;
};

// Тип для ответа API повтора заказа
export interface RepeatOrderCartDetail {
  id: number;
  stock_id: number;
  quantity: number;
  price: number;
}

export interface RepeatOrderUserCart {
  id: number;
  cart_id: number;
  user_id: number;
  uuid: string;
  cart_details: RepeatOrderCartDetail[];
}

export interface RepeatOrderResponseData {
  id: number;
  shop_id: number;
  owner_id: number;
  status: boolean;
  total_price: number;
  currency_id: number;
  rate: number;
  created_at: string;
  user_carts: RepeatOrderUserCart[];
}

export interface RepeatOrderResponse {
  timestamp: string;
  status: boolean;
  message: string;
  data: RepeatOrderResponseData;
}
