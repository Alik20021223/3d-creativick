// src/stores/useMenu.ts
'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppState = {
  openMenu: boolean;
  setOpenMenu: (v: boolean) => void;

  openShoppingCart: boolean;
  setOpenShoppingCart: (v: boolean) => void;

  isAuth: boolean;

  closeAll: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({

      openMenu: false,
      setOpenMenu: (v) => set({ openMenu: v, openShoppingCart: false }),

      openShoppingCart: false,
      setOpenShoppingCart: (v) => set({ openShoppingCart: v, openMenu: false }),

      isAuth: true,

      closeAll: () => set({
        openMenu: false,
        openShoppingCart: false,
      }),
    }),
    { name: 'app-store' },
  ),
);
