// @shared/hooks/useDependentVariants.ts
import { useMemo } from 'react';
import type { ProductCardType } from '@shared/types';
import {
  buildVariantMatrix,
  getColorButtons,
  type ProductLike,
  findOptionIdBySelection,
} from '@utils/product-variants';

export type DependentVariantsView = {
  availableWeights: number[];
  availableColors: { value: string; class: string }[];
  isValidCombo: boolean;
  corrected: { color?: string; weight?: number };
  selectedStockId?: number; // ← добавили
};

export function useDependentVariants(
  data: ProductCardType | undefined,
  selectedColor?: string,
  selectedWeight?: number,
): DependentVariantsView {
  return useMemo(() => {
    if (!data) {
      return {
        availableWeights: [],
        availableColors: [],
        isValidCombo: false,
        corrected: {},
        selectedStockId: undefined,
      };
    }

    const product: ProductLike = { uuid: data.uuid, stock_balances: data.stock_balances };
    const matrix = buildVariantMatrix(product);
    const allColorButtons = getColorButtons(product);

    const availableWeights = selectedColor
      ? matrix.getWeightsForColor(selectedColor)
      : Array.from(new Set(matrix.byWeight.keys())).sort((a, b) => a - b);

    const availableColorStrings = Number.isFinite(selectedWeight)
      ? matrix.getColorsForWeight(selectedWeight)
      : allColorButtons.map((c) => c.value);

    const availableColors = allColorButtons.filter((c) => availableColorStrings.includes(c.value));

    const isValidCombo =
      !!selectedColor &&
      Number.isFinite(selectedWeight) &&
      matrix.hasCombo(selectedColor, selectedWeight);

    let corrected: { color?: string; weight?: number } = {};
    if (!isValidCombo) {
      if (selectedColor && availableWeights.length) {
        corrected = { color: selectedColor, weight: availableWeights[0] };
      } else if (Number.isFinite(selectedWeight) && availableColors.length) {
        corrected = { color: availableColors[0].value, weight: selectedWeight };
      } else if (availableColors.length && availableWeights.length) {
        corrected = { color: availableColors[0].value, weight: availableWeights[0] };
      }
    }

    // ← вычисляем stock_id по текущему (или скорректированному) выбору
    const colorForId = corrected.color ?? selectedColor;
    const weightForId = corrected.weight ?? selectedWeight;
    const selectedStockId = findOptionIdBySelection(product, colorForId, weightForId);

    return { availableWeights, availableColors, isValidCombo, corrected, selectedStockId };
  }, [data, selectedColor, selectedWeight]);
}
