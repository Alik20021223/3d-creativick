import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';

interface ModalConfirmDeleteAllItemProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onConfirm: () => void;
}

const ModalConfirmDeleteAllItem: React.FC<ModalConfirmDeleteAllItemProps> = ({
  open,
  setOpen,
  onConfirm,
}) => {
  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Очистить корзину?'
        footer={
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
              Отмена
            </Button>
            <Button onClick={onConfirm} variant='outline' className='h-full flex-1'>
              Да, очистить
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>
          Все товары из корзины будут удалены, продолжить?
        </p>
      </ModalLayout>
    </>
  );
};

export default ModalConfirmDeleteAllItem;
