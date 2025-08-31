import SwiperInstance from "swiper";

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
