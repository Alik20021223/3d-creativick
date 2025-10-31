import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useAddToFavoriteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-favorite'],
    mutationFn: (id: string) => profileService.AddFavorite(id),

    // ⬇️ вызывается при успешном добавлении
    onSuccess: () => {
      // инвалидируем (обновляем) кэш корзины
      queryClient.invalidateQueries({
        queryKey: ['auth', 'get-all-favorites'],
      });
    },
  });
};
