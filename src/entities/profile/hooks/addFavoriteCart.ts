import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useAddToFavoriteCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['favorite', 'toggle'],
    mutationFn: (id: string) => profileService.AddFavorite(id),
    onSuccess: () => {
      // Обновим все варианты списка избранного (с любыми params)
      qc.invalidateQueries({
        queryKey: ['auth', 'favorites'], // префикс
        refetchType: 'active', // активные рефетчнем сразу
        exact: false,
      });
    },
  });
};
