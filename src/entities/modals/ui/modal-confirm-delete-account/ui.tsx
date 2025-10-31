import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';

interface ModalConfirmDeleteAccountProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalConfirmDeleteAccount: React.FC<ModalConfirmDeleteAccountProps> = ({ open, setOpen }) => {
  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Удалить аккаунт?'
        footer={
          <div className='flex w-full gap-3'>
            <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
              Отмена
            </Button>
            <Button onClick={handleClick} variant='outline' className='h-full flex-1'>
              Да, удалить
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>
          Ваш аккаунт будет удален, <b>все связанные с ним покупки пропадут</b>, продолжить?{' '}
        </p>
      </ModalLayout>
    </>
  );
};

export default ModalConfirmDeleteAccount;
