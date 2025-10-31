import { Button } from '@shadcn/button';
import { formatPrice } from '@utils/constant';
import { Image, Trash2 } from 'lucide-react';
import { CartDetail } from '@entities/profile/types/cart';
import { getDetailPathByVariant } from '@utils/product-variants';
import { useMemo } from 'react';
// ▼ добавляем утиль маршрутизации и (опционально) бейдж варианта

type ShopCardProps = {
  data: CartDetail;
  currency?: string; // default: ₽
  onRemove?: () => void;
  className?: string;
};

export default function ShopCard({
  data,
  currency = '₽',
  onRemove,
  className = '',
}: ShopCardProps) {
  const { stock } = data;

  // детальная ссылка по общему правилу (spool/printer/product)
  const detailPath = getDetailPathByVariant(stock.product.uuid, stock.color, stock.size);

  const variantLabel = useMemo(() => {
    const color = stock.color?.trim();
    const size = stock.size?.trim();

    const parts = [
      color && color.toLowerCase() !== 'default' ? color : null,
      size && size.toLowerCase() !== 'default' ? size : null,
    ];

    return parts.filter(Boolean).join(' · ');
  }, [stock.color, stock.size]);

  return (
    <article
      className={
        'group bg-secondary-white relative flex w-full items-stretch gap-6 rounded-3xl p-5 ' +
        className
      }
      role='article'
    >
      {/* Image */}
      <a
        href={detailPath}
        className='relative hidden aspect-[16/10] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white ring-offset-2 transition outline-none group-hover:border-slate-300 focus:ring-2 focus:ring-indigo-500 md:block'
        aria-label={stock.product.translation?.title ?? 'Товар'}
      >
        {stock.product.img ? (
          <img
            src={stock.product.img}
            alt={stock.product.translation?.title ?? 'Товар'}
            className='h-full w-full object-contain'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <Image className='h-5 w-5 opacity-60' />
          </div>
        )}
      </a>

      {/* Text / Prices */}
      <div className='flex flex-1 justify-between gap-6'>
        <div className='flex h-full flex-col space-y-4.5 py-[9.5px] max-md:w-[50%] md:w-[70%] md:py-[14.5px]'>
          <h3 className='text-secondary-text truncate text-[22px] leading-tight font-semibold'>
            {stock.product.translation?.title}
          </h3>

          {/* (опц.) бейдж текущей вариации */}
          {variantLabel && (
            <div className='flex w-fit items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600'>
              {stock.color && stock.color.toLowerCase() !== 'default' && (
                <span
                  className='inline-block h-3 w-3 rounded-full border border-black/10'
                  style={{ backgroundColor: stock.color }}
                />
              )}
              <span className='truncate'>{variantLabel}</span>
            </div>
          )}

          {stock.product.translation?.description ? (
            <p className='line-clamp-2 max-w-prose text-sm leading-relaxed text-slate-600'>
              {stock.product.translation.description}
            </p>
          ) : null}

          <div className='flex flex-grow items-end'>
            <a
              href={detailPath}
              className='text-dark-blue inline-block text-sm font-medium underline-offset-4 hover:underline'
            >
              Подробнее
            </a>
          </div>
        </div>

        {/* Prices */}
        <div className='flex h-full flex-col items-end justify-end'>
          {typeof data.discount === 'number' && data.discount > 0 ? (
            <div className='text-secondary-gray text-[12px] line-through'>
              {formatPrice(data.price)} {currency}
            </div>
          ) : (
            <div className='h-[18px]' />
          )}
          <div className='text-dark-blue text-right text-[32px] leading-[110%] font-bold'>
            {formatPrice((data.price ?? 0) - (data.discount ?? 0))} {currency}
          </div>
        </div>
      </div>

      {/* Remove button */}
      <Button
        variant='outline'
        type='button'
        onClick={onRemove}
        className='border-secondary-gray text-secondary-gray hover:text-primary hover:border-primary shadow-button absolute top-4 right-4 inline-flex h-10 w-10 bg-transparent'
        aria-label='Удалить'
        title='Удалить'
      >
        <Trash2 />
      </Button>
    </article>
  );
}
