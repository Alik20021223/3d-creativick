import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { ShoppingCartResponse } from '../types/cart';

export const useGetShoppingCart = () => {
  return useQuery<ShoppingCartResponse>({
    queryKey: ['auth', 'get-shopping-cart'],
    queryFn: ({ signal }) => profileService.getShoppingCart(signal),
  });
};
