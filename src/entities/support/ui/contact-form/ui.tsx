import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@shadcn/button';
import { Check, Loader2 } from 'lucide-react';
import CustomInput from '@feature/custom-input';
import CustomTextArea from '@feature/custom-textarea';
import LabeledCheckbox from '@feature/custom-checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactDefaultValues, ContactFormFields, contactSchema } from './validation';
import { useSendContactForm } from '../../hooks/sendContactForm';
import { useSharedStore } from '@/shared/store';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const ContactForm = () => {
  const form = useForm<ContactFormFields>({
    defaultValues: contactDefaultValues,
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const { appSettings } = useSharedStore();

  const userAgreementUrl =
    appSettings.find((s) => s.key === 'user_agreement')?.value ?? '/personal-data';

  const offerAgreementUrl = appSettings.find((s) => s.key === 'offer_agreement')?.value ?? '/offer';

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    control,
    reset,
  } = form;

  const { mutateAsync, isPending } = useSendContactForm();

  const [state, setState] = useState<SubmitState>('idle');
  const disabled = !isValid || isSubmitting || isPending || state === 'loading';

  const onSubmit = async (data: ContactFormFields) => {
    try {
      setState('loading');

      const { message } = await mutateAsync({
        name: data.name,
        phone: data.phone || '',
        email: data.email,
        company: data.company || '',
        message: data.message || '',
      });

      if (message === 'Заявка отправлена. Спасибо!') {
        setState('success');
        reset(contactDefaultValues);
        setTimeout(() => setState('idle'), 3000);
      }
    } catch (e) {
      console.error(e);
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-secondary-white flex w-full flex-col space-y-5 rounded-[22px] p-10'
      >
        {/* поля */}
        <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1'>
          <CustomInput<ContactFormFields>
            name='name'
            label='Ваше имя*'
            placeholder='Ваше имя'
            className='h-12 rounded-[40px]'
            clearable={false}
            disabled={isSubmitting || state === 'loading'}
            rules={{ required: 'Укажите имя' }}
          />
          <CustomInput<ContactFormFields>
            name='phone'
            label='Номер телефона'
            type='tel'
            inputMode='tel'
            placeholder='+7 (000) 000-00-00'
            className='h-12 rounded-[40px]'
            clearable={false}
            disabled={isSubmitting || state === 'loading'}
          />
        </div>

        <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1'>
          <CustomInput<ContactFormFields>
            name='email'
            label='Email*'
            placeholder='example@gmail.com'
            className='h-12 rounded-[40px]'
            clearable={false}
            disabled={isSubmitting || state === 'loading'}
            rules={{
              required: 'Укажите email',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Некорректный email' },
            }}
          />
          <CustomInput<ContactFormFields>
            name='company'
            label='Компания'
            placeholder=''
            clearable={false}
            className='h-12 rounded-[40px]'
            disabled={isSubmitting || state === 'loading'}
          />
        </div>

        <CustomTextArea<ContactFormFields>
          name='message'
          label='Сообщение'
          placeholder=''
          clearable={false}
          autoResize
          className='min-h-[140px] rounded-[22px]'
          disabled={isSubmitting || state === 'loading'}
        />

        {/* чекбоксы */}
        <div className='space-y-3'>
          <Controller
            control={control}
            name='agreePrivacy'
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <LabeledCheckbox
                checked={field.value}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
                error={fieldState.error?.message}
                disabled={isSubmitting || state === 'loading'}
                label={
                  <span className='text-secondary-text text-sm'>
                    Я ознакомлен(а) с{' '}
                    <a href={userAgreementUrl} className='text-blue-500 underline'>
                      политикой конфиденциальности
                    </a>
                  </span>
                }
              />
            )}
          />
          <Controller
            control={control}
            name='agreePersonal'
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <LabeledCheckbox
                checked={field.value}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
                error={fieldState.error?.message}
                disabled={isSubmitting || state === 'loading'}
                label={
                  <span className='text-secondary-text text-sm'>
                    Даю согласие на{' '}
                    <a href={offerAgreementUrl} className='text-blue-500 underline'>
                      обработку персональных данных
                    </a>
                  </span>
                }
              />
            )}
          />
          {/* <Controller
            control={control}
            name='agreeMarketing'
            render={({ field }) => (
              <LabeledCheckbox
                checked={field.value}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
                disabled={isSubmitting || state === 'loading'}
                label={
                  <span className='text-secondary-text text-sm'>
                    Согласен на рассылку рекламных материалов
                  </span>
                }
              />
            )}
          /> */}
        </div>

        {/* кнопка */}
        <div className='flex items-center justify-end gap-4'>
          {state === 'success' && (
            <span className='text-sm text-green-600'>Отправлено! Мы свяжемся с вами.</span>
          )}
          {state === 'error' && (
            <span className='text-sm text-red-600'>Ошибка отправки. Попробуйте ещё раз.</span>
          )}

          <Button
            type='submit'
            disabled={disabled}
            className={
              state === 'success'
                ? 'h-12 rounded-full bg-green-600 px-8 text-white hover:bg-green-700'
                : 'h-12 rounded-full px-8 text-white'
            }
          >
            <span className='inline-flex items-center gap-2'>
              {state === 'loading' && <Loader2 className='h-4 w-4 animate-spin' />}
              {state === 'success' && <Check className='h-4 w-4' />}
              {state === 'idle' && 'Отправить'}
              {state === 'loading' && 'Отправка…'}
              {state === 'success' && 'Отправлено'}
              {state === 'error' && 'Повторить'}
            </span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
