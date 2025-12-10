import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { CalcProductAuthPayload } from '../types/cart';
import { OrderCalculateResponse } from '../types/order';

export const useCalcProductAuth = () => {
  const qc = useQueryClient();

  return useMutation<OrderCalculateResponse, Error, CalcProductAuthPayload>({
    mutationKey: ['order', 'calculate', 'calculate-auth'],
    mutationFn: (payload) => profileService.calcProductAuth(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-shopping-cart'] });
    },
  });
};
