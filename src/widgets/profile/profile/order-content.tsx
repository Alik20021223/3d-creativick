import OrderCard from '@entities/profile/ui/order-card';
import { Button } from '@shared/shadcn/button';
import { ArrowDown } from 'lucide-react';
import { useGetAllOrders } from '@entities/profile/hooks/getAllOrders';
import { useMemo, useState } from 'react';
import type { OrderCardItem, OrderStatus } from '@entities/profile/types';
import { ApiOrderStatus, Order } from '@entities/profile/types/order';
import { mapOrderToCardItem } from '@entities/profile/mappers/mapOrderToCardItem';
import EmptyOrderContent from './empty-order-content';

const PAGE = 5;

export const mapStatus = (apiStatus: ApiOrderStatus | string, hasPaidTrx: boolean): OrderStatus => {
  if (apiStatus === 'canceled') return 'canceled';
  if (hasPaidTrx || apiStatus === 'delivered') return 'paid';
  return 'pending';
};

const OrderContent = () => {
  const [params, setParams] = useState({ page: PAGE, perPage: 5 });

  const { data, isLoading } = useGetAllOrders(params);

  const items: OrderCardItem[] = useMemo(() => {
    const list = (data?.data ?? []) as Order[];
    return list.map(mapOrderToCardItem);
  }, [data]);

  const canLoadMore = params.page < items.length;

  const handleLoadMore = () => {
    setParams((prev) => ({ ...prev, perPage: prev.perPage + 5 }));
  };

  return (
    <section className='space-y-10'>
      <div className='space-y-5'>
        {items.map((order) => (
          <OrderCard key={order.orderNumber} data={order} />
        ))}

        {!items.length && !isLoading && <EmptyOrderContent />}
      </div>

      {canLoadMore && (
        <div className='flex w-full justify-center'>
          <Button
            onClick={handleLoadMore}
            variant='link'
            className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 border bg-white text-[22px] leading-[130%] max-md:w-fit'
          >
            Показать ещё
            <ArrowDown />
          </Button>
        </div>
      )}
    </section>
  );
};

export default OrderContent;
