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
