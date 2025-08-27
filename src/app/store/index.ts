// src/stores/useMenu.ts
'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppState = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      open: false,
      setOpen: (v) => set({ open: v }),
    }),
    { name: 'app-store' }
  )
);
