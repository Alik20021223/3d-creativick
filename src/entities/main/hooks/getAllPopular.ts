import { useQuery } from '@tanstack/react-query';
import { popularService } from '@entities/main/service/popular.service';
import { PopularKeys } from '@entities/main/keys/popular.keys';
import { ProductCardType } from '@shared/types';

export function usePopularGet() {
  return useQuery<ProductCardType[]>({
    queryKey: PopularKeys.list(),
    queryFn: ({ signal }) => popularService.getAll(signal),
    staleTime: 60_000, // 1 минута
    gcTime: 10 * 60_000,
    retry: 0,
  });
}
