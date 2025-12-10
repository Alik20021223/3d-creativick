'use client';
import { ShoppingCart } from '@/entities/profile/types/cart';
import { ModalApp } from '@shared/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthIntent =
  | { type: 'checkout'; payload?: { cart_id?: number } }
  | { type: 'favorite'; payload: { uuid: string } };

type AppState = {
  openMenu: boolean;

  openShoppingCart: boolean;

  openLkModal: boolean;
  setExclusive: (which: ModalApp | null, state?: boolean) => void;

  isAuth: boolean;
  setIsAuth?: (v: boolean) => void;

  cartItemsCount: number;

  cartItems: ShoppingCart | null;
  setCartItems: (v: ShoppingCart | null) => void;

  authIntent: AuthIntent | null;
  setAuthIntent: (i: AuthIntent | null) => void;

  closeAll: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      setExclusive: (which, next) =>
        set((s) => {
          const current: ModalApp | null = s.openMenu
            ? 'menu'
            : s.openShoppingCart
              ? 'cart'
              : s.openLkModal
                ? 'lk'
                : null;

          let open: boolean;
          if (which === null) {
            open = false;
          } else if (typeof next === 'boolean') {
            open = next;
          } else {
            open = current !== which; // toggle
          }

          if (!open) {
            return { openMenu: false, openShoppingCart: false, openLkModal: false };
          }

          return {
            openMenu: which === 'menu',
            openShoppingCart: which === 'cart',
            openLkModal: which === 'lk',
          };
        }),

      isAuth: typeof window !== 'undefined' && localStorage.getItem('token') ? true : false,
      setIsAuth: (v) => {
        set({ isAuth: v });
        // Обновляем токен в localStorage при изменении статуса авторизации
        if (typeof window !== 'undefined') {
          if (v && !localStorage.getItem('token')) {
            // Если устанавливаем авторизацию, но токена нет - это странно, но не падаем
            console.warn('isAuth установлен в true, но токен отсутствует в localStorage');
          } else if (!v) {
            // При выходе очищаем токен
            localStorage.removeItem('token');
          }
        }
      },

      cartItemsCount: 0,

      cartItems: null,
      setCartItems: (v) =>
        set((state) => {
          // Проверяем, действительно ли изменились данные
          if (state.cartItems === v) return state;
          if (!state.cartItems && !v) return state;
          
          const newCount = v ? v.user_carts[0]?.cartDetails?.length ?? 0 : 0;
          
          // Если счетчик не изменился и данные те же, не обновляем
          if (state.cartItems && v && 
              state.cartItemsCount === newCount &&
              state.cartItems === v) {
            return state;
          }
          
          return { cartItems: v, cartItemsCount: newCount };
        }),

      closeAll: () =>
        set({
          openMenu: false,
          openShoppingCart: false,
        }),

      authIntent: null,
      setAuthIntent: (i) => set({ authIntent: i }),
    }),
    { name: 'app-store' },
  ),
);
