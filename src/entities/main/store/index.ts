'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Category } from '../types';

type MainState = {
  activeCategory: Category | null;
  setActiveCategory: (v: Category | null) => void;

  perPage: number;
  setPerPage: (v: number) => void;

  page: number;
  setPage: (v: number) => void;

  total: number;
  setTotal: (v: number) => void;

  sort: string;
  setSort: (v: string) => void;

  search: string;
  setSearch: (v: string) => void;
};

export const useMainStore = create<MainState>()(
  devtools(
    (set) => ({
      // category
      activeCategory: null,
      setActiveCategory: (v) => set({ activeCategory: v }),

      // pagination
      perPage: 9,
      setPerPage: (v) => set({ perPage: v }),

      page: 1,
      setPage: (v) => set({ page: v }),
      // sort
      sort: 'price_asc',
      setSort: (v) => set({ sort: v }),

      // search
      search: '',
      setSearch: (v) => set({ search: v }),

      total: 0,
      setTotal: (v) => set({ total: v }),
    }),
    { name: 'main-store' },
  ),
);
