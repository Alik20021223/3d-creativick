// @shared/hooks/useProductInfoBlock.ts
import { useMemo } from 'react';
import type { ColorButtonType, ProductCardType } from '@shared/types';
import { calcPrice, calcOldPrice } from '@utils/product-pricing';
import { getColorButtons, getNumericWeights, getInitialVariant } from '@utils/product-variants';

export type InfoBlockView = {
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  colors: ColorButtonType[];
  weights: number[];
  showColors: boolean;
  showWeights: boolean;
  initialColor?: string;
  initialWeight?: number;
};

export function useProductInfoBlock(data: ProductCardType | undefined): InfoBlockView {
  return useMemo(() => {
    const title = data?.translation?.title ?? '';
    const description = data?.translation?.description ?? '';

    const price = calcPrice(data ?? {});
    const oldPrice = calcOldPrice(data ?? {}, price);

    const colors = data
      ? getColorButtons({ uuid: data.uuid, stock_balances: data.stock_balances })
      : [];
    const weights = data
      ? getNumericWeights({ uuid: data.uuid, stock_balances: data.stock_balances })
      : [];

    const showColors = colors.length > 0;
    const showWeights = weights.length > 0;

    const { color: initialColor, weight: initialWeight } = data
      ? getInitialVariant({ uuid: data.uuid, stock_balances: data.stock_balances })
      : {};

    return {
      title,
      description,
      price,
      oldPrice,
      colors,
      weights,
      showColors,
      showWeights,
      initialColor,
      initialWeight,
    };
  }, [data]);
}
