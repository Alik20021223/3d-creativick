import { DiscountType } from "@/shared/types";

export type GuestCartItem = {
  stock_id: number;
  quantity: number;
  product_uuid: string;
  color?: string;
  weight?: string;
  shop_id: number;
  currency_id: number;
  addedAt: number;
  img: string;
  price: number;
  discount: DiscountType;
  title: string;
  description: string;
};
