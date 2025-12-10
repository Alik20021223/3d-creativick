import { axiosInstance } from '@shared/axios';
import { ItemFilter, ProductListResponse } from '../types';
import { ProductCardTypeById } from '@shared/types';
import { REQUEST_URL } from '../constant/request';
import { BannersResponse, ExternalStoresResponse } from '@/entities/products/types';

export const productService = {
  async getProducts(params?: ItemFilter, signal?: AbortSignal) {
    const res = await axiosInstance.get<ProductListResponse>(REQUEST_URL.PRODUCTS, {
      params,
      signal,
    });
    return res.data;
  },

  async getProductById(id: string, signal?: AbortSignal) {
    const res = await axiosInstance.get<ProductCardTypeById>(`${REQUEST_URL.PRODUCT_BY_ID}/${id}`, {
      signal,
    });

    return res.data.data;
  },

  async getOurActions(signal?: AbortSignal) {
    const res = await axiosInstance.get<BannersResponse>(REQUEST_URL.OUR_ACTIONS, {
      signal,
    });
    return res.data.data;
  },

  async getAllMarkets(signal?: AbortSignal) {
    const res = await axiosInstance.get<ExternalStoresResponse>(REQUEST_URL.GET_ALL_MARKETS, {
      signal,
    });
    return res.data.data;
  },
};
