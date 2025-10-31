// types/cart.ts

/** Хекс-цвет типа "#000000" */
export type HexColor = `#${string}`;

/** Перевод продукта */
export interface ProductTranslation {
  id: number;
  locale: string; // 'ru' | 'en' и т.п.
  title: string;
  description: string | null;
}

/** Остатки по складу/магазину для конкретной вариации */
export interface StockBalance {
  id: number;
  price: number;
  color: HexColor | string;
  size: string; // "250" | "500" | "700" | ...
  quantity: number;
  location_type: string; // например, "shop"
  location_id: number;
  bar_code: string;
}

/** Модель продукта */
export interface Product {
  id: number;
  uuid: string;
  shop_id: number;
  category_id: number | null;
  brand_id: number | null;
  bar_code: string | null;
  status: string; // "published" | ...
  active: boolean;
  addon: boolean;
  visibility: boolean;
  vegetarian: boolean;
  img: string | null; // URL
  stocks_count: number;
  net_price: number | null;
  sell_price: number | null;
  min_qty: number | null;
  max_qty: number | null;
  created_at: string; // ISO
  updated_at: string; // ISO
  rating_percent: number | null;
  translation: ProductTranslation | null;
  reviews: unknown[]; // детализируй при необходимости
  stock_balances: StockBalance[];
}

/** Конкретный stock (вариация товара в корзине) */
export interface Stock {
  id: number;
  countable_id: number; // product.id
  price: number;
  quantity: number;
  variation: string; // например "#000000_700"
  color: HexColor | string;
  size: string;
  discount: number;
  addon: boolean;
  product: Product;
}

/** Позиция корзины (деталь) */
export interface CartDetail {
  id: number;
  quantity: number;
  bonus: boolean;
  price: number;
  discount: number;
  updated_at: string; // ISO
  stock: Stock;
  addons: unknown[]; // если будут аддоны — опиши интерфейс
}

/** Корзина пользователя (шард внутри общей корзины) */
export interface UserCart {
  id: number;
  cart_id: number;
  user_id: number;
  status: boolean;
  name: string | null;
  uuid: string;
  cartDetails: CartDetail[];
}

/** Общая корзина (owner / group-cart) */
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

/** Ответ эндпоинта get-shopping-cart */
export type ShoppingCartResponse = ShoppingCart;
