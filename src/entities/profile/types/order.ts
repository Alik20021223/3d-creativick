// Общий ответ
export interface OrderProfileResponse {
  data: Order[];
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
  transactions: Transaction[];
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
