import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { OrderByIdResponseData } from '../types/order';

export const useGetOrderById = (id: string) => {
  return useQuery<OrderByIdResponseData>({
    queryKey: ['auth', 'get-order-by-id', id],
    enabled: !!id,
    queryFn: ({ signal }) => profileService.getOrderById(id, signal),
  });
};
