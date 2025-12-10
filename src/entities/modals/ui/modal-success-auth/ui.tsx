import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../store';

interface ModalSuccessAuthProps {
  open: boolean;
  title?: string;
  modalKey?: 'register_success' | 'success_auth_otp';
}

const ModalSuccessAuth: React.FC<ModalSuccessAuthProps> = ({
  open,
  title = 'Авторизация выполнена',
  modalKey,
}) => {
  const navigate = useNavigate();

  const { closeModal, closeAll, register_success } = useModalStore();

  // Определяем, какую модалку закрывать, если modalKey не передан
  const currentModalKey: 'register_success' | 'success_auth_otp' =
    modalKey || (register_success ? 'register_success' : 'success_auth_otp');

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal(currentModalKey)}
        headerClassName='text-left'
        title={title}
        footer={
          <div className='flex w-full gap-3 max-md:flex-col'>
            <Button
              onClick={() => {
                closeAll();
                navigate('/profile');
              }}
              variant='outline'
              className='h-full flex-1'
            >
              В личный кабинет
            </Button>
            <Button onClick={() => closeAll()} className='h-full flex-1 text-white'>
              Продолжить
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>Вы авторизованы и можете продолжить работу.</p>
      </ModalLayout>
    </>
  );
};

export default ModalSuccessAuth;
