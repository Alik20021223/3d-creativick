import z from 'zod';

export const ModalLkSchema = z.object({
  email: z.string().trim().min(1, 'Введите ваш email').email('Введите корректный email'),
});

export type ModalLkFormType = z.infer<typeof ModalLkSchema>;
