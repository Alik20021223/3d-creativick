// src/stores/useMenu.ts
'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ShareState = {
  isSave: boolean;
  setSave: (v: boolean) => void;
};

export const useSharedStore = create<ShareState>()(
  devtools(
    (set) => ({
      isSave: false,
      setSave: (v) => set({ isSave: v }),
      isAuth: true,
    }),
    { name: 'shared-store' },
  ),
);
