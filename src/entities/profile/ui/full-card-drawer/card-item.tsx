'use client';
import React, { useMemo } from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '@utils/constant';
import { CartDetail } from '../../types/cart';
import { getDetailPathByVariant } from '@utils/product-variants';

export type CardItemProps = {
  item: CartDetail;
  currency?: string; // default: ₽
  onRemove?: (id: number) => void;
};

const CardItem: React.FC<CardItemProps> = ({ item, currency = '₽', onRemove }) => {
  const { id, stock } = item;

  const detailPath = getDetailPathByVariant(stock.product.uuid, stock.color, stock.size);

  // бейдж вариации без "default" и пустых значений
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
    <li className='relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3'>
      {/* thumb */}
      <a
        href={detailPath}
        className='flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white'
        aria-label={stock.product.translation?.title}
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

        {/* бейдж вариации (покажется только если есть что показать) */}
        {variantLabel && (
          <div className='mt-0.5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] text-slate-600'>
            {stock.color && stock.color.trim().toLowerCase() !== 'default' && (
              <span
                className='inline-block h-2.5 w-2.5 rounded-full border border-black/10'
                style={{ backgroundColor: stock.color }}
                aria-hidden
              />
            )}
            <span className='truncate'>{variantLabel}</span>
          </div>
        )}

        <a
          href={detailPath}
          className='text-dark-blue block text-[13px] underline-offset-4 hover:underline'
        >
          Подробнее
        </a>
      </div>

      {/* prices + remove */}
      <div className='text-right'>
        <div className='text-dark-blue text-[18px] font-semibold'>
          {formatPrice((item.price ?? 0) - (item.discount ?? 0))} {currency}
        </div>
        {typeof item.discount === 'number' && item.discount > 0 ? (
          <div className='text-secondary-gray text-[12px] line-through'>
            {formatPrice(item.price)} {currency}
          </div>
        ) : (
          <div className='h-[18px]' />
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(id)}
            aria-label='Удалить'
            className='text-secondary-gray hover:border-primary hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent'
          >
            <Trash2 className='h-4 w-4' />
          </button>
        )}
      </div>
    </li>
  );
};

export default CardItem;
