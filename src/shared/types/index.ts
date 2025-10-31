import SwiperInstance from 'swiper';

export type BreadCrumpType = {
  PATH: string;
  BREADCRUMB: string;
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

export type ProductCardType = {
  id: number;
  uuid: string;
  category_id: number;
  active: boolean;
  discounts: {
    price: number;
  }[];

  img: string;

  galleries: GalleriesType[];

  /** Цены */
  net_price: number;
  sell_price: number;

  /** Перевод (локализация) */
  translation: {
    id: number;
    locale: string;
    title: string;
    description?: string | null;
  };

  /** Остатки по складам / цветам / размерам */
  stock_balances: {
    id: number;
    color?: string | null;
    size?: string | null;
  }[];
};

export type ProductCardTypeById = {
  data: ProductCardType;
};

export type Badge = { icon: React.ReactNode; text: React.ReactNode };

export type SelectOption = {
  value: number;
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
