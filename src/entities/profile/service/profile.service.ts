// src/shared/services/lkService.ts
import { axiosInstance } from '@shared/axios';
import { REQUEST_URL } from '@entities/profile/constant/request';
import { UpdateUserData } from '@entities/profile/types';
import { AddToShoppingCartPayload } from '@entities/profile/hooks/addToShoppingCart';
import { ItemFilter } from '@entities/main/types';
import { OrderProfileResponse } from '@entities/profile/types/order';
import { FavoriteResponse } from '@entities/profile/types/favorite';

export const profileService = {
  async addToCart(payload: AddToShoppingCartPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post(REQUEST_URL.ADD_SHOPPING_CART_ITEM, payload, {
      signal,
    });
    return data;
  },

  async getShoppingCart(signal?: AbortSignal) {
    const { data } = await axiosInstance.get(REQUEST_URL.GET_SHOPPING_CART, { signal });
    return data.data;
  },

  async getFavorites(params?: ItemFilter, signal?: AbortSignal) {
    const res = await axiosInstance.get<FavoriteResponse>(REQUEST_URL.GET_FAVORITES, {
      params,
      signal,
    });
    return res.data;
  },

  async AddFavorite(id: string, signal?: AbortSignal) {
    const res = await axiosInstance.post<FavoriteResponse>(
      `${REQUEST_URL.ADD_FAVORITE}${id}/like`,
      {
        signal,
      },
    );
    return res.data;
  },

  async deleteShoppingCart(payload: { ids: number[] }, signal?: AbortSignal) {
    const { data } = await axiosInstance.delete(REQUEST_URL.DELETE_SHOPPING_CART, {
      data: payload,
      signal,
    });
    return data;
  },

  async deleteAllShoppingCart(payload: { ids: number[] }, signal?: AbortSignal) {
    const { data } = await axiosInstance.delete(REQUEST_URL.DELETE_ALL_SHOPPING_CART, {
      data: payload,
      signal,
    });
    return data;
  },

  async getProfile(signal?: AbortSignal) {
    const { data } = await axiosInstance.get(REQUEST_URL.PROFILE, { signal });
    return data.data;
  },

  async updateProfile(payload: UpdateUserData, signal?: AbortSignal) {
    const { data } = await axiosInstance.put(REQUEST_URL.PROFILE_UPDATE, payload, { signal });
    return data;
  },

  async getOrderProfile(params?: ItemFilter, signal?: AbortSignal) {
    const res = await axiosInstance.get<OrderProfileResponse>(REQUEST_URL.GET_ORDERS, {
      params,
      signal,
    });
    return res.data;
  },
};
