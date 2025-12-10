import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../service/profile.service';

/**
 * Хук для отмены заказа
 * @param onSuccess - Колбэк при успешной отмене заказа
 * @param onError - Колбэк при ошибке
 */
export const useCancelOrder = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cancel-order'],
    mutationFn: (id: string) => profileService.cancelOrder(id),
    onSuccess: () => {
      // Инвалидируем запрос заказов для обновления списка
      queryClient.invalidateQueries({
        queryKey: ['auth', 'get-all-orders'],
        exact: false, // Инвалидируем все варианты запроса независимо от params
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Cancel order error:', error);
      onError?.(error);
    },
  });
};

