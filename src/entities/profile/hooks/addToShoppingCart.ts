import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export type AddToShoppingCartPayload = {
  products: {
    stock_id: number;
    quantity?: number;
  }[];
  currency_id: number;
  shop_id: number;
};

export const useAddToShoppingCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-to-cart'],
    mutationFn: (payload: AddToShoppingCartPayload) => profileService.addToCart(payload),

    // ⬇️ вызывается при успешном добавлении
    onSuccess: () => {
      // инвалидируем (обновляем) кэш корзины
      queryClient.invalidateQueries({
        queryKey: ['auth', 'get-shopping-cart'],
      });
      queryClient.invalidateQueries({
        queryKey: ['order', 'calculate'],
      });
    },
  });
};
