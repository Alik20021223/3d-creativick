import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

/**
 * Хук для повтора отмененного заказа
 * Создает новую корзину с товарами из старого заказа
 * @param onSuccess - Колбэк при успешном повторе заказа (получает данные корзины)
 * @param onError - Колбэк при ошибке
 */
export const useRepeatOrderFromCanceled = (
  onSuccess?: (cartData: { id: number }) => void,
  onError?: (error: unknown) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['repeat-order-from-canceled'],
    mutationFn: (orderId: string | number) => profileService.repeatOrder(orderId),
    onSuccess: (data) => {
      // Инвалидируем кеш корзины для обновления данных
      queryClient.invalidateQueries({
        queryKey: ['auth', 'get-shopping-cart'],
      });
      
      // Инвалидируем расчет заказа
      queryClient.invalidateQueries({
        queryKey: ['order', 'calculate'],
      });

      // Вызываем колбэк успеха с данными корзины
      if (data?.data?.id) {
        onSuccess?.({ id: data.data.id });
      }
    },
    onError: (error) => {
      console.error('Repeat order from canceled error:', error);
      onError?.(error);
    },
  });
};

