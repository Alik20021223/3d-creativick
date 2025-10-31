import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useDeleteShoppingCart = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['delete-shopping-cart'],
    mutationFn: (payload: { ids: number[] }) => profileService.deleteShoppingCart(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-shopping-cart'] });
    },
  });
};
