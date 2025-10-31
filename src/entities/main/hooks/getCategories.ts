// @entities/catalog/catalog.hooks.ts
import { useQuery } from '@tanstack/react-query';
import { catalogKeys } from '@entities/main/keys/catalog.keys';
import { catalogService } from '@entities/main/service/catalog.service';
import { Category } from '../types';

export function useCatalogCategories() {
  return useQuery<Category[]>({
    queryKey: catalogKeys.categories(),
    queryFn: ({ signal }) => catalogService.getCategories(signal),
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    placeholderData: (prev) => prev, // без мигания при переключениях
    retry: 0,
  });
}
