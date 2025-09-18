// src/widgets/card-item/CardItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@shadcn/button';

type ExclusiveCardProps = {
  image: string;
  title: string;
  rating: number; // например 4.8
  bought?: number; // например 600
  href: string; // если задано — кнопка будет <Link to={href}>
  className?: string;
};

const ExclusiveCard: React.FC<ExclusiveCardProps> = ({
  image,
  title,
  rating,
  bought,
  href,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <article
      className={[
        'group bg-secondary-active relative h-[543px] space-y-10 rounded-[60px] max-md:h-[532px]',
        'button-shadow-blue',
        className,
      ].join(' ')}
    >
      {/* Топ: картинка с большим скруглением */}
      <div className='px-2.5 pt-2.5'>
        <div className='exclusive-card relative flex h-[310px] w-full items-center justify-center overflow-hidden rounded-[60px]'>
          <img
            src={image}
            alt={title}
            className='absolute inset-x-0 h-full w-full object-cover object-center max-md:scale-[1] md:inset-0'
          />

          <div className='text-secondary-text absolute top-8 right-8 rounded-full bg-white px-5.5 py-1 text-lg font-normal'>
            Хит продаж 🔥
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className='px-5.5'>
        <h3 className='m-0 h-[22px] text-[32px] leading-[110%] font-bold tracking-[0px] text-gray-900'>
          {title}
        </h3>

        <div className='mt-4 flex items-center gap-2 text-gray-500'>
          <Star className='h-[35px] w-[35px] fill-[#FFD300] text-[#FFD300]' />
          <span className='description-text'>{rating.toFixed(1)}</span>
          {typeof bought === 'number' && (
            <span className='text-gray-400'>(купили {bought} чел)</span>
          )}
        </div>

        {/* Кнопка */}
        <div className='mt-8 flex w-full gap-4'>
          <Button
            variant='default'
            onClick={() => {}}
            className='h-[56px] flex-1 py-3 text-[22px] text-white'
          >
            В корзину
          </Button>
          <Button
            variant='outline'
            onClick={() => navigate(href)}
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

export default ExclusiveCard;
