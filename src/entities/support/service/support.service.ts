import { axiosInstance } from '@/shared/axios';
import { AppSettingsResponse, FaqResponse, FaqResponseById, SendContactForm } from '../types';
import { REQUEST_URL } from '../constant/request';

export const supportService = {
  async SendForm(payload: SendContactForm, signal?: AbortSignal) {
    const { data } = await axiosInstance.post(REQUEST_URL.SEND_CONTACT_FORM, payload, {
      signal,
    });
    return data;
  },

  async getAllFaq(
    params?: {
      page_category_id?: number;
    },
    signal?: AbortSignal,
  ) {
    const res = await axiosInstance.get<FaqResponse>(REQUEST_URL.FAQ, {
      params,
      signal,
    });
    return res.data.data;
  },

  async getFaqById(id: number, signal?: AbortSignal) {
    const res = await axiosInstance.get<FaqResponseById>(
      REQUEST_URL.FAQ_BY_ID.replace(':id', String(id)),
      {
        signal,
      },
    );
    return res.data.data;
  },

  async getAllFilesFooter(signal?: AbortSignal) {
    const res = await axiosInstance.get<AppSettingsResponse>(REQUEST_URL.GET_FILES_FOOTER, {
      signal,
    });
    return res.data.data;
  },
};
