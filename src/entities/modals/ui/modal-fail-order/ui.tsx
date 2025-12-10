import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';

interface ModalCancelOrderProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  code?: string;
  handleRepeatOrder: () => void;
  isLoading: boolean;
}

const ModalFailOrder: React.FC<ModalCancelOrderProps> = ({
  open,
  setOpen,
  handleRepeatOrder,
  isLoading,
}) => {
  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Оплата не удалась'
        footer={
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
              Вернуться к заказам
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleRepeatOrder}
              variant='outline'
              className='h-full flex-1'
            >
              Повторить оплату
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>
          К сожалению, платёж не прошёл. Проверьте данные карты или попробуйте снова через несколько
          минут.
        </p>
      </ModalLayout>
    </>
  );
};

export default ModalFailOrder;
