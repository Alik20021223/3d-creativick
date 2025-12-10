import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@shadcn/button';
import { ProductCardType } from '@shared/types';
import { getProductDetailPath } from '@utils/product-variants';

import { useAddToShoppingCart } from '@entities/profile/hooks/addToShoppingCart';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import { useAppStore } from '@app/store';
import { useProductVariantMeta } from '@shared/hooks/useProductVariantMeta';
import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';
import { calcPrice, calcOldPrice } from '@utils/product-pricing';
import { findOptionIdBySelection } from '@utils/product-variants';
import { CartDetail } from '@entities/profile/types/cart';

const rub = new Intl.NumberFormat('ru-RU');
const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;

type Props = {
  product: ProductCardType;
  className?: string;
};

const CardItem: React.FC<Props> = ({ product, className = '' }) => {
  const navigate = useNavigate();

  const title = product.translation?.title ?? '';
  const detailPath = useMemo(() => getProductDetailPath(product), [product]);

  // 🛒 хуки корзины
  const { mutateAsync: addToCartApi } = useAddToShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();
  const { cartItems, isAuth } = useAppStore();
  const cardItems = useMemo(() => cartItems?.user_carts?.[0]?.cartDetails || [], [cartItems]);

  // гостевая корзина
  const guest = useGuestCart();

  // варианты стока (можно без цветов — берём дефолтный stock_id)
  const { options: stockOptions } = useProductVariantMeta(product);

  const [selectedStockId, setSelectedStockId] = useState<number | undefined>(undefined);

  // актуализируем stock_id для карточки-хита
  useEffect(() => {
    if (!product) return;

    const stockId =
      findOptionIdBySelection(
        { uuid: product.uuid, stock_balances: product.stock_balances },
        undefined, // цвет
        undefined, // вес
      ) ??
      stockOptions?.[0]?.id ??
      product.stock_balances?.[0]?.id;

    setSelectedStockId(stockId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.uuid, product?.stock_balances, stockOptions]);

  // цена как в ProductCard
  const price = useMemo(() => calcPrice(product ?? {}), [product]);
  const oldPrice = useMemo(() => calcOldPrice(product ?? {}, price), [product, price]);

  // есть ли именно этот stock в корзине
  const isInCart = useMemo(() => {
    if (!selectedStockId) return false;

    if (isAuth) {
      if (!cardItems.length) return false;
      return cardItems.some((cd: CartDetail) => cd?.stock?.id === selectedStockId);
    }

    return guest.hasStock(selectedStockId, DEFAULT_SHOP_ID);
  }, [isAuth, cardItems, selectedStockId, guest]);

  // добавление в корзину
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        weight: product.stock_balances[0]?.size || '',
        product_uuid: product.uuid,
        color: product.stock_balances[0]?.color || undefined,
        shop_id: DEFAULT_SHOP_ID,
        currency_id: DEFAULT_CURRENCY_ID,
        img: product.img,
        price: product.sell_price,
        discount: product?.discounts?.[0] || 0,
        title: product.translation.title,
        description: product.translation.description || '',
        addedAt: Date.now(),
      });
    }
  };

  // удаление именно выбранного варианта
  const handleRemoveFromCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!selectedStockId) return;

    if (isAuth) {
      const idToDelete =
        cardItems.find((cd: CartDetail) => cd?.stock?.id === selectedStockId)?.id ??
        cardItems.find((cd: CartDetail) => cd?.stock?.product?.id === product.id)?.id ??
        0;

      if (idToDelete) {
        await deleteCart({ ids: [idToDelete] });
      }
    } else {
      guest.removeByStockId(selectedStockId, DEFAULT_SHOP_ID);
    }
  };

  return (
    <article
      className={[
        'group bg-secondary-active relative flex h-full flex-col space-y-4 rounded-[60px] max-md:h-[570px]',
        'button-shadow-blue',
        className,
      ].join(' ')}
      onClick={() => navigate(detailPath)}
    >
      {/* Топ: картинка с большим скруглением */}
      <div
        className='px-2.5 pt-2.5'
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className='relative flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[60px] md:h-[310px]'>
          <img
            src={product.img}
            alt={title}
            className='inset-x-0 h-full w-full bg-white object-cover object-center max-md:scale-[1] md:inset-0'
            draggable={false}
          />

          <div className='description-text bg-secondary-white absolute top-8 right-8 rounded-full px-5.5 py-1'>
            Хит продаж 🔥
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className='flex flex-1 flex-col px-5.5 pb-5.5'>
        <div className='flex min-h-[72px] max-w-[350px] items-start max-md:max-w-[290px] md:min-h-[86px]'>
          <h2 className='line-clamp-2 text-[32px] leading-tight font-bold max-md:text-2xl'>
            {title}
          </h2>
        </div>

        {/* Рейтинг + цена как в ProductCard */}
        <div className='mt-4 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2 text-gray-500'>
            <Star className='h-[35px] w-[35px] fill-[#FFD300] text-[#FFD300]' />
            <span className='description-text'>{(5.0).toFixed(1)}</span>
          </div>

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

        {/* Кнопки */}
        <div className='mt-6 flex w-full gap-4 max-md:flex-col md:h-[56px]'>
          <Button
            className='h-full flex-1 rounded-full text-lg font-semibold text-white max-md:h-[46px]'
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            disabled={!selectedStockId}
            variant={isInCart ? 'destructive' : undefined}
          >
            {isInCart ? 'Удалить из корзины' : 'В корзину'}
          </Button>

          <Button
            variant='outline'
            onClick={(e) => {
              e.stopPropagation();
              navigate(detailPath);
            }}
            className='h-full flex-1 text-lg max-md:h-[46px] md:text-[22px]'
          >
            Подробнее
            <span className='leading-none md:text-2xl'>›</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CardItem;
