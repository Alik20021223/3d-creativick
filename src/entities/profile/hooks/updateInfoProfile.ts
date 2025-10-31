import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import { UpdateUserData } from '../types';

export const useUpdateInfoProfile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['update-info-profile'],
    mutationFn: (payload: UpdateUserData) => profileService.updateProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'get-info-profile'] });
    },
  });
};
