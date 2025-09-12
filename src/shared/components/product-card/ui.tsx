// ProductCard.tsx
import { JSX, useState } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import ColorButton from '@shared/components/color-button';
import { Link } from 'react-router-dom';
import { colors } from '@utils/mock';
import { ProductCardType } from '@shared/types';
import ProductCarouselImage from './product-carousel';

interface ProductCardProps {
  data: ProductCardType;
}

export default function ProductCard({ data }: ProductCardProps): JSX.Element {
  const [color, setColor] = useState<string>(data?.activeColor ?? colors[2].value); // "yellow" по умолчанию
  const [isSave, setSave] = useState<boolean>(false);

  const { price } = data;

  return (
    <div className='bg-secondary-white relative max-w-md overflow-hidden rounded-[60px] shadow-lg'>
      {/* Верх: картинка и теги */}
      <ProductCarouselImage images={data.image} category={data.category} />

      {/* Контент */}
      <div className='p-5.5 pt-0'>
        <h2 className='text-2xl font-bold'>{data.title ?? 'Принтер голубой'}</h2>

        {/* Цвета */}
        {data.activeColor && (
          <div className='mt-3'>
            <p className='text-sm text-gray-500'>Выберите цвет:</p>
            <div className='mt-2 flex gap-2'>
              {colors.map((c) => (
                <ColorButton
                  key={c.value} // <- key здесь
                  data={c}
                  activeColor={color}
                  setNewColor={setColor}
                />
              ))}
            </div>
          </div>
        )}

        {data.description && (
          <div className='mt-3'>
            <p className='description-text'>{data.description}</p>
          </div>
        )}

        {/* Цена */}
        <div className='mt-5 flex items-center justify-between'>
          <Link
            to='#'
            className='text-secondary-text flex h-4 items-center text-sm hover:underline'
          >
            Подробнее <ChevronRight className='h-4 w-4' />
          </Link>
          <div className='text-right'>
            {price.last_price && <p className='text-gray-400 line-through'>{price.last_price} ₽</p>}
            <p className='text-2xl font-bold text-sky-600'>{price.new_price} ₽</p>
          </div>
        </div>

        {/* Кнопки */}
        <div className='mt-5 flex items-center justify-between'>
          <button className='flex-1 rounded-full bg-sky-600 py-3 text-lg font-semibold text-white transition hover:bg-sky-700'>
            В корзину
          </button>
          <button
            onClick={() => setSave(!isSave)}
            className='border-primary text-primary ml-3 rounded-full border p-3 hover:bg-sky-50'
          >
            <Heart className={`h-6 w-6 ${isSave && 'fill-primary'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
