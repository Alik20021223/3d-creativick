// src/widgets/product/InfoBlock.tsx
import React, { useState } from 'react';
import { Button } from '@shadcn/button';
import ButtonSave from '@feature/button-save';
import { useSharedStore } from '@shared/store';
import TextInstructionBlock from './TextInstructionBlock';
import ColorButton from '@shared/components/color-button';
import { InfoBlockData } from '@entities/products/types';

type Props = {
  data: InfoBlockData;
  /** коллбеки (оставляем отдельными) */
  onAdd?: () => void;
  onColorChange?: (value: string) => void;
  onWeightChange?: (value: number) => void;
};

const InfoBlock: React.FC<Props> = ({ data, onAdd, onColorChange, onWeightChange }) => {
  const {
    title = '',
    badges = [],
    description = '',
    price = 1900,
    oldPrice = 3900,

    showColors = false,
    showWeights = false,

    colors,
    initialColor,
    weights = [250, 500, 750],
    initialWeight,
  } = data || {};

  const { isSave, setSave } = useSharedStore();

  // локальные состояния выбора
  const [color, setColor] = useState<string>(initialColor ?? (colors && colors[0]?.value) ?? '');
  const [weight, setWeight] = useState<number>(initialWeight ?? weights[0]);

  const handlePickColor = (v: string) => {
    setColor(v);
    onColorChange?.(v);
  };

  const handlePickWeight = (v: number) => {
    setWeight(v);
    onWeightChange?.(v);
  };

  return (
    <div className='flex w-full flex-col md:w-1/2'>
      <section className='bg-secondary-white shadow-card-info relative rounded-[28px] p-6 md:p-8'>
        {title && (
          <h2 className='text-2xl leading-tight font-semibold text-slate-900 md:text-[28px]'>
            {title}
          </h2>
        )}

        {/* Бейджи */}
        {!!badges?.length && (
          <div className='mt-4 flex flex-wrap gap-3'>
            {badges.map((b, i) => (
              <span
                key={i}
                className='bg-gradient-badge inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-xs text-white max-md:w-full md:text-sm'
              >
                {b.icon}
                <div className='flex-1 text-sm'>{b.text}</div>
              </span>
            ))}
          </div>
        )}

        {/* Описание */}
        {description && (
          <p className='text-secondary-text mt-5 leading-relaxed md:text-lg'>{description}</p>
        )}

        {/* Выбор цвета */}
        {showColors && !!colors?.length && (
          <div className='mt-5'>
            <p className='mb-2 text-sm text-gray-500'>Выберите цвет:</p>
            <div className='flex flex-wrap gap-2'>
              {colors.map((c) => (
                <ColorButton
                  key={c.value}
                  data={c}
                  activeColor={color}
                  setNewColor={handlePickColor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Выбор граммовки */}
        {showWeights && !!weights?.length && (
          <div className='mt-5'>
            <p className='mb-2 text-sm text-gray-500'>Выберите граммовку:</p>
            <div className='flex flex-wrap gap-2'>
              {weights.map((w) => {
                const active = w === weight;
                return (
                  <button
                    key={w}
                    onClick={() => handlePickWeight(w)}
                    className={[
                      'h-8 rounded-[8px] px-3 text-sm transition',
                      active
                        ? 'border-2 border-sky-600 bg-white text-sky-700'
                        : 'border border-slate-300 bg-white/60 text-slate-700 hover:border-slate-400',
                    ].join(' ')}
                    aria-pressed={active}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Цена + кнопки */}
        <div className='mt-5 flex flex-col gap-4 md:justify-between'>
          <div className='flex items-end gap-3'>
            <div className='text-primary-active text-[34px] leading-none font-extrabold md:text-[38px]'>
              {price.toLocaleString('ru-RU')} <span className='text-[22px] font-bold'>₽</span>
            </div>
            <div className='mb-1 text-slate-400 italic line-through'>
              {oldPrice.toLocaleString('ru-RU')}₽
            </div>
          </div>

          <div className='flex h-[56px] w-full items-center gap-3'>
            <Button onClick={onAdd} className='h-full w-full flex-1 rounded-full text-white'>
              В корзину
            </Button>

            <ButtonSave
              onSave={(e) => {
                e.stopPropagation?.();
                setSave(!isSave);
              }}
              status={isSave}
              aria-label={isSave ? 'Удалить из сохранённых' : 'Сохранить товар'}
            />
          </div>
        </div>
      </section>

      <TextInstructionBlock />
    </div>
  );
};

export default InfoBlock;
