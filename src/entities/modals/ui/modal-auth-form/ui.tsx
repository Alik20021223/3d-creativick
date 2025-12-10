import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ModalAuthFormType, ModalAuthSchema } from './validation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/shadcn/input-otp';
import { useModalStore } from '../../store';
import { useVerifyCode } from '../../hooks/getCode';
import { useAppStore } from '@app/store';
import { useResendTimer } from '../../hooks/useResendTimer';
import { formatTime } from '../../utils/timer';
import { ErrorMessage } from '@shared/components/error-message';

interface ModalAuthFormProps {
  open: boolean;
}

const ModalAuthForm: React.FC<ModalAuthFormProps> = ({ open }) => {
  const { openModal, closeModal, email } = useModalStore();
  const { setIsAuth } = useAppStore();

  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isPending } = useVerifyCode();

  const form = useForm<ModalAuthFormType>({
    defaultValues: { code: '' },
    resolver: zodResolver(ModalAuthSchema),
    mode: 'onBlur',
  });

  const { watch, handleSubmit, control } = form;
  const currentCode = watch('code');

  const { timeLeft, isResendActive, startTimer } = useResendTimer(open);

  const onSubmit = (data: ModalAuthFormType) => {
    setServerError(null); // сброс перед запросом
    mutate(
      { code: data.code },
      {
        onSuccess: (res) => {
          if (res.status) {
            // успех: показать форму регистрации, закрыть otp
            openModal('success_auth_otp');
            closeModal('auth_otp');
            localStorage.setItem('token', res.data.token);
            setIsAuth?.(true);
            form.reset({ code: '' });
          } else {
            setServerError(res.message || 'Неверный код. Попробуйте ещё раз.');
          }
        },
        onError: () => {
          form.reset({ code: '' });
          setServerError('Код не правильный. Проверьте правильность и попробуйте ещё раз.');
        },
      },
    );
  };

  const handleResend = () => {
    console.log('Код отправлен повторно. Запуск таймера.');
    startTimer();
  };

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('auth_otp')}
        headerClassName='text-center'
        className='max-w-md!'
        title='Авторизация'
        footer={
          <>
            <div className='flex w-full flex-col gap-2'>
              <ErrorMessage message={serverError ?? ''} />
              <div className='flex w-full gap-3'>
                <div className='flex w-full gap-3'>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className='h-full flex-1 text-white'
                    disabled={currentCode.length !== 4 || isPending}
                  >
                    {isPending ? 'Отправляем…' : 'Отправить'}
                  </Button>
                </div>
              </div>
            </div>
          </>
        }
      >
        <div className='flex flex-col items-center'>
          <h1 className='text-secondary-text my-3 text-center'>Код отправлен на почту {email}</h1>
          <p className='mb-6 text-center text-base text-gray-700'>
            Если письма нет 1–2 минуты, проверьте папки «Спам» и «Промоакции».
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
            {/* Использование Controller для интеграции с react-hook-form */}
            <Controller
              control={control}
              name='code'
              render={({ field }) => (
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className='gap-4'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </form>

          {/* Блок таймера / повторной отправки */}
          {isResendActive ? (
            <Button
              variant='link'
              onClick={handleResend}
              className='h-auto p-0 font-medium text-blue-600'
              disabled={isPending}
            >
              Отправить код повторно
            </Button>
          ) : (
            <p className='text-sm text-gray-500'>
              Отправить код повторно через:{' '}
              <span className='font-semibold'>{formatTime(timeLeft)}</span>
            </p>
          )}
        </div>
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalAuthForm;
