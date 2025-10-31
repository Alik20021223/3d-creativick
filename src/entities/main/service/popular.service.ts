import { axiosInstance } from '@shared/axios';
import { REQUEST_URL } from '@entities/main/constant/request';
import { ProductListResponse } from '../types';

export const popularService = {
  async getAll(signal?: AbortSignal) {
    const res = await axiosInstance.get<ProductListResponse>(REQUEST_URL.POPULAR, { signal });
    return res.data.data;
  },
};
