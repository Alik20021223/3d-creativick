// @shared/utils/product-variants.ts
import { ColorButtonType } from '@shared/types';

export type StockBalanceLike = {
  id: number;
  color?: string | null;
  size?: string | null;
  quantity?: number | null;
};

export type ProductLike = {
  uuid: string;
  stock_balances?: StockBalanceLike[] | null;
};

const norm = (v?: string | null) => (v ?? '').trim();
const normColor = (c?: string | null) => norm(c).toLowerCase();
const isReal = (v?: string | null) => {
  const s = norm(v).toLowerCase();
  return s !== '' && s !== 'default';
};

export function getStockOptions(product: ProductLike) {
  const list = product.stock_balances ?? [];
  return list.map((sb) => {
    const sizeStr = norm(sb.size);
    const weightNum = Number(sizeStr.replace(',', '.').replace(/[^\d.]/g, ''));
    return {
      id: sb.id,
      color: normColor(sb.color),
      size: sizeStr,
      weight: Number.isFinite(weightNum) ? weightNum : (undefined as number | undefined),
      quantity: sb.quantity ?? 1,
    };
  });
}

export function getUniqueColors(product: ProductLike): string[] {
  const set = new Set<string>();
  getStockOptions(product).forEach((o) => {
    if (isReal(o.color)) set.add(o.color);
  });
  return Array.from(set);
}

export function getUniqueSizes(product: ProductLike): string[] {
  const options = getStockOptions(product);
  const hasDefault = options.some((o) => norm(o.size).toLowerCase() === 'default');

  if (hasDefault) {
    return [];
  }

  const set = new Set<string>();
  options.forEach((o) => {
    if (isReal(o.size)) set.add(o.size);
  });

  return Array.from(set);
}

export function getVariantMeta(product: ProductLike) {
  const options = getStockOptions(product);
  const colors = getUniqueColors(product);
  const sizes = getUniqueSizes(product);
  const hasColors = colors.length > 0;
  const hasSizes = sizes.length > 0;
  return { options, colors, sizes, hasColors, hasSizes };
}

// === НОВОЕ: матрица совместимости ===
export function buildVariantMatrix(product: ProductLike) {
  const options = getStockOptions(product);

  const byColor = new Map<string, Set<number>>();
  const byWeight = new Map<number, Set<string>>();
  const combos = new Set<string>(); // key: `${color}|${weight}`

  for (const o of options) {
    const c = normColor(o.color);
    const w = o.weight;

    if (!isReal(c) || !Number.isFinite(w)) continue;

    if (!byColor.has(c)) byColor.set(c, new Set<number>());
    byColor.get(c)!.add(w!);

    if (!byWeight.has(w!)) byWeight.set(w!, new Set<string>());
    byWeight.get(w!)!.add(c);

    combos.add(`${c}|${w}`);
  }

  // Вспомогательные геттеры
  const getWeightsForColor = (color?: string | null): number[] => {
    const c = normColor(color);
    const set = byColor.get(c);
    return set ? Array.from(set).sort((a, b) => a - b) : [];
  };

  const getColorsForWeight = (weight?: number): string[] => {
    if (!Number.isFinite(weight)) return [];
    const set = byWeight.get(weight!);
    return set ? Array.from(set).sort() : [];
  };

  const hasCombo = (color?: string | null, weight?: number) => {
    const c = normColor(color);
    if (!isReal(c) || !Number.isFinite(weight)) return false;
    return combos.has(`${c}|${weight}`);
  };

  return { byColor, byWeight, combos, getWeightsForColor, getColorsForWeight, hasCombo };
}

export function getNumericWeights(product: ProductLike): number[] {
  const { options } = getVariantMeta(product);

  const nums = Array.from(
    new Set(options.map((o) => o.weight).filter((n): n is number => Number.isFinite(n))),
  ).sort((a, b) => a - b);

  // 🔍 если массив содержит только 0 или пуст — считаем, что весов нет
  if (nums.length === 0 || (nums.length === 1 && nums[0] === 0)) {
    return [];
  }

  return nums;
}

