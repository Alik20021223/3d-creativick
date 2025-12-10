import SwiperInstance from 'swiper';

// @shared/types.ts
export type BreadCrumpType = {
  PATH: string;
  BREADCRUMB: string;
  LINK?: string; // ← добавили
};

export type HeaderType = {
  label: string;
  href: string;
};

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

export type ProductCardMock = {
  id: string;
  image: string;
  title: string;
  rating: number;
  href: string;
};

export type ColorButtonType = {
  value: string;
  class: string;
};

export type GalleriesType = {
  id: number;
  title: string;
  type: string;
  loadable_id: number;
  path: string;
  base_path: string;
};

export type TranslationType = {
  id: number;
  locale: string;
  title: string;
  description?: string | null;
};

export type ProductModelType = {
  id: number;
  product_id: number;

  translation: TranslationType;

  print_time_min: number;
  material_grams: number;
  file_size_mb: number;

  galleries: GalleriesType[];
};

export type DiscountType = {
    price: number;
    type: string
  }

export type ProductCardType = {
  id: number;
  uuid: string;
  category_id: number;
  active: boolean;
  discounts: DiscountType[];

  img: string;

  galleries: GalleriesType[];

  /** Цены */
  net_price: number;
  sell_price: number;

  /** Перевод (локализация) */
  translation: TranslationType;

  /** Остатки по складам / цветам / размерам */
  stock_balances: {
    id: number;
    color?: string | null;
    size?: string | null;
  }[];

  /** Badges продукта */
  badges?: ProductBadge[];

  has_models?: boolean;

  models?: ProductModelType[];
  print_time_min?: number;
  material_grams?: number;
  file_size_mb?: number;
};

export type ProductCardTypeById = {
  data: ProductCardType;
};

export type Badge = { icon: React.ReactNode; text: React.ReactNode };

export type ProductBadge = {
  id: number;
  slug: string;
  color: string;
  bg_color: string;
  icon: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  translation: {
    id: number;
    locale: string;
    title: string;
    description?: string;
  };
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export type DropdownItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void; // индивидуальный обработчик
};

export type DetailCardType = {
  description: string;
  title: string;
  id: number;
  href: string;
  image: string[];
  badges: string[];
};

export type Option = { label: string; value: string };

export type ModalApp = 'menu' | 'cart' | 'lk';
