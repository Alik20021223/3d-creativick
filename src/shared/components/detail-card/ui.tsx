import { Button } from '@shadcn/button';
import React from 'react';
import ProductCarouselImage from '@shared/components/product-card/product-carousel';
import { ChevronRight } from 'lucide-react';
import {
  // DetailCardType,
  ProductModelType,
} from '@shared/types';
import { useNavigate, useParams } from 'react-router-dom';

interface DetailCardProps {
  data: ProductModelType;
}

const DetailCard: React.FC<DetailCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const { titleId } = useParams<{ titleId: string }>();

  // Формируем путь для навигации: /product/:titleId/:detailId
  const detailPath = titleId ? `/product/${titleId}/${data.id}` : `/product/${data.id}`;

  const handleCardClick = () => {
    navigate(detailPath);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем срабатывание клика на карточке
    navigate(detailPath);
  };

  return (
    <>
      <div
        role='button'
        onClick={handleCardClick}
        className='button-shadow-blue bg-secondary-white relative flex h-full max-h-[520px] cursor-pointer flex-col overflow-hidden rounded-[60px] shadow-lg min-w-[355px] max-md:max-w-[355px] md:min-w-[436px] md:max-h-[618px]'
      >
        {/* Верх: картинка и теги - блокируем всплытие событий */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <ProductCarouselImage images={data.galleries} />
        </div>

        {/* Контент */}
        <div className='mt-auto p-5.5 pt-0'>
          <h2 className='text-2xl font-bold'>{data.translation.title ?? 'Принтер голубой'}</h2>

          {data.translation.description && (
            <div className='mt-3'>
              <p className='description-text'>{data.translation.description}</p>
            </div>
          )}

          {/* Кнопки */}
          <div className='mt-5 flex h-[46px] items-center md:h-[56px]'>
            <Button
              onClick={handleButtonClick}
              className='h-full flex-1 rounded-full py-3! text-lg font-semibold text-white'
            >
              Подробнее <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
