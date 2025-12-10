import { useQuery } from '@tanstack/react-query';
import { supportService } from '../service/support.service';
import { FaqItem } from '../types';

export function useGetAllFaq(params?: { page_category_id?: number }) {
  return useQuery<FaqItem[]>({
    queryKey: ['faqs', params],
    queryFn: ({ signal }) => supportService.getAllFaq(params, signal),
    staleTime: 60_000,
  });
}
