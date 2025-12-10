// src/shared/services/lkService.ts
import { axiosInstance } from '@shared/axios';
import { REQUEST_URL } from '@entities/profile/constant/request';
import { UpdateUserData } from '@entities/profile/types';
import { AddToShoppingCartPayload } from '@entities/profile/hooks/addToShoppingCart';
import { ItemFilter } from '@entities/main/types';
import {
  OrderByIdResponse,
  OrderCalcResponse,
  OrderCalculateRequest,
  OrderCalculateResponse,
  OrderProfileResponse,
} from '@entities/profile/types/order';
import { FavoriteResponse } from '@entities/profile/types/favorite';
import { CheckCouponPayload } from '../hooks/checkPromocode';
import { CalcProductAuthPayload, RepeatOrderResponse } from '../types/cart';
import axios from 'axios';

export const profileService = {
  async addToCart(payload: AddToShoppingCartPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post(REQUEST_URL.ADD_SHOPPING_CART_ITEM, payload, {
      signal,
    });
    return data;
  },

  async checkCoupon(payload: CheckCouponPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post(REQUEST_URL.CHECK_COUPON, payload, {
      signal,
    });
    return data;
  },

  async calcProductAuth(
    payload: CalcProductAuthPayload,
    signal?: AbortSignal,
  ): Promise<OrderCalculateResponse> {
    const { cart_id, ...body } = payload;

    const { data } = await axiosInstance.post(`${REQUEST_URL.CALC_PRODUCT_AUTH}/${cart_id}`, body, {
      signal,
    });

    return data;
  },

  // async getShoppingCart(signal?: AbortSignal) {
  //   const { data } = await axiosInstance.get(REQUEST_URL.GET_SHOPPING_CART, { signal });
  //   return data.data;
  // },

  async getShoppingCart(signal?: AbortSignal) {
    try {
      const { data } = await axiosInstance.get(REQUEST_URL.GET_SHOPPING_CART, { signal });
      // здесь data — обёртка { status, statusCode, data }
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        // ⬇️ ТА САМАЯ СИТУАЦИЯ: корзина не найдена = пустая
        if (data?.statusCode === 'ERROR_404') {
          return data; // normalizeCartResponse сам сделает EMPTY_CART
        }
      }
      throw err;
    }
  },

  async getStatusOrder(id: string, signal?: AbortSignal) {
    const { data } = await axiosInstance.get(`${REQUEST_URL.PAYMENT_STATUS}${id}`, { signal });
    return data.data;
  },

  async getFavorites(params?: ItemFilter, signal?: AbortSignal) {
    const res = await axiosInstance.get<FavoriteResponse>(REQUEST_URL.GET_FAVORITES, {
      params,
      signal,
    });
    return res.data;
  },

  async getCalcProduct(params?: OrderCalculateRequest, signal?: AbortSignal) {
    const res = await axiosInstance.get<OrderCalcResponse>(REQUEST_URL.CALC_PRODUCT, {
      params,
      signal,
    });
    return res.data.data;
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

  async deleteAccount(signal?: AbortSignal) {
    const { data } = await axiosInstance.delete(REQUEST_URL.DELETE_ACCOUNT, { signal });
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

  async getOrderById(id: string, signal?: AbortSignal) {
    const res = await axiosInstance.get<OrderByIdResponse>(`${REQUEST_URL.GET_ORDER_BY_ID}/${id}`, {
      signal,
    });
    return res.data.data;
  },

  async cancelOrder(id: string, signal?: AbortSignal) {
    const res = await axiosInstance.post(
      `${REQUEST_URL.CANCEL_ORDER}/${id}/status/change`,
      { status: 'canceled' },
      { signal },
    );
    return res.data;
  },

  async repeatOrder(id: string | number, signal?: AbortSignal): Promise<RepeatOrderResponse> {
    const res = await axiosInstance.post<RepeatOrderResponse>(
      `${REQUEST_URL.REPEAT_ORDER}/${id}/repeat`,
      {},
      { signal },
    );
    return res.data;
  },
};
