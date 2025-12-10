import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useDeleteShoppingCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['delete-shopping-cart'],
    mutationFn: (payload: { ids: number[] }) => profileService.deleteShoppingCart(payload),
    onSuccess: () => {
      // Принудительно обновляем данные корзины
      qc.refetchQueries({ queryKey: ['auth', 'get-shopping-cart'] });
      qc.invalidateQueries({ queryKey: ['order', 'calculate'] });
    },
  });
};
