import { ProductCardType } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { productKeys } from '../keys/product.keys';
import { productService } from '../service/product.service';

export function useProductById(id: string | undefined) {
  return useQuery<ProductCardType>({
    enabled: !!id,
    queryKey: id ? productKeys.detail(id) : ['products', 'detail', 'empty'],
    queryFn: ({ signal }) => productService.getProductById(id!, signal),
    staleTime: 5 * 60_000,
  });
}
