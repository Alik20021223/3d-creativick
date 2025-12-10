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

  confirm_delete_all_item: boolean;
  confirm_delete_item: boolean;
  confirm_delete_account: boolean;

  email_otp: boolean;
  change_email_form: boolean;
  change_email_success: boolean;

  success_payment: boolean;
  fail_payment: boolean;
  order_form: boolean;

  see_order: boolean;
  cancel_order: boolean;

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

      success_payment: false,
      fail_payment: false,
      order_form: false,

      confirm_delete_all_item: false,
      confirm_delete_account: false,
      confirm_delete_item: false,

      see_order: false,
      cancel_order: false,

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
          order_form: key === 'order_form',
          success_payment: key === 'success_payment',
          fail_payment: key === 'fail_payment',
          see_order: key === 'see_order',
          cancel_order: key === 'cancel_order',
          confirm_delete_all_item: key === 'confirm_delete_all_item',
          confirm_delete_account: key === 'confirm_delete_account',
          confirm_delete_item: key === 'confirm_delete_item',
        })),

      closeModal: (key) => set(() => ({ [key]: false })),

      closeAll: () => {
        // Принудительно восстанавливаем overflow при закрытии всех модалок
        if (typeof window !== 'undefined') {
          document.body.style.overflow = '';
        }
        set({
          auth_otp: false,
          success_auth_otp: false,
          register_otp: false,
          register_form: false,
          register_success: false,
          email_otp: false,
          change_email_form: false,
          change_email_success: false,
          success_payment: false,
          fail_payment: false,
          order_form: false,
          see_order: false,
          cancel_order: false,
          confirm_delete_all_item: false,
          confirm_delete_account: false,
          confirm_delete_item: false,
        });
      },
    }),
    { name: 'modal-store' },
  ),
);
