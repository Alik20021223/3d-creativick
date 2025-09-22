// contact.schema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя").min(2, "Имя слишком короткое"),
  phone: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().min(1, "Укажите email").email("Некорректный email"),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Слишком длинное сообщение").optional().or(z.literal("")),
  agreePrivacy: z.boolean().refine((v) => v, { message: "Обязательное поле" }),
  agreePersonal: z.boolean().refine((v) => v, { message: "Обязательное поле" }),
  // БЫЛО: z.boolean().default(true)
  agreeMarketing: z.boolean(), // ← делаем обязательным
});

export type ContactFormFields = z.infer<typeof contactSchema>;

export const contactDefaultValues: ContactFormFields = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
  agreePrivacy: false,
  agreePersonal: false,
  agreeMarketing: true, // дефолт задаём тут
};
