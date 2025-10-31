// src/stores/useMenu.ts
'use client';

import { ShoppingCart } from '@/entities/profile/types/cart';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppState = {
  openMenu: boolean;
  setOpenMenu: (v: boolean) => void;

  openShoppingCart: boolean;
  setOpenShoppingCart: (v: boolean) => void;

  openLkModal: boolean;
  setOpenLkModal: (v: boolean) => void;

  isAuth: boolean;
  setIsAuth?: (v: boolean) => void;

  cartItemsCount: number;

  cartItems: ShoppingCart | null;
  setCartItems: (v: ShoppingCart | null) => void;

  closeAll: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      openMenu: false,
      setOpenMenu: (v) => set({ openMenu: v, openShoppingCart: false }),

      openShoppingCart: false,
      setOpenShoppingCart: (v) => set({ openShoppingCart: v, openMenu: false }),

      openLkModal: false,
      setOpenLkModal: (v) => set({ openLkModal: v }),

      isAuth: localStorage.getItem('token') ? true : false,
      setIsAuth: (v) => set({ isAuth: v }),

      cartItemsCount: 0,

      cartItems: null,
      setCartItems: (v) =>
        set({ cartItems: v, cartItemsCount: v ? v.user_carts[0].cartDetails.length : 0 }),

      closeAll: () =>
        set({
          openMenu: false,
          openShoppingCart: false,
        }),
    }),
    { name: 'app-store' },
  ),
);
