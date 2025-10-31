import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';

interface ModalCancelOrderProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  code?: string;
}

const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({
  open,
  setOpen,
  code = '22236725',
}) => {
  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Отменить заказ?'
        footer={
          <div className='flex w-full gap-3'>
            <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
              Отмена
            </Button>
            <Button onClick={handleClick} variant='outline' className='h-full flex-1'>
              В личный кабинет
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>Заказ №{code} будет отменен, продолжить?</p>
      </ModalLayout>
    </>
  );
};

export default ModalCancelOrder;
