import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ModalRegisterFormType, ModalRegisterSchema } from './validation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/shadcn/input-otp';
import { useModalStore } from '@entities/modals/store';
import { useVerifyCode } from '../../hooks/getCode';
import { useResendTimer } from '../../hooks/useResendTimer';
import { formatTime } from '../../utils/timer';
import { ErrorMessage } from '@shared/components/error-message';

interface ModalRegisterFormProps {
  open: boolean;
}

const ModalRegisterForm: React.FC<ModalRegisterFormProps> = ({ open }) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { closeModal, openModal } = useModalStore();

  const { mutate, isPending } = useVerifyCode();

  const form = useForm<ModalRegisterFormType>({
    defaultValues: { code: '' },
    resolver: zodResolver(ModalRegisterSchema),
    mode: 'onBlur',
  });

  const { watch, handleSubmit, control, reset } = form;
  const currentCode = watch('code');

  const { timeLeft, isResendActive, startTimer } = useResendTimer(open, () => {
    setServerError(null);
  });

  React.useEffect(() => {
    if (open) {
      setServerError(null);
    }
  }, [open]);

  const onSubmit = (data: ModalRegisterFormType) => {
    setServerError(null); // сброс перед запросом
    mutate(
      { code: data.code },
      {
        onSuccess: (res) => {
          if (res.status) {
            // успех: показать форму регистрации, закрыть otp
            openModal('register_form');
            closeModal('register_otp');
            reset({ code: '' });
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
    // TODO: вызов resend-кода, когда будет готов эндпоинт
    startTimer();
    setServerError(null);
  };

  const handleClose = () => {
    closeModal('register_otp');
    setServerError(null);
    reset({ code: '' });
  };

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={handleClose}
        headerClassName='text-center'
        className='max-w-md!'
        title='Регистрация'
        footer={
          <div className='flex w-full flex-col gap-2'>
            <ErrorMessage message={serverError ?? ''} />
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
        }
      >
        <div className='flex flex-col items-center'>
          <p className='mb-6 text-base text-gray-700'>Код отправлен на вашу почту</p>
          <p className='mb-6 text-center text-base text-gray-700'>
            Если письма нет 1–2 минуты, проверьте папки «Спам» и «Промоакции».
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
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

export default ModalRegisterForm;
