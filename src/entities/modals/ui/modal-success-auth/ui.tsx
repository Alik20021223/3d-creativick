import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../store';

interface ModalSuccessAuthProps {
  open: boolean;
  title?: string;
}

const ModalSuccessAuth: React.FC<ModalSuccessAuthProps> = ({
  open,
  title = 'Авторизация выполнена',
}) => {
  const navigate = useNavigate();

  const { closeModal, closeAll } = useModalStore();

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('success_auth_otp')}
        headerClassName='text-left'
        title={title}
        footer={
          <div className='flex w-full gap-3'>
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
