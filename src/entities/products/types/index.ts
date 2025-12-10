import { Badge, ColorButtonType } from '@shared/types';

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

export type InfoBlockData = {
  title?: string;
  subtitle?: string;
  badges?: Badge[];
  description?: string;
  price?: number;
  oldPrice?: number;

  /** флаги */
  showColors?: boolean;
  showWeights?: boolean;

  /** варианты выбора */
  colors?: ColorButtonType[];
  initialColor?: string;
  weights?: number[]; // напр. [250, 500, 750]
  initialWeight?: number;
};

export type SeriesCardData = {
  title: string;
  prices: {
    current: number;
    old?: number | null;
    currencySymbol?: string; // по умолчанию '₽'
    locale?: string; // по умолчанию 'ru-RU'
  };
  labels?: {
    addToCart?: string;
    savedAriaOn?: string;
    savedAriaOff?: string;
  };
};

export interface BannerTranslation {
  id: number;
  locale: string; // 'ru', 'en', ...
  title: string;
  description: string;
  button_text: string;
}

export interface Banner {
  id: number;
  url: string;
  img: string;
  active: 0 | 1;
  clickable: 0 | 1;
  mobile_img: string;
  type: 'banner' | string;
  created_at: string; // ISO datetime из бэка
  updated_at: string;
  translation: BannerTranslation | null;
}

export type BannersResponse = {
  data: Banner[];
};

export interface ExternalStore {
  id: number;
  name: string;
  logo: string; // относительный путь к лого
  url: string; // внешний URL магазина
  active: boolean;
  sort: number;
  created_at: string; // ISO datetime из бэка
  updated_at: string;
}

export type ExternalStoresResponse = {
  data: ExternalStore[];
};
