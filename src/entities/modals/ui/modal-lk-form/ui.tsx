import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useRef, useState } from 'react';
import CustomInput from '@feature/custom-input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ModalLkFormType, ModalLkSchema } from './validation';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLkLogin } from '../../hooks/sendEmailAuth';
import { useModalStore } from '../../store';

interface ModalLkProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalLkForm: React.FC<ModalLkProps> = ({ open, setOpen }) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const form = useForm<ModalLkFormType>({
    defaultValues: { email: '' },
    resolver: zodResolver(ModalLkSchema),
    mode: 'onBlur',
  });

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const { mutate } = useLkLogin();
  const { openModal, setEmail } = useModalStore();

  const onSubmit = (data: ModalLkFormType) => {
    mutate(
      { email: data.email },
      {
        onSuccess: (response) => {
          setEmail(data.email);
          if (response.data.userRegistered) {
            openModal('auth_otp');
          } else {
            openModal('register_otp');
          }
          setOpen(false);
          form.reset();
        },
        onError: (e) => {
          console.error('Login error:', e);
        },
      },
    );
  };

  // 3. ReCAPTCHA handler
  const onRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      // закрыли модалку → сбросить reCAPTCHA (закроет popup и очистит токен)
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  // Hardcoded benefits list from the image
  const benefits = [
    'Совершать покупки и скачивать 3D модели в любое время;',
    'Сохранять понравившиеся товары в избранное;',
    'Получать наши актуальные акции и специальные предложения.',
  ];

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={handleOpenChange}
        title='Личный кабинет'
        className='max-w-md!' // остаётся
        // Updated footer to match the image: "Регистрация" and "Вход"
        footer={
          <div className='flex w-full gap-3'>
            {/* Login/Submit button - conditionally disabled if no recaptcha value */}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className='h-full flex-1 text-white'
              disabled={!recaptchaValue} // Disable if reCAPTCHA not completed
            >
              Вход / Регистрация
            </Button>
          </div>
        }
      >
        {/* Added benefits text from the image */}
        <p className='mb-4 text-sm'>После входа в личный кабинет вы сможете:</p>
        <ol className='mb-5 list-decimal space-y-2 pl-5 text-sm'>
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ol>

        <form onSubmit={form.handleSubmit(onSubmit)} className='mb-5'>
          <CustomInput<ModalLkFormType>
            name='email'
            placeholder='example@mail.ru'
            className='h-12 rounded-[40px]'
          />
        </form>

        {/* 4. Add ReCAPTCHA component */}
        <div className='pointer-events-auto relative z-[1000] mt-4 flex w-full justify-center'>
          <ReCAPTCHA
            ref={recaptchaRef} // ← привязали ref
            className='flex w-full justify-center'
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY'}
            onChange={onRecaptchaChange}
            onExpired={() => setRecaptchaValue(null)} // по желанию: очистка при истечении
            theme='light'
          />
        </div>
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalLkForm;
