import z from 'zod';

export const CodeVerificationSchema = z.object({
  code: z.string().trim().length(4, 'Код должен состоять из 4 цифр'),
});

export type CodeVerificationFormType = z.infer<typeof CodeVerificationSchema>;