export function getColorButtons(product: ProductLike): ColorButtonType[] {
  const { colors } = getVariantMeta(product);
  return colors.map((c) => ({ value: c, class: c }));
}

// Умный выбор старта: первый цвет, минимальная доступная граммовка для него
export function getInitialVariant(product: ProductLike): { color?: string; weight?: number } {
  const matrix = buildVariantMatrix(product);
  const allColors = getColorButtons(product);

  const firstColor = allColors[0]?.value;
  const weightsForFirst = matrix.getWeightsForColor(firstColor);

  if (firstColor && weightsForFirst.length) {
    return { color: firstColor, weight: weightsForFirst[0] };
  }

  // fallback: глобально минимальный вес и первый доступный цвет под него
  const allWeights = getNumericWeights(product);
  const firstWeight = allWeights[0];
  const colorsForFirstWeight = matrix.getColorsForWeight(firstWeight);
  if (Number.isFinite(firstWeight) && colorsForFirstWeight.length) {
    return { color: colorsForFirstWeight[0], weight: firstWeight };
  }

  // совсем нет валидных комбо
  return {};
}

/** Правило выбора роута — без изменений */
export function getProductDetailPath(product: ProductLike): string {
  const { hasColors, hasSizes } = getVariantMeta(product);
  if (hasColors && hasSizes) return `/product/spool/${product.uuid}`;
  if (hasColors) return `/product/printer/${product.uuid}`;
  return `/product/${product.uuid}`;
}

export function getDetailPathByVariant(
  uuid: string,
  color?: string | null,
  size?: string | null,
): string {
  const hasColor = isReal(color);
  const hasSize = isReal(size);

  if (hasColor && hasSize) return `/product/spool/${uuid}`;
  if (hasColor) return `/product/printer/${uuid}`;
  return `/product/${uuid}`;
}

export function findOptionIdBySelection(
  product: ProductLike,
  color?: string | null,
  weight?: number | null,
): number | undefined {
  const options = getStockOptions(product);

  const c = normColor(color);
  const w = Number.isFinite(weight as number) ? (weight as number) : undefined;

  // если и цвет, и вес заданы → точное совпадение
  if (isReal(c) && Number.isFinite(w)) {
    const exact = options.find((o) => o.color === c && o.weight === w);
    if (exact) return exact.id;
  }

  // если задан только цвет → берём минимальный доступный вес для этого цвета
  if (isReal(c) && !Number.isFinite(w)) {
    const byColor = options
      .filter((o) => o.color === c && Number.isFinite(o.weight as number))
      .sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0));
    if (byColor[0]) return byColor[0].id;
  }

  // если задан только вес → берём первый цвет, у которого есть этот вес
  if (!isReal(c) && Number.isFinite(w)) {
    const byWeight = options
      .filter((o) => o.weight === w)
      .sort((a, b) => a.color.localeCompare(b.color));
    if (byWeight[0]) return byWeight[0].id;
  }

  // иначе — первый доступный вариант (стабильно: минимальный вес, затем цвет)
  const fallback = options
    .filter((o) => Number.isFinite(o.weight as number) || isReal(o.color))
    .sort((a, b) => {
      const wa = a.weight ?? Number.POSITIVE_INFINITY;
      const wb = b.weight ?? Number.POSITIVE_INFINITY;
      if (wa !== wb) return wa - wb;
      return a.color.localeCompare(b.color);
    })[0];

  return fallback?.id;
}

/**
 * Проверяет, есть ли у товара хотя бы один доступный вариант (stock_id)
 * @param product - Товар для проверки
 * @returns true, если есть доступный вариант, false - если нет
 */
export function hasAvailableStock(product: ProductLike): boolean {
  if (!product?.stock_balances || product.stock_balances.length === 0) {
    return false;
  }

  // Проверяем, есть ли хотя бы один доступный вариант через findOptionIdBySelection
  const stockId = findOptionIdBySelection(product, undefined, undefined);
  return stockId !== undefined;
}
