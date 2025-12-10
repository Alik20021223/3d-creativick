import { useQuery } from '@tanstack/react-query';
import { supportService } from '../service/support.service';
import { FaqItem } from '../types';

export function useGetByFaqId(id: number) {
  return useQuery<FaqItem>({
    queryKey: ['faq-by-id', id],
    queryFn: ({ signal }) => supportService.getFaqById(id, signal),
    staleTime: 60_000,
  });
}
