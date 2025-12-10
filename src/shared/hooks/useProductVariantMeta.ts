// @shared/utils/useProductVariantMeta.ts
import { useMemo } from 'react';
import type { ProductLike } from '@utils/product-variants';
import { getVariantMeta } from '@utils/product-variants';

export function useProductVariantMeta(product: ProductLike) {
  return useMemo(() => getVariantMeta(product), [product]);
}
