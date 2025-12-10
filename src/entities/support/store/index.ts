import { create } from 'zustand';
import type { FaqItem } from '@entities/support/types';

type SelectedFaqState = {
  selectedFaq: FaqItem | null;
  setSelectedFaq: (faq: FaqItem | null) => void;
};

export const useSelectedFaqStore = create<SelectedFaqState>((set) => ({
  selectedFaq: null,
  setSelectedFaq: (faq) => set({ selectedFaq: faq }),
}));
