// ProductCard.tsx
import { JSX, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ColorButton from '@shared/components/color-button';
import { Link } from 'react-router-dom';
import { COLOR_PALETTE, COLORS_BY_SET } from '@utils/mock';
import { ProductCardType } from '@shared/types';
import ProductCarouselImage from './product-carousel';
import { Button } from '@shadcn/button';
import ButtonSave from '@feature/button-save';

interface ProductCardProps {
  data: ProductCardType;
}

export default function ProductCard({ data }: ProductCardProps): JSX.Element {
  const availableValues = useMemo(() => {
    if (data.colorSet) return COLORS_BY_SET[data.colorSet] ?? [];
    return [];
  }, [data.colorSet]);

  // 2) подготовка для кнопок
  const uiColors = useMemo(
    () => availableValues
      .map(v => ({ value: v, class: COLOR_PALETTE[v] }))
      .filter(c => !!c.class),
    [availableValues]
  );

  // 3) стартовый цвет
  const initialColor =
    data.activeColor && availableValues.includes(data.activeColor)
      ? data.activeColor
      : uiColors[0]?.value;

  const [color, setColor] = useState<string>(initialColor);
  const [isSave, setSave] = useState<boolean>(false);



  const { price } = data;

  return (
    <div className='bg-secondary-white relative overflow-hidden rounded-[60px] shadow-lg flex flex-col md:max-h-[618px] max-h-[520px] max-md:max-w-[355px] h-full'>
      {/* Верх: картинка и теги */}
      <ProductCarouselImage images={data.image} category={data.badges} />

      {/* Контент */}
      <div className="p-5.5 pt-0 mt-auto">
        <h2 className='text-2xl font-bold'>{data.title ?? 'Принтер голубой'}</h2>

        {/* Цвета */}
        {data.activeColor && (
          <div className='mt-3'>
            <p className='text-sm text-gray-500'>Выберите цвет:</p>
            <div className='mt-2 flex gap-2'>
              {uiColors.map((c) => (
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
        <div className='mt-5 flex max-md:flex-col md:items-center items-start justify-between max-md:space-y-2'>
          <Link
            to='#'
            className='text-secondary-text flex h-4 items-center text-sm hover:underline'
          >
            Подробнее <ChevronRight className='h-4 w-4' />
          </Link>
          <div className='text-right flex items-end space-x-2.5'>
            {price.last_price && <p className='text-[#B4B7C2] line-through text-base text-sm italic'>{price.last_price} ₽</p>}
            <p className='md:text-[32px] text-2xl font-bold text-dark-blue leading-[110%]'>{price.new_price} ₽</p>
          </div>
        </div>

        {/* Кнопки */}
        <div className='mt-5 flex items-center justify-between md:h-[56px] h-[46px]'>
          <Button className='flex-1 rounded-full py-3! h-full text-lg font-semibold text-white'>
            В корзину
          </Button>
          <ButtonSave onSave={() => setSave(!isSave)} status={isSave} />
        </div>
      </div>
    </div>
  );
}
