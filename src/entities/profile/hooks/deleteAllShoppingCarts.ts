import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { useAppStore } from '@app/store';

export const useDeleteAllShoppingCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['delete-all-shopping-cart'],
    mutationFn: (payload: { ids: number[] }) => profileService.deleteAllShoppingCart(payload),
    onSuccess: () => {
      // Обновляем корзину в React Query
      qc.invalidateQueries({ queryKey: ['auth', 'get-shopping-cart'] });

      // Если считаешь итоги через отдельный хук
      qc.invalidateQueries({ queryKey: ['order', 'calculate'] });

      // И сразу чистим Zustand
      const { setCartItems } = useAppStore.getState();
      setCartItems(null); // или пустую структуру
    },
  });
};
