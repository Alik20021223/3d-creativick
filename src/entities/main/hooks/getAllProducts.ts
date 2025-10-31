import { useQuery } from '@tanstack/react-query';
import { ItemFilter, ProductListResponse } from '@entities/main/types';
import { productKeys } from '@entities/main/keys/product.keys';
import { productService } from '@entities/main/service/product.service';

export function useGetAllProducts(params?: ItemFilter) {
  return useQuery<ProductListResponse>({
    queryKey: productKeys.list(params),
    queryFn: async ({ signal }) => {
      const res = await productService.getProducts(params, signal);

      return { ...res };
    },
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
