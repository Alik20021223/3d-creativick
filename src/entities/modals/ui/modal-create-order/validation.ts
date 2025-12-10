import { z } from 'zod';

export const OrderFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, 'Укажите телефон')
    .refine(
      (v) => v.replace(/[^\d]/g, '').length >= 11, // +7XXXXXXXXXX
      'Неверный формат телефона',
    ),
  address: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')) // разрешаем ''
    .refine((v) => v === '' || v!.length >= 6, {
      message: 'Укажите адрес доставки',
    }),
  wish: z.string().trim().max(500, 'Не более 500 символов').optional().or(z.literal('')),
  consent: z.boolean().refine((v) => v === true, { message: 'Нужно дать согласие' }),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
