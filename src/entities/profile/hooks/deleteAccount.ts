import { useMutation } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

export const useDeleteAccount = () => {
  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: () => profileService.deleteAccount(),
  });
};
