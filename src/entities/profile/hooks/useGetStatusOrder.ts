import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useGetStatusOrder = (id: string) => {
  return useQuery<unknown>({
    enabled: !!id,
    queryKey: ['auth', 'get-status-order'],
    queryFn: ({ signal }) => profileService.getStatusOrder(id, signal),
  });
};
