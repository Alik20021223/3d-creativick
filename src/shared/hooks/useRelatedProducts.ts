// src/shared/hooks/useRelatedProducts.ts
import { useMemo } from 'react';
import type { ProductCardType } from '@shared/types';
import { getCategoryIds, pickRandom } from '@shared/lib/product-related';
import { hasAvailableStock } from '@utils/product-variants';

type UseRelatedProductsArgs = {
  current?: ProductCardType | null; // текущий продукт (страница)
  all?: ProductCardType[] | null; // все продукты (из useGetAllProducts)
  limit?: number; // сколько максимум вернуть
};

export function useRelatedProducts({
  current,
  all,
  limit = 9,
}: UseRelatedProductsArgs): ProductCardType[] {
  return useMemo(() => {
    if (!current || !all || !all.length) return [];

    const currentIds = new Set(getCategoryIds(current));
    if (!currentIds.size) return [];

    const filtered = all.filter((p) => {
      // ❌ не добавляем текущий товар
      if (p.uuid === current.uuid) return false;

      // ❌ показываем только активные товары
      if (p.active !== true) return false;

      // ❌ показываем только товары с доступными вариантами
      if (!hasAvailableStock({ uuid: p.uuid, stock_balances: p.stock_balances })) return false;

      const ids = getCategoryIds(p);
      // есть пересечение категорий?
      return ids.some((id) => currentIds.has(id));
    });

    if (!filtered.length) return [];

    return pickRandom(filtered, limit);
  }, [current, all, limit]);
}
