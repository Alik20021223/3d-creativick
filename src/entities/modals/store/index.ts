'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ModalKey } from '../types';

type ModalState = {
  email: string;
  setEmail: (email: string) => void;
  /** открытые состояния */
  auth_otp: boolean;
  success_auth_otp: boolean;

  register_otp: boolean;
  register_form: boolean;
  register_success: boolean;

  email_otp: boolean;
  change_email_form: boolean;
  change_email_success: boolean;

  /** открыть конкретную модалку */
  openModal: (key: ModalKey) => void;

  /** закрыть конкретную модалку */
  closeModal: (key: ModalKey) => void;

  /** закрыть все */
  closeAll: () => void;
};

export const useModalStore = create<ModalState>()(
  devtools(
    (set) => ({
      email: '',
      setEmail: (email: string) => set({ email }),

      auth_otp: false,
      success_otp: false,

      register_form: false,
      register_otp: false,
      register_success: false,

      email_otp: false,
      change_email_form: false,
      change_email_success: false,

      openModal: (key) =>
        set(() => ({
          auth_otp: key === 'auth_otp',
          success_auth_otp: key === 'success_auth_otp',
          register_form: key === 'register_form',
          register_otp: key === 'register_otp',
          register_success: key === 'register_success',
          email_otp: key === 'email_otp',
          change_email_form: key === 'change_email_form',
          change_email_success: key === 'change_email_success',
        })),

      closeModal: (key) => set(() => ({ [key]: false })),

      closeAll: () =>
        set({
          auth_otp: false,
          success_auth_otp: false,
          register_otp: false,
          register_form: false,
          register_success: false,
          email_otp: false,
          change_email_form: false,
          change_email_success: false,
        }),
    }),
    { name: 'modal-store' },
  ),
);
