// entities/profile/mappers/mapOrderToCardItem.tsx
import { Badge } from '@/shared/types';
import type { Order } from '@entities/profile/types/order';
import { splitDateTime } from '@utils/constant';
import { Truck, CalendarDays, CreditCard } from 'lucide-react';
import { OrderCardItem } from '../types';
import { mapStatus } from '@widgets/profile/profile/order-content';

const toBadgeArray = (parts: Array<Badge | false | null | undefined>): Badge[] =>
  parts.filter((p): p is Badge => Boolean(p));

export const mapOrderToCardItem = (o: Order): OrderCardItem => {
  const paidTrx =
    o.transactions?.find((t) => t.status === 'paid') ??
    o.transactions?.find((t) => t.status === 'processing');

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
    status: mapStatus(o.status, Boolean(paidTrx)),
    createdAt: o.created_at ?? undefined,
    paidAt: paidTrx?.perform_time ?? undefined,
    price: o.total_price ?? 0,
    currency: currencySymbol,
    facts,
    onDownload: undefined,
    onReorder: undefined,
    onPay: undefined,
  };
};
