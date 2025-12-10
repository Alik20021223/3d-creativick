import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ItemFilter } from '@entities/main/types';
import { profileService } from '@entities/profile/service/profile.service';
import { FavoriteResponse } from '@entities/profile/types/favorite';

export function useGetAllFavorite(params?: ItemFilter) {
  return useQuery<FavoriteResponse>({
    queryKey: ['auth', 'favorites', params ?? {}],
    queryFn: ({ signal }) => profileService.getFavorites(params, signal),

    // хотим свежие данные при каждом заходе на страницу
    staleTime: 0,
    refetchOnMount: 'always', // ⬅️ перезапускай на маунте
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,

    placeholderData: keepPreviousData,
    retry: 0,
  });
}
