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
  bought: number;
  href: string;
};

export type ColorButtonType = {
  value: string;
  class: string;
};

export type ProductCardType = {
  activeColor?: string;
  description?: string;
  category: string[];
  price: {
    last_price?: number;
    new_price: number;
  };
  title: string;
  id: number;
  image: string[];
};

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
