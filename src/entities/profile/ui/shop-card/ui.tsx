import { Button } from '@shadcn/button';
import { formatPrice } from '@utils/constant';
import { Image, Trash2 } from 'lucide-react';
import { CartDetail } from '@entities/profile/types/cart';
import { getDetailPathByVariant } from '@utils/product-variants';
import { useMemo } from 'react';
import { calcOldPrice, calcPrice } from '@/utils/product-pricing';
import { useAppStore } from '@/app/store';

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

  const { isAuth } = useAppStore();

  // Вычисляем значения до early return, чтобы соблюдать правила хуков

  const price = useMemo(() => {
    // НЕ АВТОРИЗОВАН
    if (!isAuth) {
      const basePrice = data.price;
      const discount = data.discount;

      if (!discount) return basePrice;

      const discountType = discount.type ?? 'fix';
      let discountValue = 0;

      if (discountType === 'fix') {
        discountValue = discount.price;
      } else if (discountType === 'percent') {
        discountValue = (basePrice * discount.price) / 100;
      }

      return Math.max(basePrice - discountValue, 0);
    }

    // АВТОРИЗОВАН
    return calcPrice(stock.product);
  }, [isAuth, data.price, data.discount, stock?.product]);

  const oldPrice = useMemo(() => {
    // НЕ АВТОРИЗОВАН
    if (!isAuth) {
      if (!data.discount) return undefined;
      return data.price; // до скидки
    }

    // АВТОРИЗОВАН
    return calcOldPrice(stock.product, price);
  }, [isAuth, data.discount, data.price, stock?.product, price]);

  if (!stock || !stock.product) {
    return null; // или скелетон / текст "товар недоступен"
  }

  console.log(stock);
  

  const title = stock.product.translation?.title || 'Товар';
  const imgSrc = stock.product.img || '';

  const detailPath = getDetailPathByVariant(stock.product.uuid, stock.color, stock.size);

  const isHexColor =
    typeof stock.color === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(stock.color);

  const isNumericSize = !!stock.size && !isNaN(Number(stock.size));
  const hasSizeLabel = Boolean(isNumericSize);
  const showVariantBadge = isHexColor || hasSizeLabel;

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
        aria-label={title}
      >
        {imgSrc ? (
          <img src={imgSrc} alt={title} className='h-full w-full object-cover' />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <Image className='h-5 w-5 opacity-60' />
          </div>
        )}
      </a>

      {/* Text / Prices */}
      <div className='flex w-full flex-1 justify-between gap-6'>
        <div className='flex h-full flex-col space-y-4.5 py-[9.5px] max-md:w-[60%] md:w-[70%] md:py-[14.5px]'>
          <h3 className='text-secondary-text max-md:line-clamp-3 md:truncate md:text-[22px] text-lg leading-tight font-semibold'>
            {title}
          </h3>

          {showVariantBadge && (
            <div className='mt-0.5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600'>
              {isNumericSize && (
                <span className='rounded-full bg-white px-2 py-0.5'>{stock.size} гр</span>
              )}

              {isHexColor && (
                <span className='inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5'>
                  <span
                    className='inline-block h-2.5 w-2.5 rounded-full border border-black/10'
                    style={{ backgroundColor: stock.color }}
                  />
                  <span className='text-[11px] text-slate-600'>Цвет</span>
                </span>
              )}
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
          {oldPrice ? (
            <div className='text-secondary-gray text-[12px] line-through'>
              {formatPrice(oldPrice)} {currency}
            </div>
          ) : null}
          <div className='text-dark-blue text-right text-[32px] leading-[110%] font-bold'>
            {formatPrice(price)} {currency}
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
