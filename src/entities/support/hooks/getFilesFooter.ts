import { useQuery } from '@tanstack/react-query';
import { supportService } from '../service/support.service';
import { AppSetting } from '../types';

export function useGetFilesFooter() {
  return useQuery<AppSetting[]>({
    queryKey: ['all-files-footer'],
    queryFn: ({ signal }) => supportService.getAllFilesFooter(signal),
  });
}
