// ProductCard.tsx
import { JSX, useEffect, useMemo, useState, memo } from 'react';
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

// общие утилы
import { calcPrice, calcOldPrice } from '@utils/product-pricing';
import { findOptionIdBySelection } from '@utils/product-variants';
import { cn } from '@shared/lib/utils';
import { CartDetail } from '@entities/profile/types/cart';

// ⬇️ гостевая корзина
import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';
import { useFavoritesIndex } from '@/entities/profile/utils/favorite-hook/useFavoritesIndex';
import { useToggleFavorite } from '@/entities/profile/utils/favorite-hook/useToggleFavorite';
import ProductBadge from '@shared/components/product-badge';

const rub = new Intl.NumberFormat('ru-RU');
const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;

interface ProductCardProps {
  data: ProductCardType;
}

const ProductCard = ({ data }: ProductCardProps): JSX.Element => {
  const navigate = useNavigate();

  const { mutateAsync: addToCartApi } = useAddToShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  const { cartItems, isAuth, setExclusive } = useAppStore();
  const cardItems = useMemo(() => cartItems?.user_carts?.[0]?.cartDetails || [], [cartItems]);

  // гостевая корзина
  const guest = useGuestCart();

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
  const [favPending, setFavPending] = useState(false);
  const favIndex = useFavoritesIndex();
  const isFavorite = favIndex.ids.has(data.uuid);
  const { toggle } = useToggleFavorite();

  // актуализируем stock_id при смене товара/цвета/опций
  useEffect(() => {
    if (!data) return;
    const stockId = findOptionIdBySelection(
      { uuid: data.uuid, stock_balances: data.stock_balances },
      color,
      undefined, // веса на карточке нет — подберется минимальный для цвета
    );
    setSelectedStockId(stockId ?? stockOptions?.[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.uuid, data?.stock_balances, color, stockOptions]);

  const handlePickColor = (v: string) => setColor(v);

  // корректные цены товара
  const price = useMemo(() => calcPrice(data ?? {}), [data]);
  const oldPrice = useMemo(() => calcOldPrice(data ?? {}, price), [data, price]);

  const isInCart = useMemo(() => {
    if (!selectedStockId) return false;
    if (isAuth) {
      if (!cardItems.length) return false;
      return cardItems.some((cd: CartDetail) => cd?.stock?.id === selectedStockId);
    }
    return guest.hasStock(selectedStockId, DEFAULT_SHOP_ID);
  }, [isAuth, cardItems, selectedStockId, guest]);

  // добавление
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedStockId) return;

    if (isAuth) {
      await addToCartApi({
        products: [{ stock_id: selectedStockId, quantity: 1 }],
        currency_id: DEFAULT_CURRENCY_ID,
        shop_id: DEFAULT_SHOP_ID,
      });
    } else {
      guest.add({
        stock_id: selectedStockId,
        quantity: 1,
        weight: data.stock_balances[0].size || '',
        product_uuid: data.uuid,
        color: color || undefined,
        shop_id: DEFAULT_SHOP_ID,
        currency_id: DEFAULT_CURRENCY_ID,
        img: data.img,
        price: data.sell_price,
        discount: data?.discounts[0] || 0,
        title: data.translation.title,
        description: data.translation.description || '',
        addedAt: Date.now(),
      });
    }
  };

  // удаление именно выбранного варианта
  const handleRemoveFromCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedStockId) return;

    if (isAuth) {
      const idToDelete =
        cardItems.find((cd: CartDetail) => cd?.stock?.id === selectedStockId)?.id ??
        cardItems.find((cd: CartDetail) => cd?.stock?.product?.id === data.id)?.id ??
        0; // фоллбек
      if (idToDelete) {
        await deleteCart({ ids: [idToDelete] });
      }
    } else {
      guest.removeByStockId(selectedStockId, DEFAULT_SHOP_ID);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favPending) return;

    if (!isAuth) {
      setExclusive('lk');
      return;
    }

    setFavPending(true);
    try {
      await toggle(data.uuid, !isFavorite);
    } catch (err) {
      console.error('favorite error', err);
    } finally {
      setFavPending(false);
    }
  };

  // роут
  const detailPath = getProductDetailPath(data);
  const linkText = hasColors ? 'Подробнее' : 'Посмотреть детали серии';

  const detailUrl = useMemo(() => {
    if (!location.search) return detailPath;

    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category_id');

    if (categoryId) {
      return `${detailPath}?category_id=${categoryId}`;
    }

    return detailPath;
  }, [detailPath]);

  return (
    <div
      onClick={() => navigate(detailUrl)}
      className={cn(
        'bg-secondary-white relative flex min-w-[355px] cursor-pointer flex-col overflow-hidden rounded-[60px] shadow-lg max-md:max-w-[355px]',
        // если хочешь чуть ограничить на десктопе — оставь только max-w
        // 'md:max-w-[380px]',
        'button-shadow-blue',
      )}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(detailUrl);
        }
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(detailUrl);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className='relative'
      >
        <ProductCarouselImage images={data.galleries} />
        
        {/* Badges */}
        {data.badges && data.badges.length > 0 && (
          <div className='absolute top-8 right-8 z-20 flex flex-col gap-1'>
            {data.badges
              .filter((badge) => badge.active)
              .sort((a, b) => a.sort_order - b.sort_order)
              .slice(0, 2)
              .map((badge) => (
                <ProductBadge key={badge.id} badge={badge} />
              ))}
          </div>
        )}
      </div>

      <div className='flex flex-col p-5.5 pt-0'>
        {/* 🔹 Блок под заголовок одинаковой высоты на всех карточках */}
        <div className='flex min-h-[72px] max-w-[350px] items-start max-md:max-w-[290px] md:min-h-[86px]'>
          <h2 className='line-clamp-2 text-[32px] leading-tight font-bold max-md:text-2xl'>
            {data.translation.title}
          </h2>
        </div>

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
            to={detailUrl}
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

        <div className='mt-5 flex h-[46px] items-center justify-between gap-3 md:h-[56px]'>
          <Button
            className='h-full flex-1 rounded-full text-lg font-semibold text-white'
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            disabled={!selectedStockId}
            variant={isInCart ? 'destructive' : undefined}
          >
            {isInCart ? 'Удалить из корзины' : 'В корзину'}
          </Button>

          <ButtonSave
            active={isFavorite}
            onSave={handleToggleFavorite}
            status={isFavorite}
            disabled={favPending}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
