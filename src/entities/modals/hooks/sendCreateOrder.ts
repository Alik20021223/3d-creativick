import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modalService } from '../service/modal.service';
import { CreateOrderRequest } from '../types';

export const useCreateOrder = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: (payload: CreateOrderRequest) => modalService.createOrder(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-shopping-cart'] });
    },
  });
};
