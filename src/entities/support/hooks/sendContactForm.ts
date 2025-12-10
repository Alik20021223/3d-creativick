import { useMutation } from '@tanstack/react-query';
import { supportService } from '../service/support.service';
import { SendContactForm } from '../types';

export const useSendContactForm = () => {
  return useMutation({
    mutationKey: ['send', 'contact-form'],
    mutationFn: (payload: SendContactForm) => supportService.SendForm(payload),
  });
};
