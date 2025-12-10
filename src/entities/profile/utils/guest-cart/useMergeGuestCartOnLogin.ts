// src/entities/profile/guest-cart/useMergeGuestCartOnLogin.ts
import { useEffect, useRef } from 'react';
import { readCart, clearCart } from './guest-cart.storage';
import { GuestCartItem } from '../../types/guest-cart';

type AddToCartApi = (payload: {
  products: { stock_id: number; quantity: number }[];
  currency_id: number;
  shop_id: number;
}) => Promise<unknown>;

/**
 * Хук для синхронизации гостевой корзины из localStorage с серверной корзиной при логине
 * Автоматически переносит все товары из localStorage в корзину пользователя через POST запрос
 */
export function useMergeGuestCartOnLogin(isAuth: boolean, addToCart: AddToCartApi) {
  const mergedRef = useRef(false);
  const isProcessingRef = useRef(false);
  const addToCartRef = useRef(addToCart);

  // Сохраняем актуальную ссылку на функцию
  useEffect(() => {
    addToCartRef.current = addToCart;
  }, [addToCart]);

  useEffect(() => {
    // Проверяем наличие токена для надежности
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

    if (!isAuth || !hasToken || mergedRef.current || isProcessingRef.current) {
      return;
    }

    const guest = readCart();
    if (!guest.length) {
      mergedRef.current = true;
      return;
    }

    // Группируем по shop/currency (на случай будущей поддержки нескольких)
    const byKey = new Map<string, GuestCartItem[]>();
    for (const it of guest) {
      const key = `${it.shop_id}:${it.currency_id}`;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key)!.push(it);
    }

    isProcessingRef.current = true;

    (async () => {
      try {
        // Синхронизируем все группы товаров
        for (const [key, group] of byKey.entries()) {
          const [shop_id, currency_id] = key.split(':').map((n) => Number(n));

          try {
            await addToCartRef.current({
              shop_id,
              currency_id,
              products: group.map((g) => ({ stock_id: g.stock_id, quantity: g.quantity })),
            });
          } catch (error) {
            console.error(`Ошибка при синхронизации корзины для shop_id=${shop_id}:`, error);
            // Продолжаем синхронизацию других групп даже при ошибке
          }
        }

        // Очищаем гостевую корзину только после успешной синхронизации
        clearCart();
        mergedRef.current = true;
        console.log('Гостевая корзина успешно синхронизирована с сервером');
      } catch (error) {
        console.error('Критическая ошибка при синхронизации корзины:', error);
        // Не очищаем корзину при ошибке, чтобы пользователь не потерял товары
      } finally {
        isProcessingRef.current = false;
      }
    })();
  }, [isAuth]);

  // Сбрасываем флаг при выходе из системы
  useEffect(() => {
    if (!isAuth) {
      mergedRef.current = false;
      isProcessingRef.current = false;
    }
  }, [isAuth]);
}
