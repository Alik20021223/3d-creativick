import z from 'zod';

export const ModalChangeEmailSchema = z.object({
  // Email
  newEmail: z.string().trim().min(1, 'Введите ваш email').email('Введите корректный email'),
});

export type ModalChangeEmailFormType = z.infer<typeof ModalChangeEmailSchema>;
