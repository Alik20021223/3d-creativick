import { useQuery } from '@tanstack/react-query';
import { productService } from '../service/product.service';
import { Banner } from '@/entities/products/types';

export function useGetOurActions() {
  return useQuery<Banner[]>({
    queryKey: ['our-actions'],
    queryFn: ({ signal }) => productService.getOurActions(signal),
  });
}
