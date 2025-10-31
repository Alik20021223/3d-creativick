import z from 'zod';

export const ModalRegisterSchema = z.object({
  code: z.string().trim(),
});

export type ModalRegisterFormType = z.infer<typeof ModalRegisterSchema>;
