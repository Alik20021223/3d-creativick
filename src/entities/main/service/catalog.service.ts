import { axiosInstance } from '@shared/axios';
import { REQUEST_URL } from '../constant/request';
import { CategoryResponse } from '../types';

export const catalogService = {
  async getCategories(signal?: AbortSignal) {
    // ожидаем ответ вида: ["Категория 1", "Категория 2", ...]
    const res = await axiosInstance.get<CategoryResponse>(REQUEST_URL.CATEGORIES, {
      params: { lang: 'ru', type: 'main' },
      signal,
    });
    return res.data.data;
  },
};
