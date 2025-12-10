// Общий ответ
export interface OrderProfileResponse {
  data: Order[];
  meta?: {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
}

export type ApiOrderStatus =
  | 'new'
  | 'accepted'
  | 'ready'
  | 'on_a_way'
  | 'delivered'
  | 'progress'
  | 'cooking'
  | 'pending'
  | 'failed'
  | 'refunded'
  | 'canceled';

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  origin_price: number;
  rate: number;
  note: string | null; // в примере: " | "
  order_details_count: number;
  tax: number;
  commission_fee: number;
  status: ApiOrderStatus;
  location: OrderLocation; // строки в примере
  address: Address;
  delivery_type: 'delivery' | 'pickup' | string;
  delivery_fee: number;
  delivery_date: string; // "YYYY-MM-DD"
  delivery_time: string; // "HH:mm"
  delivery_date_time: string; // ISO-like "YYYY-MM-DD HH:mm:ssZ"
  current: boolean;
  split: number;
  paid_by_split: boolean;
  otp: number;
  created_at: string; // ISO-like
  updated_at: string; // ISO-like
  currency: Currency;
  user: UserInfo;
  transaction: Transaction;
}

export interface OrderLocation {
  latitude: string;
  longitude: string;
}

export interface Address {
  floor: string | null;
  house: string | null;
  office: string | null;
  address: string | null;
}

export interface ShopLocation {
  latitude: number;
  longitude: number;
}

export interface Currency {
  id: number;
  symbol: string; // "$"
  title: string; // "USD"
  rate: number;
  default: boolean;
  position: 'before' | 'after' | string;
  active: boolean;
}

export interface UserInfo {
  id: number;
  uuid: string;
  firstname: string;
  lastname: string;
  role: string; // 'user', 'admin', и т.п.
}

export interface Transaction {
  id: number;
  payable_id: number; // order id
  price: number;
  note: string; // "1183"
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded' | 'canceled' | string;
  perform_time: string; // "YYYY-MM-DD HH:mm:ss"
  created_at: string;
  updated_at: string;
  status_description: string;
  payment_system: PaymentSystem;
}

export interface PaymentSystem {
  id: number;
  tag: string; // 'cash' и т.п.
  input: number;
  active: boolean;
}

export type CalcProduct = { stock_id: number; quantity: number };

export type OrderCalculateRequest = {
  currency_id: number; // 1
  shop_id: number; // 1
  type: 'pickup' | 'delivery' | string;
  products: CalcProduct[];
};

export type OrderCalculateItem = {
  stock_id: number;
  quantity: number;
  price?: number;
  total?: number;
  [k: string]: unknown;
};

export type LoyaltyLevelInfo = {
  level: number;
  name: string;
  discount?: number;
  birthday_bonus?: boolean;
  required_spent?: number;
  remaining_amount?: number;
  progress_percent?: number;
};

export type LoyaltyInfo = {
  current_level?: LoyaltyLevelInfo;
  next_level?: LoyaltyLevelInfo;
  total_spent?: string;
  active_discount?: number;
  birthday_bonus_available?: boolean;
  birthday_bonus_amount?: number;
};

export type OrderCalculateData = {
  delivery_price?: number;
  total_discount?: number;
  coupon_price?: number;
  loyalty_discount?: number;
  price?: number;
  total_price: number;
  currency?: string;
  items?: OrderCalculateItem[];
  loyalty_info?: LoyaltyInfo;
  [k: string]: unknown;
};

export type OrderCalculateResponse = {
  data: OrderCalculateData;
};

export type OrderCalcResponse = {
  data: OrderCalculateResponse;
};

// entities/profile/types/orderById.ts

export interface OrderByIdResponseData {
  id: number;
  number: number;
  user_id: number;
  total_price: number;
  origin_price: number;
  rate: number;
  note: string | null;
  status: string; // 'new' | 'accepted' | 'canceled' | ... если знаешь — сузить
  phone: string;
  current: boolean;
  total_discount: number;
  created_at: string;
  updated_at: string;
  km: number;
  first_product_img: string | null;
  product_names_preview: string[];
  deliveryman: null; // если потом добавится сущность — заменить

  currency: {
    id: number;
    symbol: string; // '₽'
    title: string; // 'RUB'
    active: boolean;
  };

  user: {
    id: number;
    uuid: string;
    firstname: string;
    lastname: string | null;
    empty_p: boolean;
    email: string;
    gender: 'male' | 'female' | string;
    active: number;
    my_referral: string;
    role: string;
    email_verified_at: string | null;
    registered_at: string;
    created_at: string;
    updated_at: string;
  };

  details: OrderDetail[];

  transaction: OrderTransaction | null;

  review: unknown | null;
  point_histories: unknown[];
  order_refunds: unknown[];
  coupon: unknown | null;
  galleries: unknown[];
  my_address: unknown | null;
  table: unknown | null;
}

export interface OrderByIdResponse {
  data: OrderByIdResponseData;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  stock_id: number;
  origin_price: number;
  total_price: number;
  discount: number;
  quantity: number;
  bonus: boolean;
  stock: {
    id: number;
    countable_id: number;
    price: number;

    size: string | null;
    color: string | null;
    discount: number;
    product: ProductWithFiles;
  };
  addons: unknown[];
}

export interface ProductTranslation {
  id: number;
  locale: string;
  title: string;
  description: string;
}

export interface ProductBase {
  id: number;
  uuid: string;
  shop_id: number;
  category_id: number;
  status: string;
  active: boolean;
  addon: boolean;
  visibility: boolean;
  vegetarian: boolean;
  img: string | null;
  stocks_count: number;
  net_price: number;
  sell_price: number;
  translation: ProductTranslation;
  extras: ProductExtra[];
}

export interface ProductWithFiles extends ProductBase {
  public_manual?: ProductFile;
  private_manual?: ProductFile;
  model_assets_archive?: ProductFile;
  files?: ProductFile[]; // просто массив всех файлов, если бэкенд так отдаёт
}

export type ProductFileType = 'public_manual_pdf' | 'private_manual_pdf' | 'assets_archive';

export type ProductFileVisibility = 'public' | 'after_purchase';

export interface ProductFile {
  id: number;
  product_id: number;
  type: ProductFileType;
  visibility: ProductFileVisibility;
  path: string;
  original_name: string;
  mime: string;
  size: number | null;
}

export interface ProductExtra {
  id: number;
  extra_group_id: number;
  value: string;
  active: boolean;
  group: {
    id: number;
    type: 'text' | 'color' | string;
    active: boolean;
    translation: {
      id: number;
      locale: string;
      title: string;
    };
    translations?: {
      id: number;
      locale: string;
      title: string;
    }[];
    extra_values: unknown[];
    locales: string[];
  };
}

export interface OrderTransaction {
  id: number;
  payable_id: number;
  price: number;
  payment_trx_id: string;
  note: string;
  perform_time: string;
  status: string; // 'paid' и др.
  status_description: string;
  payment_system: {
    id: number;
    tag: string; // 'gazprombank'
    input: number;
    active: boolean;
  };
}
