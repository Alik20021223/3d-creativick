import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useState, useEffect, useCallback } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ModalAuthFormType, ModalAuthSchema } from './validation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/shadcn/input-otp';
import { useModalStore } from '../../store';
import { useVerifyCode } from '../../hooks/getCode';
import { useAppStore } from '@app/store';

// --- КОНСТАНТЫ ДЛЯ ТАЙМЕРА ---
const RESEND_TIME_LIMIT = 5 * 60; // 5 минут в секундах
// ------------------------------

interface ModalAuthFormProps {
  open: boolean;
}

const ModalAuthForm: React.FC<ModalAuthFormProps> = ({ open }) => {
  const { openModal, closeModal, email } = useModalStore();
  const { setIsAuth } = useAppStore();

  const [serverError, setServerError] = useState<string | null>(null);

  // 1. Состояние для таймера
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_LIMIT);
  const [isResendActive, setIsResendActive] = useState(false);

  const { mutate, isPending } = useVerifyCode();

  // 2. Инициализация формы
  const form = useForm<ModalAuthFormType>({
    // Убедитесь, что 'code' есть в ModalAuthFormType
    defaultValues: { code: '' },
    resolver: zodResolver(ModalAuthSchema),
    mode: 'onBlur',
  });

  const { watch, handleSubmit, control } = form;
  const currentCode = watch('code');

  // 3. Функция для запуска/сброса таймера
  const startTimer = useCallback(() => {
    setTimeLeft(RESEND_TIME_LIMIT);
    setIsResendActive(false);
  }, []);

  // Запускаем таймер при первом открытии
  useEffect(() => {
    if (open) {
      startTimer();
    }
  }, [open, startTimer]);

  // 4. Эффект для обратного отсчета
  useEffect(() => {
    if (timeLeft > 0 && open && !isResendActive) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            setIsResendActive(true); // Показываем кнопку "Отправить повторно"
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, open, isResendActive]);

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
    // Логика повторной отправки кода на сервер
    console.log('Код отправлен повторно. Запуск таймера.');
    startTimer();
  };

  // Форматирование времени (MM:SS)
  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
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
              {serverError && (
                <div className='w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600'>
                  {serverError}
                </div>
              )}
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
          <p className='mb-6 text-base text-gray-700'>Введите код из SMS</p>

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
