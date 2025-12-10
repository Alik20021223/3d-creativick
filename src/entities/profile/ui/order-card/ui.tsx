import { cn } from '@shared/lib/utils';
import { Button } from '@shared/shadcn/button';
import * as React from 'react';
import { OrderCardItem } from '@entities/profile/types';
import BadgeInfo from '@feature/badge-info';
import { statusConfig } from '@entities/profile/mock';
import { splitDateTime } from '@utils/constant';

export type OrderCardProps = {
  data: OrderCardItem;
  className?: string;
};

const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

const OrderCard: React.FC<OrderCardProps> = ({ data, className }) => {
  const {
    orderNumber,
    status,
    createdAt,
    paidAt,
    price,
    currency = '₽',
    facts = [],
    onOpenModal,
    onReorder,
    onPay,
  } = data;

  console.log(status);
  const cfg = statusConfig[status];

  const ctaHandler =
    cfg.ctaHandlerKey === 'onOpenModal' && onOpenModal
      ? () => onOpenModal(orderNumber)
      : cfg.ctaHandlerKey === 'onReorder' && onReorder
        ? () => onReorder(orderNumber)
        : cfg.ctaHandlerKey === 'onPay' && onPay
          ? () => onPay(orderNumber)
          : undefined;

  return (
    <section
      className={cn(
        'h-[261px] max-md:h-fit rounded-3xl bg-[#EFF4F8] px-3 py-5 md:h-45 md:px-10 md:py-8',
        'flex flex-col justify-center space-y-6',
        className,
      )}
    >
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Левый блок: название + даты */}
        <div className='flex min-w-0 flex-1 gap-6 max-md:justify-between md:items-center'>
          <div className='flex flex-col gap-2.5 max-md:flex-col-reverse md:items-center'>
            <h3 className='text-2xl font-bold text-slate-900'>Заказ #{orderNumber}</h3>

            <span
              className={cn(
                'inline-flex h-6.5 w-40 items-center justify-center gap-2 rounded-full text-sm font-medium md:h-9',
                cfg.leftPillClass,
              )}
            >
              <cfg.LeftIcon className='h-4 w-4' />
              {cfg.label}
            </span>
          </div>

          <div className='text-secondary-gray hidden max-w-xl gap-6 text-sm md:flex'>
            <div>
              <div className='mb-2.5 font-semibold'>Дата создания</div>
              {createdAt ? (
                <div>
                  <div>{splitDateTime(createdAt).date}</div>
                </div>
              ) : (
                <div className='opacity-60'>—</div>
              )}
            </div>

            <div>
              <div className='mb-2.5 font-semibold'>
                {status === 'canceled'
                  ? 'Дата отмены'
                  : status === 'refund'
                    ? 'Дата возврата'
                    : 'Дата оплаты'}
              </div>
              {paidAt ? (
                <div>
                  <div>{splitDateTime(paidAt).date}</div>
                </div>
              ) : (
                <div className='opacity-60'>—</div>
              )}
            </div>
          </div>

          <div className='text-3xl font-extrabold whitespace-nowrap text-[#0B4CA1] md:hidden md:text-4xl'>
            {formatPrice(price)}{' '}
            <span className='align-bottom text-sm font-normal'>{currency}</span>
          </div>
        </div>

        {/* Центр: сумма + CTA */}
        <div className='flex items-center gap-6 max-md:flex-col md:gap-10'>
          <div className='text-3xl font-extrabold whitespace-nowrap text-[#0B4CA1] max-md:hidden md:text-4xl'>
            {formatPrice(price)}{' '}
            <span className='align-bottom text-sm font-normal'>{currency}</span>
          </div>

          <div className='text-secondary-gray hidden w-full gap-6 text-sm max-md:flex md:max-w-xl'>
            <div className='max-md:w-1/2'>
              <div className='mb-2.5 font-semibold'>Дата создания</div>
              {createdAt ? (
                <div>
                  <div>{splitDateTime(createdAt).date}</div>
                </div>
              ) : (
                <div className='opacity-60'>—</div>
              )}
            </div>

            <div className='max-md:w-1/2'>
              <div className='mb-2.5 font-semibold'>Дата оплаты</div>
              {paidAt ? (
                <div>
                  <div>{splitDateTime(paidAt).date}</div>
                </div>
              ) : (
                <div className='opacity-60'>—</div>
              )}
            </div>
          </div>

          <Button
            disabled={!ctaHandler}
            onClick={ctaHandler}
            className={cn(
              'h-11.5 w-full rounded-full text-base font-normal shadow-sm md:w-50',
              'text-white',
            )}
          >
            {cfg.ctaText}
            {cfg.CtaIcon && <cfg.CtaIcon className='mr-2 h-5 w-5' />}
          </Button>

          {status === 'progress' && (
            <Button
              variant="link"
              onClick={() => data.onCancel?.(orderNumber)}
              className={cn(
                'h-11.5 w-full rounded-full text-base font-normal shadow-sm md:w-50',
                'bg-red-500 text-white! hover:bg-red-600',
              )}
            >
              Отменить заказ
            </Button>
          )}
        </div>

        <div className='hidden w-full md:block md:w-auto md:shrink-0 md:basis-[280px]'>
          <ul
            className={cn(
              'flex flex-col gap-2 transition-opacity',
              facts.length ? 'opacity-100' : 'pointer-events-none opacity-0 select-none',
            )}
          >
            {facts.map((f, i) => (
              <BadgeInfo data={f} key={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrderCard;
