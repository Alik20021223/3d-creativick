import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ModalRegisterFormType, ModalRegisterSchema } from './validation';
import CodeVerificationStep from '../modal-code-form';
import { useModalStore } from '../../store';

interface ModalChangeNumberEmailCodeProps {
  open: boolean;
  code?: string;
}

const ModalChangeNumberEmailCode: React.FC<ModalChangeNumberEmailCodeProps> = ({
  open,
  code = '',
}) => {
  const { closeModal, openModal } = useModalStore();

  // 2. Инициализация формы
  const form = useForm<ModalRegisterFormType>({
    // Убедитесь, что 'code' есть в ModalRegisterFormType
    defaultValues: { code: '' },
    resolver: zodResolver(ModalRegisterSchema),
    mode: 'onBlur',
  });

  console.log(code);

  const { watch, handleSubmit } = form;
  const currentCode = watch('code');

  const onSubmit = (data: ModalRegisterFormType) => {
    console.log('Submitted code:', data.code);
    // Здесь логика проверки кода
    if (data.code && data.code.length === 4) {
      closeModal('email_otp');
      openModal('change_email_success');
    }
  };

  const handleResend = () => {
    // Логика повторной отправки кода на сервер
    console.log('Код отправлен повторно. Запуск таймера.');
  };

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('email_otp')}
        headerClassName='text-center'
        className='max-w-md!'
        title='Сменить номер телефона'
        footer={
          <div className='flex w-full gap-3'>
            <Button
              onClick={handleSubmit(onSubmit)}
              className='h-full flex-1 text-white'
              // Отключаем кнопку, пока не введены все 4 цифры
              disabled={currentCode.length !== 4}
            >
              Отправить
            </Button>
          </div>
        }
      >
        <CodeVerificationStep
          open={open}
          description='Введите код из отправленного на почту'
          onVerify={(code) => onSubmit({ code: code.code })}
          onResend={handleResend}
          form={form}
        />
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalChangeNumberEmailCode;
