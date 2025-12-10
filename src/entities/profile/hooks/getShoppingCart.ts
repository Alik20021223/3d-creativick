// src/entities/profile/hooks/getShoppingCart.ts
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';
import type { ShoppingCart, ShoppingCartResponse } from '../types/cart';

type Opts = { enabled?: boolean };

const EMPTY_CART: ShoppingCart = {
  user_carts: [{ cart_id: 0, cartDetails: [] }],
} as unknown as ShoppingCart;

function normalizeCartResponse(resp: unknown): ShoppingCart {
  const r = resp as {
    user_carts?: unknown;
    data?: unknown;
    status?: boolean;
    statusCode?: string;
  };

  if (!r) return EMPTY_CART;

  // ✅ 1) Распакованный ответ: уже сам объект корзины
  if (typeof r === 'object' && 'user_carts' in r) {
    return r as ShoppingCart;
  }

  // ✅ 2) Обёртка ответа: { status?, statusCode?, data }
  if (typeof r === 'object' && 'data' in r) {
    // Ошибка «404 в обёртке»
    if (r?.status === false && (r?.statusCode === 'ERROR_404' || r?.data == null)) {
      return EMPTY_CART;
    }
    // Успех — внутри data лежит корзина
    if (r?.data && typeof r.data === 'object' && 'user_carts' in r.data) {
      return r.data as ShoppingCart;
    }
  }

  // ✅ 3) На всякий случай
  return EMPTY_CART;
}

export const useGetShoppingCart = (opts?: Opts) => {
  const enabled = opts?.enabled ?? true;

  return useQuery<ShoppingCartResponse | ShoppingCart | unknown, Error, ShoppingCart>({
    queryKey: ['auth', 'get-shopping-cart'],
    enabled,
    queryFn: ({ signal }) => profileService.getShoppingCart(signal),
    select: normalizeCartResponse,
    refetchOnWindowFocus: false,
  });
};
