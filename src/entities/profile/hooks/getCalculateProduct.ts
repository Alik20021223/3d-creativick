import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { OrderCalculateData, OrderCalculateRequest, OrderCalculateResponse } from '../types/order';

type Opts = {
  enabled?: boolean;
};

export function useCalculateOrderProducts(payload: OrderCalculateRequest | undefined, opts?: Opts) {
  const enabled = (opts?.enabled ?? true) && Boolean(payload?.products?.length);

  return useQuery<OrderCalculateResponse, Error, OrderCalculateData>({
    queryKey: ['order', 'calculate', payload],
    enabled,
    queryFn: ({ signal }) => profileService.getCalcProduct(payload!, signal),
    select: (resp) => resp.data,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 0,
  });
}
