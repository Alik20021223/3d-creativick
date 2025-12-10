import { ProductCardType } from '@shared/types';

export type ItemSwiper = {
  countMoney: number;
  nick: string;
  iconLogo: string;
};

export type ItemStatistic = {
  id: number;
  img: string;
  title: string;
  value: string;
};

export type ProductListResponse = {
  data: ProductCardType[];
  meta: { current_page: number; per_page: number; last_page: number; total: number };
};

export type CategoryResponse = {
  data: Category[];
};

export type ItemFilter = {
  category_id?: string;
  category_ids?: string[];
  search?: string;
  perPage?: number;
  page?: number;
  order_by?: string;
};

export type Category = {
  id: number;
  uuid: string;
  keywords: string;
  img: string;
  active: boolean;
  discounts: number[];
  products_count: number;
  translation: {
    id: number;
    locale: string;
    title: string;
  };
  locales: string[];
  children: Category[];
};
