// entities/profile/mappers/mapOrderToCardItem.tsx
import { Badge } from '@/shared/types';
import type { Order } from '@entities/profile/types/order';
import { splitDateTime } from '@utils/constant';
import { Truck, CalendarDays, CreditCard } from 'lucide-react';
import { OrderCardItem, OrderStatus } from '../../types';

const toBadgeArray = (parts: Array<Badge | false | null | undefined>): Badge[] =>
  parts.filter((p): p is Badge => Boolean(p));

export const mapOrderToCardItem = (o: Order): OrderCardItem => {
  // Приоритет: сначала проверяем статус заказа, потом статус транзакции
  // Если заказ отменен (status === 'canceled'), используем его
  // Иначе используем статус транзакции
  const orderStatus = o.status === 'canceled' ? 'canceled' : o?.transaction?.status;
  const paidTrx = orderStatus || 'canceled';

  const currencySymbol = o.currency?.symbol ?? '₽';

  const deliveryBadge: Badge | false = o.delivery_type
    ? {
        icon: <Truck className='h-4 w-4' />,
        text: o.delivery_type === 'delivery' ? 'Доставка' : 'Самовывоз',
      }
    : false;

  const etaBadge: Badge | false = o.delivery_date_time
    ? {
        icon: <CalendarDays className='h-4 w-4' />,
        text: `${splitDateTime(o.delivery_date_time).date} в ${splitDateTime(o.delivery_date_time).time}`,
      }
    : false;

  const feeBadge: Badge | false =
    typeof o.delivery_fee === 'number'
      ? {
          icon: <CreditCard className='h-4 w-4' />,
          text: `Доставка: ${o.delivery_fee} ${currencySymbol}`,
        }
      : false;

  const facts: Badge[] = toBadgeArray([deliveryBadge, etaBadge, feeBadge]);

  return {
    orderNumber: String(o.id),
    status: paidTrx as OrderStatus,
    createdAt: o.created_at ?? undefined,
    paidAt: o.transaction?.perform_time ?? undefined,
    price: o.total_price ?? 0,
    currency: currencySymbol,
    facts,
  };
};
