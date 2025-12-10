// src/shared/services/lkService.ts
import { axiosInstance } from '@shared/axios';
import { REQUEST_URL } from '../constant/request';
import {
  LkLoginPayload,
  VerifyCodeResponse,
  LkLoginResponse,
  AuthCheckResponse,
  RegisterFormPayload,
  RegisterResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from '../types';
import { PayOrderResponse, PayOrderResponseType } from '../types/order';

export const modalService = {
  async login(payload: LkLoginPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post<LkLoginResponse>(
      REQUEST_URL.LK_LOGIN, // добавь в свой REQUEST_URL
      payload,
      { signal },
    );
    return data;
  },

  async checkAuth(payload: LkLoginPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post<AuthCheckResponse>(REQUEST_URL.AUTH_CHECK, payload, {
      signal,
    });
    return data;
  },

  async createOrder(
    payload: CreateOrderRequest,
    signal?: AbortSignal,
  ): Promise<CreateOrderResponse> {
    const { data } = await axiosInstance.post<CreateOrderResponse>(
      REQUEST_URL.CREATE_ORDER,
      payload,
      { signal },
    );
    return data;
  },

  async PayOrder(payload: { order_id: number }, signal?: AbortSignal): Promise<PayOrderResponse> {
    const { data } = await axiosInstance.get<PayOrderResponseType>(REQUEST_URL.PAY_ORDER, {
      params: payload,
      signal,
    });
    return data.data; // <- ровно то, что ты хочешь вернуть
  },

  async verifyCode(code: string, signal?: AbortSignal) {
    const { data } = await axiosInstance.get<VerifyCodeResponse>(
      `${REQUEST_URL.AUTH_VERIFY}/${encodeURIComponent(code)}`,
      { signal },
    );
    return data;
  },

  async register(payload: RegisterFormPayload, signal?: AbortSignal) {
    const { data } = await axiosInstance.post<RegisterResponse>(
      REQUEST_URL.AUTH_REGISTER,
      payload,
      { signal },
    );
    return data;
  },
};
