'use client';
import React, { useMemo } from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '@utils/constant';
import { CartDetail } from '../../types/cart';
import { getDetailPathByVariant } from '@utils/product-variants';
import { calcOldPrice, calcPrice } from '@/utils/product-pricing';
import { useAppStore } from '@/app/store';

export type CardItemProps = {
  item: CartDetail;
  currency?: string; // default: ₽
  onRemove?: (id: number) => void;
};

const CardItem: React.FC<CardItemProps> = ({ item, currency = '₽', onRemove }) => {
  const { id, stock } = item;
  const { isAuth } = useAppStore();

  if (!stock || !stock.product) {
    return null;
  }

  console.log(item);

  /** =============================
   *      PRICE LOGIC
   * ============================== */

  const price = useMemo(() => {
    // НЕ АВТОРИЗОВАН
    if (!isAuth) {
      const basePrice = item.price;
      const discount = item.discount;

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
  }, [isAuth, item.price, item.discount, stock?.product]);

  const oldPrice = useMemo(() => {
    // НЕ АВТОРИЗОВАН
    if (!isAuth) {
      if (!item.discount) return undefined;
      return item.price; // до скидки
    }

    // АВТОРИЗОВАН
    return calcOldPrice(stock.product, price);
  }, [isAuth, item.discount, item.price, stock?.product, price]);

  /** =============================
   *      OTHER UI LOGIC
   * ============================== */

  const detailPath = getDetailPathByVariant(stock.product?.uuid, stock.color, stock.size);

  const isHexColor =
    typeof stock.color === 'string' &&
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(stock.color);

  const isNumericSize = !!stock.size && !isNaN(Number(stock.size));
  const showVariantBadge = isHexColor || isNumericSize;

  return (
    <li className='relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3'>
      {/* thumb */}
      <a
        href={detailPath}
        className='flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white'
      >
        {stock.product.img ? (
          <img
            src={stock.product.img}
            alt={stock.product.translation?.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <ImageIcon className='h-5 w-5 opacity-60' />
        )}
      </a>

      {/* title / links */}
      <div className='min-w-0 flex-1'>
        <a
          href={detailPath}
          className='text-secondary-text block truncate text-[15px] font-medium'
          title={stock.product.translation?.title}
        >
          {stock.product.translation?.title}
        </a>

        {/* бейджи вариаций */}
        {showVariantBadge && (
          <div className='mt-0.5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600'>
            {isNumericSize && (
              <span className='rounded-full bg-white px-2 py-0.5'>{stock.size} гр</span>
            )}

            {isHexColor && (
              <span className='inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5'>
                <span
                  className='inline-block h-2.5 w-2.5 rounded-full border border-black/10'
                  style={{ backgroundColor: stock.color }}
                />
                Цвет
              </span>
            )}
          </div>
        )}

        <a
          href={detailPath}
          className='text-dark-blue block text-[13px] hover:underline underline-offset-4'
        >
          Подробнее
        </a>
      </div>

      {/* prices + remove */}
      <div className='text-right'>
        <div className='text-dark-blue text-[18px] font-semibold'>
          {formatPrice(price)} {currency}
        </div>

        {oldPrice && (
          <div className='text-secondary-gray text-[12px] line-through'>
            {formatPrice(oldPrice)} {currency}
          </div>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(id)}
            aria-label='Удалить'
            className='text-secondary-gray hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors'
          >
            <Trash2 className='h-4 w-4' />
          </button>
        )}
      </div>
    </li>
  );
};

export default CardItem;