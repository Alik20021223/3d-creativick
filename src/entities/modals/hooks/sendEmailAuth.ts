import { useMutation } from '@tanstack/react-query';
import { modalService } from '../service/modal.service';
import { AuthCheckResponse, LkLoginPayload } from '../types';

export const useLkLogin = () => {
  return useMutation<AuthCheckResponse, unknown, LkLoginPayload>({
    mutationKey: ['auth-check'],
    mutationFn: (payload) => modalService.checkAuth(payload),
  });
};
