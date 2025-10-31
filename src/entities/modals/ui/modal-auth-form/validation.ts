import z from 'zod';

export const ModalAuthSchema = z.object({
  code: z.string().trim(),
});

export type ModalAuthFormType = z.infer<typeof ModalAuthSchema>;
