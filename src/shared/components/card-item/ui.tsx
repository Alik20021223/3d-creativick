import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@shadcn/button';
import { ProductCardType } from '@shared/types';
import { getProductDetailPath } from '@utils/product-variants';

type Props = {
  product: ProductCardType;
  className?: string;
};

const CardItem: React.FC<Props> = ({ product, className = '' }) => {
  const navigate = useNavigate();

  const title = product.translation?.title ?? '';

  // detail url
  const detailPath = useMemo(() => getProductDetailPath(product), [product]);

  return (
    <article
      className={[
        'group bg-secondary-active relative h-[543px] space-y-10 rounded-[60px] max-md:h-[532px]',
        'button-shadow-blue',
        className,
      ].join(' ')}
      onClick={() => navigate(detailPath)}
    >
      {/* Топ: картинка с большим скруглением */}
      <div
        className='px-2.5 pt-2.5'
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className='relative flex h-[310px] w-full items-center justify-center overflow-hidden rounded-[60px]'>
          <img
            src={product.img}
            alt={title}
            className='absolute inset-x-0 h-full w-full object-contain object-center max-md:scale-[1] md:inset-0'
            draggable={false}
          />

          {/* <div className='description-text absolute top-8 right-8 rounded-full bg-white px-5.5 py-1'>
            Хит продаж 🔥
          </div> */}
        </div>
      </div>

      {/* Контент */}
      <div className='px-5.5'>
        <h3 className='m-0 h-[22px] text-[32px] leading-[110%] font-bold tracking-[0px] text-gray-900'>
          {title}
        </h3>

        {/* Рейтинг: если нет в типе — рисуем 5.0 (или можно скрыть блок) */}
        <div className='mt-4 flex items-center gap-2 text-gray-500'>
          <Star className='h-[35px] w-[35px] fill-[#FFD300] text-[#FFD300]' />
          <span className='description-text'>{(5.0).toFixed(1)}</span>
        </div>

        {/* Кнопки */}
        <div className='mt-8 flex w-full gap-4'>
          <Button
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              navigate(detailPath);
            }}
            className='h-[56px] flex-1 py-3 text-[22px]'
          >
            Подробнее
            <span className='text-2xl leading-none'>›</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CardItem;
