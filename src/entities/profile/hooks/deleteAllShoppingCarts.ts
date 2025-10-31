import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useDeleteAllShoppingCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['delete-all-shopping-cart'],
    mutationFn: (payload: { ids: number[] }) => profileService.deleteAllShoppingCart(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-shopping-cart'] });
    },
  });
};
