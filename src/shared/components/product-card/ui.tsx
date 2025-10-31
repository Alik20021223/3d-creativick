// ProductCard.tsx
import { JSX, useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ColorButton from '@shared/components/color-button';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCardType } from '@shared/types';
import ProductCarouselImage from './product-carousel';
import { Button } from '@shadcn/button';
import ButtonSave from '@feature/button-save';
import { useAddToShoppingCart } from '@entities/profile/hooks/addToShoppingCart';
import { useAppStore } from '@app/store';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import { getProductDetailPath } from '@utils/product-variants';
import { useProductVariantMeta } from '@shared/hooks/useProductVariantMeta';

// ✅ добавь импорт общих утил
import { calcPrice, calcOldPrice } from '@utils/product-pricing';
import { findOptionIdBySelection } from '@utils/product-variants';
import { cn } from '@shared/lib/utils';
import { useAddToFavoriteCart } from '@entities/profile/hooks/addFavoriteCart';
import { CartDetail } from '@/entities/profile/types/cart';

const rub = new Intl.NumberFormat('ru-RU');

interface ProductCardProps {
  data: ProductCardType;
}

export default function ProductCard({ data }: ProductCardProps): JSX.Element {
  const navigate = useNavigate();
  const { mutateAsync } = useAddToShoppingCart();

  const { mutateAsync: addFavorite, isPending: favLoading } = useAddToFavoriteCart();

  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  const { cartItems } = useAppStore();

  const cardItems = cartItems?.user_carts?.[0]?.cartDetails || [];

  // варианты из стока
  const { options: stockOptions, colors: colorsFromStock, hasColors } = useProductVariantMeta(data);

  // ui-цвета
  const uiColors = useMemo(
    () => colorsFromStock.map((v) => ({ value: v, class: v })),
    [colorsFromStock],
  );

  // выбранный цвет и stock_id
  const [color, setColor] = useState<string | undefined>(
    hasColors ? uiColors[0]?.value : undefined,
  );
  const [selectedStockId, setSelectedStockId] = useState<number | undefined>(undefined);
  const [isSave, setSave] = useState<boolean>(false);

  // ✅ актуализируем stock_id при смене товара/цвета/опций
  useEffect(() => {
    if (!data) return;
    const stockId = findOptionIdBySelection(
      { uuid: data.uuid, stock_balances: data.stock_balances },
      color,
      undefined, // веса на карточке нет — подберется минимальный для цвета
    );
    setSelectedStockId(stockId ?? stockOptions?.[0]?.id);
  }, [data?.uuid, data?.stock_balances, color, stockOptions]);

  const handlePickColor = (v: string) => setColor(v);

  // ✅ корректные цены товара
  const price = useMemo(() => calcPrice(data ?? {}), [data]);
  const oldPrice = useMemo(() => calcOldPrice(data ?? {}, price), [data, price]);

  // добавление
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedStockId) return;
    await mutateAsync({
      products: [{ stock_id: selectedStockId, quantity: 1 }],
      currency_id: 1,
      shop_id: 1,
    });
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addFavorite(data.uuid); // ⬅️ передаём UUID
      setSave((s) => !s); // локальный флаг (оптимистично)
    } catch (err) {
      // опционально: показать тост/лог
      console.error('favorite error', err);
    }
  };

  // есть ли этот конкретный вариант в корзине
  const isInCart = useMemo(() => {
    if (!cardItems.length) return false;
    if (selectedStockId)
      return cardItems.some((cd: CartDetail) => cd?.stock?.id === selectedStockId);
    return false;
  }, [cardItems, selectedStockId]);

  // удаление именно выбранного варианта
  const handleRemoveFromCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const idToDelete =
      cardItems.find((cd: CartDetail) => cd?.stock?.id === selectedStockId)?.id ??
      cardItems.find((cd: CartDetail) => cd?.stock?.product?.id === data.id)?.id ??
      0; // фоллбек
    if (idToDelete) {
      await deleteCart({ ids: [idToDelete] });
    }
  };

  // роут
  const detailPath = getProductDetailPath(data);
  const linkText = hasColors ? 'Подробнее' : 'Посмотреть детали серии';

  return (
    <div
      onClick={() => navigate(detailPath)}
      className='bg-secondary-white relative flex h-full max-h-[520px] flex-col overflow-hidden rounded-[60px] shadow-lg max-md:max-h-fit max-md:min-h-[520px] max-md:max-w-[355px] md:max-h-[618px]'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <ProductCarouselImage images={data.galleries} />
      </div>

      <div className='mt-auto p-5.5 pt-0'>
        <h2 className='text-[32px] font-bold max-md:text-2xl'>{data.translation.title}</h2>

        {hasColors && (
          <div className='mt-3' onClick={(e) => e.stopPropagation()}>
            <p className='text-sm text-gray-500'>Выберите цвет:</p>
            <div className='mt-2 flex gap-2'>
              {uiColors.map((c) => (
                <ColorButton
                  key={c.value}
                  data={c}
                  activeColor={color || ''}
                  setNewColor={handlePickColor}
                />
              ))}
            </div>
          </div>
        )}

        {!hasColors && data.translation.description && (
          <div className='mt-3 max-md:hidden'>
            <p className='description-text line-clamp-2'>{data.translation.description}</p>
          </div>
        )}

        <div
          className={cn(
            'mt-5 flex items-start justify-between',
            'items-center',
            !hasColors && 'max-md:flex-col max-md:items-start max-md:space-y-2',
          )}
        >
          <Link
            to={detailPath}
            onClick={(e) => e.stopPropagation()}
            className='text-secondary-text flex h-4 items-center text-sm hover:underline'
          >
            {linkText}
            <ChevronRight className='h-4 w-4' />
          </Link>

          <div className='flex items-end space-x-2.5 text-right'>
            {typeof oldPrice === 'number' && oldPrice > price && (
              <p className='text-secondary-gray text-sm italic line-through'>
                {rub.format(oldPrice)} ₽
              </p>
            )}
            <p className='text-dark-blue text-2xl leading-[110%] font-bold md:text-[32px]'>
              {rub.format(price)} ₽
            </p>
          </div>
        </div>

        <div className='mt-5 flex h-[46px] items-center justify-between md:h-[56px]'>
          <Button
            className='h-full flex-1 rounded-full text-lg font-semibold text-white'
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            disabled={!selectedStockId}
            variant={isInCart ? 'destructive' : undefined}
          >
            {isInCart ? 'Удалить из корзины' : 'В корзину'}
          </Button>

          <ButtonSave
            active={isSave}
            onSave={handleToggleFavorite} // ⬅️ используем новый обработчик
            status={isSave}
            disabled={favLoading} // ⬅️ блокируем на время запроса (если есть проп)
          />
        </div>
      </div>
    </div>
  );
}
