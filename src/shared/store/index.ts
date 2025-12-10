// src/stores/useMenu.ts
'use client';

import { AppSetting } from '@/entities/support/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ShareState = {
  isSave: boolean;
  setSave: (v: boolean) => void;

  appSettings: AppSetting[];
  setAppSettings: (settings: AppSetting[]) => void;
};

export const useSharedStore = create<ShareState>()(
  devtools(
    (set) => ({
      isSave: false,
      setSave: (v) => set({ isSave: v }),

      appSettings: [],
      setAppSettings: (settings) => set({ appSettings: settings }),
    }),
    { name: 'shared-store' },
  ),
);
