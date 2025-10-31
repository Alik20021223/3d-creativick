import { Option } from '@shared/types';
import z from 'zod';

// Опции для поля "Пол"
export const GENDER_OPTIONS: Option[] = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;

export const ModalRegisterSchema = z.object({
  // Ваше имя
  name: z.string().trim().min(2, 'Имя должно содержать минимум 2 символа'),
  // Дата рождения (используется Date, т.к. CalendarField возвращает Date)
  birthDate: z
    .date()
    .max(new Date(), { message: 'Дата рождения не может быть в будущем' })
    .nullable(),
  // Пол
  gender: z.enum(GENDER_OPTIONS.map((opt) => opt.value) as [string, ...string[]], {
    message: 'Выберите ваш пол',
  }),

  // Чекбоксы
  policyAgreement: z.boolean().refine((val) => val === true, {
    message: 'Вы должны ознакомиться с политикой конфиденциальности',
  }),
  dataProcessing: z.boolean().refine((val) => val === true, {
    message: 'Вы должны дать согласие на обработку персональных данных',
  }),
  newsletter: z.boolean().optional(), // Опционально
});

export type ModalRegisterFormType = z.infer<typeof ModalRegisterSchema>;

export const genderOptions = GENDER_OPTIONS;
