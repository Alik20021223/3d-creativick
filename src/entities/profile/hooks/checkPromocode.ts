import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export type CheckCouponPayload = {
  coupon: string;
  shop_id: number;
  user_id: number;
};

export const useCheckCoupon = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['check-coupon'],
    mutationFn: (payload: CheckCouponPayload) => profileService.checkCoupon(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-info-profile'] });
    },
  });
};
