import { useMutation } from '@tanstack/react-query';
import { modalService } from '../service/modal.service';
import { RegisterResponse, RegisterFormPayload } from '../types';

export const useRegisterForm = () => {
  return useMutation<RegisterResponse, unknown, RegisterFormPayload>({
    mutationKey: ['register-form'],
    mutationFn: (payload) => modalService.register(payload),
  });
};
