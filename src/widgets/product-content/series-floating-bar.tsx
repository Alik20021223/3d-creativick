'use client';
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { Button } from '@shadcn/button';
import ButtonSave from '@feature/button-save';
import { ProductCardType } from '@shared/types';
import { useAddToShoppingCart } from '@entities/profile/hooks/addToShoppingCart';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import { useAppStore } from '@app/store';
import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';
import { useFavoritesIndex } from '@entities/profile/utils/favorite-hook/useFavoritesIndex';
import { useToggleFavorite } from '@entities/profile/utils/favorite-hook/useToggleFavorite';
import { useRequireAuth } from '@shared/hooks/useRequireAuth';
import { calcPrice, calcOldPrice } from '@/utils/product-pricing';
import { CartDetail } from '@/entities/profile/types/cart';
import { formatPrice } from '@utils/constant';

const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;

type Props = {
  productData: ProductCardType;
  sentinelId?: string; // ID маркера, который определяет, когда блок должен стать статичным
};

const SeriesFloatingBar: React.FC<Props> = ({ productData, sentinelId }) => {
  const { mutateAsync: addToCart } = useAddToShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();
  const { cartItems, isAuth } = useAppStore();
  const guest = useGuestCart();
  const requireAuth = useRequireAuth();

  const favIndex = useFavoritesIndex();
  const isFavorite = favIndex.ids.has(productData.uuid);
  const { toggle } = useToggleFavorite();
  const [favPending, setFavPending] = useState(false);

  // Получаем все stock_id из stock_balances (используем первый доступный stock_id для каждого варианта)
  // Для серии используем все доступные stock_balances
  const allStockIds = useMemo(() => {
    return (productData.stock_balances ?? [])
      .map((sb) => sb.id)
      .filter((id): id is number => typeof id === 'number' && id > 0);
  }, [productData.stock_balances]);

  // Контент корзины пользователя
  const cardItems = useMemo(() => cartItems?.user_carts?.[0]?.cartDetails ?? [], [cartItems]);

  // Проверяем, добавлена ли вся серия в корзину
  // Серия считается добавленной, если все stock_id присутствуют в корзине
  const isSeriesInCart = useMemo(() => {
    if (!allStockIds.length) return false;

    if (isAuth) {
      if (!cardItems.length) return false;
      const cartStockIds = new Set(
        cardItems.map((cd: CartDetail) => cd?.stock?.id).filter(Boolean),
      );
      return allStockIds.every((id) => cartStockIds.has(id));
    }

    // Для гостя проверяем каждый stock_id
    return allStockIds.every((stockId) => guest.hasStock(stockId, DEFAULT_SHOP_ID));
  }, [isAuth, cardItems, allStockIds, guest]);

  // Рассчитываем общую цену всей серии
  // Используем цену продукта, умноженную на количество моделей
  const seriesPrice = useMemo(() => {
    const singlePrice = calcPrice(productData);
    return singlePrice;
  }, [productData]);

  const seriesOldPrice = useMemo(() => {
    const singleOldPrice = calcOldPrice(productData, calcPrice(productData));
    return singleOldPrice;
  }, [productData]);

  // Состояние для отслеживания, должен ли блок быть фиксированным
  // По умолчанию блок фиксирован (плавающий с начала страницы)
  const [isFixed, setIsFixed] = useState(true);
  const staticContainerRef = useRef<HTMLDivElement>(null);

  // Используем IntersectionObserver для отслеживания видимости маркера
  useEffect(() => {
    // Если нет маркера, блок всегда фиксирован
    if (!sentinelId) {
      setIsFixed(true);
      return;
    }

    // Находим маркер, который определяет, когда блок должен стать статичным
    const sentinel = document.getElementById(sentinelId);

    if (!sentinel) {
      setIsFixed(true);
      return;
    }

    // Создаем IntersectionObserver для отслеживания видимости маркера
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Если маркер виден в viewport (пользователь дошел до блока) - блок статичен
        // Если маркер не виден (пользователь выше блока) - блок фиксирован (плавающий)
        setIsFixed(!entry.isIntersecting);
      },
      {
        // Порог 0 означает, что срабатывает как только элемент появляется/исчезает из viewport
        threshold: 0,
        rootMargin: '0px',
      },
    );

    observer.observe(sentinel);

    // Проверяем начальное состояние при монтировании
    // Если маркер не виден (пользователь вверху страницы) - блок фиксирован
    const checkInitialState = () => {
      const rect = sentinel.getBoundingClientRect();
      // Если маркер полностью выше viewport (пользователь вверху) - блок фиксирован
      // Если маркер виден (хотя бы частично) - блок статичен
      const isSentinelAboveViewport = rect.bottom < 0;
      const isSentinelBelowViewport = rect.top > window.innerHeight;
      const isSentinelVisible = !isSentinelAboveViewport && !isSentinelBelowViewport;
      setIsFixed(!isSentinelVisible);
    };

    // Проверяем сразу и после небольшой задержки (на случай, если DOM еще не готов)
    checkInitialState();
    const timeoutId = setTimeout(checkInitialState, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [sentinelId]);

  // Добавить всю серию в корзину
  const handleAddSeriesToCart = useCallback(async () => {
    if (!allStockIds.length) return;

    if (isAuth) {
      await addToCart({
        products: allStockIds.map((stockId) => ({ stock_id: stockId, quantity: 1 })),
        currency_id: DEFAULT_CURRENCY_ID,
        shop_id: DEFAULT_SHOP_ID,
      });
    } else {
      // Для гостя добавляем каждый stock_id
      allStockIds.forEach((stockId) => {
        const stockBalance = productData.stock_balances?.find((sb) => sb.id === stockId);
        guest.add({
          stock_id: stockId,
          quantity: 1,
          product_uuid: productData.uuid,
          color: stockBalance?.color || undefined,
          weight: stockBalance?.size || undefined,
          shop_id: DEFAULT_SHOP_ID,
          currency_id: DEFAULT_CURRENCY_ID,
          addedAt: Date.now(),
          img: productData.img,
          price: productData.sell_price,
          discount: productData?.discounts?.[0] || 0,
          title: productData.translation.title,
          description: productData.translation.description || '',
        });
      });
    }
  }, [isAuth, allStockIds, addToCart, guest, productData]);

  // Удалить всю серию из корзины
  const handleRemoveSeriesFromCart = useCallback(async () => {
    if (!allStockIds.length) return;

    if (isAuth) {
      const idsToDelete = allStockIds
        .map((stockId) => {
          return cardItems.find((cd: CartDetail) => cd?.stock?.id === stockId)?.id;
        })
        .filter((id): id is number => typeof id === 'number' && id > 0);

      if (idsToDelete.length) {
        await deleteCart({ ids: idsToDelete });
      }
    } else {
      // Для гостя удаляем каждый stock_id
      allStockIds.forEach((stockId) => {
        guest.removeByStockId(stockId, DEFAULT_SHOP_ID);
      });
    }
  }, [isAuth, allStockIds, cardItems, deleteCart, guest]);

  // Переключение избранного
  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (favPending) return;

      if (!isAuth) {
        requireAuth({ type: 'favorite', payload: { uuid: productData.uuid } }, () => {});
        return;
      }

      setFavPending(true);
      try {
        await toggle(productData.uuid, !isFavorite);
      } catch (err) {
        console.error('favorite toggle error', err);
      } finally {
        setFavPending(false);
      }
    },
    [isAuth, isFavorite, productData.uuid, requireAuth, toggle, favPending],
  );

  if (!allStockIds.length) return null;

  return (
    <div
      ref={staticContainerRef}
      className={`w-full transition-all duration-500 ease-in-out ${
        isFixed ? 'fixed right-0 bottom-5 left-0 z-50 max-md:hidden' : 'relative'
      }`}
      style={{
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className='container-custom px-2.5 md:px-10 2xl:px-0'>
        <div className='bg-secondary-white shadow-card-info rounded-[20px] p-3 md:rounded-[28px] md:p-6'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4'>
            {/* Текст */}
            <div className='text-base font-semibold text-slate-900 md:text-xl'>
              Стоимость всей серии
            </div>

            {/* Цены и кнопки */}
            <div className='flex items-center justify-between gap-2 md:gap-4'>
              {/* Цены */}
              <div className='flex items-end gap-2 md:gap-3'>
                {seriesOldPrice && seriesOldPrice > seriesPrice && (
                  <div className='text-xs text-slate-400 line-through md:text-base'>
                    {formatPrice(seriesOldPrice)} ₽
                  </div>
                )}
                <div className='text-dark-blue text-xl leading-none font-extrabold md:text-2xl md:text-[28px]'>
                  {formatPrice(seriesPrice)} ₽
                  <span className='text-sm font-bold md:text-lg'>₽</span>
                </div>
              </div>

              {/* Кнопки */}
              <div className='flex items-center gap-2 md:gap-3'>
                <Button
                  onClick={() => {
                    if (isSeriesInCart) {
                      handleRemoveSeriesFromCart();
                    } else {
                      handleAddSeriesToCart();
                    }
                  }}
                  variant={isSeriesInCart ? 'destructive' : undefined}
                  className='h-[40px] flex-1 rounded-full px-4 text-sm text-white md:h-[46px] md:px-6 md:text-base lg:h-[56px]'
                  aria-label={isSeriesInCart ? 'Удалить серию из корзины' : 'В корзину'}
                >
                  <span className='truncate'>
                    {isSeriesInCart ? 'Удалить из корзины' : 'В корзину'}
                  </span>
                </Button>

                <ButtonSave
                  onSave={handleToggleFavorite}
                  status={isFavorite}
                  disabled={favPending}
                  className='h-[40px] w-[40px] flex-shrink-0 md:h-[46px] md:w-[46px] lg:h-[56px] lg:w-[56px]'
                  aria-label={isFavorite ? 'Удалить из сохранённых' : 'Сохранить серию'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesFloatingBar;
