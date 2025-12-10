import { useMutation } from '@tanstack/react-query';
import { modalService } from '../service/modal.service';
import { PayOrderPayload } from '../types';
import { PayOrderResponse } from '../types/order';

export const usePayOrder = () => {
  return useMutation<PayOrderResponse, unknown, PayOrderPayload>({
    mutationKey: ['pay-order'],
    mutationFn: (payload) => modalService.PayOrder(payload),
  });
};
