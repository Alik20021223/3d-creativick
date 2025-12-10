import { useQuery } from '@tanstack/react-query';
import { productService } from '../service/product.service';
import { ExternalStore } from '@/entities/products/types';

export function useGetAllMarkets() {
  return useQuery<ExternalStore[]>({
    queryKey: ['all-markets'],
    queryFn: ({ signal }) => productService.getAllMarkets(signal),
  });
}
