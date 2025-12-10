// src/shared/queryClient.ts
import { QueryClient, QueryCache } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, q) => {
      // лог/метрика по желанию
      console.warn('RQ error:', q.queryKey, err);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0, // не ретраить при ошибке
      refetchOnWindowFocus: false, // не рефетчить при фокусе
      refetchOnReconnect: false, // не рефетчить при восстановлении сети
      refetchOnMount: true, // не рефетчить при маунте, даже если stale
      staleTime: 5 * 60_00,
      gcTime: 30 * 60_000, // держать ошибку в кэше 30 минут (чтобы не перезапрашивать)
    },
    mutations: {
      retry: 0,
    },
  },
});
