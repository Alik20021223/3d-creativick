import { useMutation } from '@tanstack/react-query';
import { modalService } from '../service/modal.service';
import { VerifyCodeResponse, VerifyVars } from '../types';

export const useVerifyCode = () => {
  return useMutation<VerifyCodeResponse, unknown, VerifyVars>({
    mutationKey: ['auth', 'verify-code'],
    mutationFn: ({ code, signal }) => modalService.verifyCode(code, signal),
  });
};
