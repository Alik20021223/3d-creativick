import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { useGetOrderById } from '@entities/profile/hooks/getOrderById';
import OrderDetailItem from './order-detail-item';
import { OrderDetail } from '@/entities/profile/types/order';

interface ModalSeeOrderProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  order_id: string;
}

const ModalSeeOrder: React.FC<ModalSeeOrderProps> = ({ open, setOpen, order_id }) => {
  const { data: orderData, isLoading } = useGetOrderById(order_id);

  const details = orderData?.details ?? [];

  return (
    <ModalLayout
      open={open}
      onOpenChange={setOpen}
      headerClassName='text-left'
      title='Детали заказа'
      footer={
        <div className='flex w-full gap-3'>
          <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
            Вернуться к заказам
          </Button>
        </div>
      }
    >
      {isLoading && <div className='py-6 text-sm text-slate-500'>Загружаем детали заказа…</div>}

      {!isLoading && !details.length && (
        <div className='py-6 text-sm text-slate-500'>В заказе нет позиций.</div>
      )}

      {!isLoading && details.length > 0 && (
        <div className='max-h-[calc(100vh-400px)] space-y-4 overflow-y-auto py-2 pr-2 md:pr-4'>
          {details.map((detail: OrderDetail) => (
            <OrderDetailItem key={detail.id} detail={detail} />
          ))}
        </div>
      )}
    </ModalLayout>
  );
};

export default ModalSeeOrder;
