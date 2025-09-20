import { Button } from '@shadcn/button';
import React from 'react';
import ProductCarouselImage from '@shared/components/product-card/product-carousel';
import { ChevronRight } from 'lucide-react';
import { DetailCardType, ProductCardType } from '@shared/types';
import { useNavigate } from 'react-router-dom';

interface DetailCardProps {
  data: DetailCardType | ProductCardType;
}

const DetailCard: React.FC<DetailCardProps> = ({ data }) => {

  const navigate = useNavigate()

  return (
    <>
      <div className='bg-secondary-white relative flex h-full max-h-[520px] flex-col overflow-hidden rounded-[60px] shadow-lg max-md:max-w-full md:max-h-[618px]'>
        {/* Верх: картинка и теги */}
        <ProductCarouselImage images={data.image} category={data.badges} />

        {/* Контент */}
        <div className='mt-auto p-5.5 pt-0'>
          <h2 className='text-2xl font-bold'>{data.title ?? 'Принтер голубой'}</h2>

          {data.description && (
            <div className='mt-3'>
              <p className='description-text'>{data.description}</p>
            </div>
          )}

          {/* Кнопки */}
          <div className='mt-5 flex h-[46px] items-center md:h-[56px]'>
            <Button onClick={() => navigate(data.href)} className='h-full flex-1 rounded-full py-3! text-lg font-semibold text-white'>
              Подробнее <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
