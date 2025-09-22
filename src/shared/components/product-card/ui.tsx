// ProductCard.tsx
import { JSX, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ColorButton from '@shared/components/color-button';
import { Link, useNavigate } from 'react-router-dom';
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
    () =>
      availableValues.map((v) => ({ value: v, class: COLOR_PALETTE[v] })).filter((c) => !!c.class),
    [availableValues],
  );

  // 3) стартовый цвет
  const initialColor =
    data.activeColor && availableValues.includes(data.activeColor)
      ? data.activeColor
      : uiColors[0]?.value;

  const [color, setColor] = useState<string>(initialColor);
  const [isSave, setSave] = useState<boolean>(false);

  const navigate = useNavigate();

  const { price } = data;

  return (
    <div
      onClick={() => navigate(data.href)}
      className='bg-secondary-white relative flex h-full max-h-[520px] flex-col overflow-hidden rounded-[60px] shadow-lg max-md:max-w-[355px] md:max-h-[618px]'
    >
      {/* Верх: картинка и теги */}
      <ProductCarouselImage images={data.image} category={data.badges} />

      {/* Контент */}
      <div className='mt-auto p-5.5 pt-0'>
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

        {data.description && !data.activeColor && (
          <div className='mt-3'>
            <p className='description-text'>{data.description}</p>
          </div>
        )}
        {/* Цена */}
        <div className='mt-5 flex items-start justify-between max-md:flex-col max-md:space-y-2 md:items-center'>
          <Link
            to={data.href}
            className='text-secondary-text flex h-4 items-center text-sm hover:underline'
          >
            {data.colorSet === 'printer' || data.colorSet === 'spool'
              ? 'Подробнее'
              : 'Посмотреть детали серии'}
            <ChevronRight className='h-4 w-4' />
          </Link>

          <div className='flex items-end space-x-2.5 text-right'>
            {price.last_price && (
              <p className='text-base text-sm text-secondary-gray italic line-through'>
                {price.last_price} ₽
              </p>
            )}
            <p className='text-dark-blue text-2xl leading-[110%] font-bold md:text-[32px]'>
              {price.new_price} ₽
            </p>
          </div>
        </div>

        {/* Кнопки */}
        <div className='mt-5 flex h-[46px] items-center justify-between md:h-[56px]'>
          <Button
            className='h-full flex-1 rounded-full py-3! text-lg font-semibold text-white'
            onClick={(e) => {
              e.stopPropagation(); // <-- предотвращаем переход по карточке
              console.log('Добавить в корзину', data.id);
            }}
          >
            В корзину
          </Button>

          <ButtonSave
            onSave={(e) => {
              e.stopPropagation(); // <-- предотвращаем navigate
              setSave(!isSave);
            }}
            status={isSave}
          />
        </div>
      </div>
    </div>
  );
}
