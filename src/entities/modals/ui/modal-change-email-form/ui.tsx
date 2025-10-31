// --- CORE REACT & HOOKS ---
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import CustomInput from '@feature/custom-input';
import { ModalChangeEmailFormType, ModalChangeEmailSchema } from './validation';
import { useModalStore } from '../../store';

interface ModalChangeEmailProps {
  open: boolean;
}

// --- MAIN COMPONENT ---

const ModalChangeEmailForm: React.FC<ModalChangeEmailProps> = ({ open }) => {
  const { closeModal, openModal } = useModalStore();

  const form = useForm<ModalChangeEmailFormType>({
    defaultValues: {
      newEmail: '', // Начальное значение с маской
    },
    resolver: zodResolver(ModalChangeEmailSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: ModalChangeEmailFormType) => {
    console.log('New Email:', data.newEmail);
    alert(`Отправка кода на email: ${data.newEmail}`); // Используем alert только для примера
    closeModal('change_email_form');
    openModal('email_otp');
  };

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('change_email_form')}
        headerClassName='text-center text-[24px]'
        className='max-w-md!'
        title='Сменить номер телефона'
        footer={
          <div className='flex w-full gap-3'>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className='h-12 w-full text-lg text-white shadow-xl'
            >
              Отправить код
            </Button>
          </div>
        }
      >
        <div className='flex flex-col pt-0'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <CustomInput<ModalChangeEmailFormType>
              name='newEmail'
              label='Введите новый email'
              placeholder='example@mail.com'
              className='mt-2 h-14 rounded-[40px] text-xl'
              type='email'
            />
          </form>
        </div>
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalChangeEmailForm;
