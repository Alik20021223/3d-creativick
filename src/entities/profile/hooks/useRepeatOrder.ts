import { useCallback } from 'react';
import { usePayOrder } from '@/entities/modals/hooks/payOrder';

/**
 * Переиспользуемый хук для повторной оплаты заказа
 * @param orderId - ID заказа (может быть строкой или числом)
 * @param onSuccess - Колбэк при успешном получении ссылки на оплату
 * @param onError - Колбэк при ошибке
 */
export const useRepeatOrder = (
  orderId?: string | number,
  onSuccess?: (url: string) => void,
  onError?: (error: unknown) => void,
) => {
  const { mutateAsync: payAsync, isPending } = usePayOrder();

  const handleRepeatOrder = useCallback(
    async (id?: string | number) => {
      const targetId = id ?? orderId;

      if (!targetId) {
        console.warn('order_id отсутствует');
        return;
      }

      try {
        const resPay = await payAsync({ order_id: Number(targetId) });
        const directUrl = resPay?.data.url ?? null;

        if (directUrl) {
          if (onSuccess) {
            onSuccess(directUrl);
          } else {
            window.location.href = directUrl;
          }
          return;
        }

        const error = new Error('Не удалось получить ссылку на оплату');
        console.error(error.message, resPay);
        onError?.(error);
      } catch (err) {
        console.error('Repeat pay error:', err);
        onError?.(err);
      }
    },
    [payAsync, orderId, onSuccess, onError],
  );

  return {
    handleRepeatOrder,
    isPending,
  };
};
