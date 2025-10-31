import { useQuery } from '@tanstack/react-query';
import { ItemFilter } from '@entities/main/types';
import { profileService } from '@entities/profile/service/profile.service';
import { OrderProfileResponse } from '@entities/profile/types/order';

export function useGetAllOrders(params?: ItemFilter) {
  return useQuery<OrderProfileResponse>({
    queryKey: ['auth', 'get-all-orders'],
    queryFn: async ({ signal }) => {
      const res = await profileService.getOrderProfile(params, signal);
      return res;
    },
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
