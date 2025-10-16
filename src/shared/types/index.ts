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

export type BenefitCardMock = {
  id: string;
  title: string[];
  lines: string;
  buttonText?: string;
  image?: string;
  accentClassName?: string;
};
