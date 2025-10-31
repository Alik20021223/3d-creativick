import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { UserData } from '../types';

export const useGetInfoProfile = () => {
  return useQuery<UserData>({
    queryKey: ['auth', 'get-info-profile'],
    queryFn: ({ signal }) => profileService.getProfile(signal),
  });
};
