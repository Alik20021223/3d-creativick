import { useQuery } from '@tanstack/react-query';
import { ItemFilter } from '@entities/main/types';
import { profileService } from '@entities/profile/service/profile.service';
import { FavoriteResponse } from '@entities/profile/types/favorite';

export function useGetAllFavorite(params?: ItemFilter) {
  return useQuery<FavoriteResponse>({
    queryKey: ['auth', 'get-all-favorites'],
    queryFn: async ({ signal }) => {
      const res = await profileService.getFavorites(params, signal);
      return res;
    },
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
