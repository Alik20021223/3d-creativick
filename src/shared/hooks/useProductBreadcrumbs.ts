// src/shared/hooks/useProductBreadcrumbs.ts
import { useLocation, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useCatalogCategories } from '@entities/main/hooks/getCategories';
import type { Category } from '@entities/main/types';
import type { ProductCardType } from '@shared/types';
import { buildProductPathMap } from '@shared/lib/buildPathMap';

type UseProductBreadcrumbsArgs = {
  productData?: Pick<ProductCardType, 'uuid' | 'translation' | 'category_id'>;
};

export function useProductBreadcrumbs({ productData }: UseProductBreadcrumbsArgs) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { data: fetchedCategories } = useCatalogCategories();

  const categoryIdFromUrl = searchParams.get('category_id');
  const categoryIdFromProduct = productData?.category_id;

  // Приоритет: сначала из URL, потом из данных товара
  const categoryId = useMemo(() => {
    if (categoryIdFromUrl) {
      const id = Number(categoryIdFromUrl);
      if (!Number.isNaN(id)) return id;
    }
    if (categoryIdFromProduct) {
      return categoryIdFromProduct;
    }
    return undefined;
  }, [categoryIdFromUrl, categoryIdFromProduct]);

  const activeCategory = useMemo<Category | undefined>(() => {
    if (!categoryId || !fetchedCategories) return undefined;
    return fetchedCategories.find((c) => c.id === categoryId);
  }, [categoryId, fetchedCategories]);

  // URL каталога с фильтром
  const categoryLink = useMemo(() => {
    if (!activeCategory) return '';
    return `/?category_id=${activeCategory.id}#shop`;
  }, [activeCategory]);

  // базовый путь для категории: /product
  const categoryPathForMatch = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean); // ['product','uuid']
    if (parts.length === 0) return '/';
    return `/${parts[0]}`; // '/product'
  }, [location.pathname]);

  const pathMap = useMemo(
    () =>
      buildProductPathMap(
        productData,
        location.pathname, // полный путь товара
        activeCategory
          ? {
              category: {
                title: activeCategory.translation?.title ?? '',
                pathForMatch: categoryPathForMatch,
                link: categoryLink,
              },
            }
          : undefined,
      ),
    [productData, location.pathname, activeCategory, categoryLink, categoryPathForMatch],
  );

  return {
    pathMap,
    activeCategory,
    categoryLink,
  };
}
