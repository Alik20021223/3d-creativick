import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { useCancelOrder } from '@entities/profile/hooks/useCancelOrder';

interface ModalCancelOrderProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  orderId?: string;
  code?: string;
}

const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({
  open,
  setOpen,
  orderId,
  code,
}) => {
  const { mutateAsync: cancelOrder, isPending } = useCancelOrder(
    () => {
      setOpen(false);
    },
    (error) => {
      console.error('Failed to cancel order:', error);
    },
  );

  const handleConfirm = async () => {
    if (!orderId) {
      console.warn('Order ID is missing');
      return;
    }

    try {
      await cancelOrder(orderId);
    } catch (error) {
      // Ошибка уже обработана в onError колбэке
    }
  };

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Отменить заказ?'
        footer={
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <Button
              onClick={() => setOpen(false)}
              className='h-full flex-1 text-white'
              disabled={isPending}
            >
              Отмена
            </Button>
            <Button
              onClick={handleConfirm}
              variant='outline'
              className='h-full flex-1'
              disabled={isPending}
            >
              {isPending ? 'Отмена...' : 'Отменить заказ'}
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>
          Заказ №{code || orderId} будет отменен, продолжить?
        </p>
      </ModalLayout>
    </>
  );
};

export default ModalCancelOrder;
