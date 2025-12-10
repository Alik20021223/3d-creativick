import React, { useEffect, useState } from 'react';
import { Button } from '@shadcn/button';
import ButtonSave from '@feature/button-save';
// import TextInstructionBlock from './TextInstructionBlock';
import ColorButton from '@shared/components/color-button';
// import BadgeInfo from '@feature/badge-info';
import { ProductCardType } from '@shared/types';
import { useProductInfoBlock } from '@shared/hooks/useProductInfoBlock';
import { useDependentVariants } from '@shared/hooks/useDependentVariants';
import { useAppStore } from '@app/store';
import { useRequireAuth } from '@shared/hooks/useRequireAuth';
import { useFavoritesIndex } from '@entities/profile/utils/favorite-hook/useFavoritesIndex';
import { useToggleFavorite } from '@entities/profile/utils/favorite-hook/useToggleFavorite';
import { getProductBadges } from '@utils/getProductBadges';
import BadgeInfo from '@feature/badge-info';

type Props = {
  data: ProductCardType;
  onAdd?: (id: number) => void;
  onRemove?: () => void; // ← NEW
  isInCart?: boolean; // ← NEW
  onColorChange?: (value: string) => void;
  onWeightChange?: (value: number) => void;
  techData?: string;
  isSeries: boolean;
};

const rub = new Intl.NumberFormat('ru-RU');

const InfoBlock: React.FC<Props> = ({
  data,
  onAdd,
  onRemove,
  isInCart = false,
  isSeries,
  onColorChange,
  onWeightChange,
  techData = '',
}) => {
  const {
    title,
    description,
    price,
    oldPrice,
    showColors,
    showWeights,
    initialColor,
    initialWeight,
  } = useProductInfoBlock(data);

  const { isAuth } = useAppStore();
  const requireAuth = useRequireAuth();

  const favIndex = useFavoritesIndex();
  const isFavorite = favIndex.ids.has(data.uuid);

  const { toggle } = useToggleFavorite();

  const badges = getProductBadges(data);

  // Локальные состояния выбора
  const [color, setColor] = useState<string>(initialColor ?? '');
  const [weight, setWeight] = useState<number>(initialWeight ?? 0);

  const [favPending, setFavPending] = useState(false);

  // ✅ зависимые доступные опции
  const { availableColors, availableWeights, isValidCombo, corrected, selectedStockId } =
    useDependentVariants(data, color, weight);

  // ✅ если пришёл другой товар — синхронизируем стартовые значения
  useEffect(() => {
    setColor(initialColor ?? '');
    setWeight(initialWeight ?? 0);
  }, [initialColor, initialWeight, data?.uuid]);

  // ✅ если выбрана невалидная комбинация — мягко корректируем
  useEffect(() => {
    if (!isValidCombo) {
      if (corrected.color && corrected.color !== color) setColor(corrected.color);
      if (
        typeof corrected.weight === 'number' &&
        Number.isFinite(corrected.weight) &&
        corrected.weight !== weight
      ) {
        setWeight(corrected.weight);
      }
    }
  }, [isValidCombo, corrected, color, weight]);

  const handlePickColor = (v: string) => {
    setColor(v);
    onColorChange?.(v);
  };

  const handlePickWeight = (v: number) => {
    setWeight(v);
    onWeightChange?.(v);
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favPending) return;

    if (!isAuth) {
      requireAuth({ type: 'favorite', payload: { uuid: data.uuid } }, () => {});
      return;
    }

    setFavPending(true);
    try {
      await toggle(data.uuid, !isFavorite);
    } catch (err) {
      console.error('favorite toggle error', err);
    } finally {
      setFavPending(false);
    }
  };

  return (
    <div className='flex w-full flex-col md:w-1/2'>
      <section className='bg-secondary-white shadow-card-info relative rounded-[28px] p-6 max-md:shadow-2xl! md:p-8'>
        <div className='flex items-center gap-5'>
          {title && (
            <h2 className='text-2xl leading-tight font-semibold text-slate-900 md:text-[28px]'>
              {title}
            </h2>
          )}
        </div>

        {!!badges.length && (
          <div className='mt-4 flex flex-wrap gap-3'>
            {badges.map((b, i) => (
              <BadgeInfo data={b} key={i} />
            ))}
          </div>
        )}

        {/* Описание */}
        {description && (
          <p className='text-secondary-text mt-5 leading-relaxed md:text-lg'>{description}</p>
        )}

        {/* Выбор цвета */}
        {showColors && (
          <div className='mt-5'>
            <p className='mb-2 text-sm text-gray-500'>Выберите цвет:</p>
            <div className='flex flex-wrap gap-2'>
              {availableColors.map((c) => (
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
        {showWeights && (
          <div className='mt-5'>
            <p className='mb-2 text-sm text-gray-500'>Выберите граммовку:</p>
            <div className='flex flex-wrap gap-2'>
              {availableWeights.map((w) => {
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
            {/* (заметь: обычно тут показывают текущую цену, а не oldPrice - price) */}
            <div className='text-dark-blue text-[34px] leading-none font-extrabold md:text-[38px]'>
              {rub.format(price)}
              <span className='text-[22px] font-bold'>₽</span>
            </div>
            {typeof oldPrice === 'number' && oldPrice > price && (
              <div className='mb-1 text-slate-400 italic line-through'>
                {rub.format(oldPrice)} ₽
              </div>
            )}
          </div>

          <div className='flex h-[46px] w-full items-center gap-3 md:h-[56px]'>
            <Button
              onClick={() => {
                if (!selectedStockId) return;
                if (isInCart) {
                  onRemove?.();
                } else {
                  onAdd?.(selectedStockId);
                }
              }}
              disabled={!selectedStockId}
              variant={isInCart ? 'destructive' : undefined}
              className='h-full w-full flex-1 rounded-full text-white'
              aria-label={
                isInCart ? 'Удалить из корзины' : isSeries ? 'Купить серию' : 'Добавить в корзину'
              }
            >
              {isInCart ? 'Удалить из корзины' : isSeries ? 'Купить серию' : 'В корзину'}
            </Button>

            {!isSeries && (
              <ButtonSave
                onSave={(e) => {
                  e.stopPropagation?.();
                  handleToggleFavorite(e);
                }}
                status={isFavorite}
                disabled={favPending}
                aria-label={isFavorite ? 'Удалить из сохранённых' : 'Сохранить товар'}
              />
            )}
          </div>
        </div>
      </section>

      {techData && typeof techData === 'string' && (
        <section className='mt-10'>
          <div
            className='space-y-3 text-sm text-slate-700'
            dangerouslySetInnerHTML={{ __html: techData }}
          />
        </section>
      )}
    </div>
  );
};

export default InfoBlock;
