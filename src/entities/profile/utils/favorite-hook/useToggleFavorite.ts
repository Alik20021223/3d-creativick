import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAddToFavoriteCart } from '@entities/profile/hooks/addFavoriteCart';
import { FAVORITES_INDEX_KEY } from './useFavoritesIndex';

type ListItem = { uuid: string; [k: string]: unknown };
type ListPayload = { data?: ListItem[] };

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { mutateAsync: addOrToggleFavorite } = useAddToFavoriteCart();

  const toggle = useCallback(
    async (uuid: string, nextState: boolean) => {
      // 1) достаём текущие данные из кэша
      const key = FAVORITES_INDEX_KEY;
      const prev = queryClient.getQueryData<ListPayload>(key);

      // 2) оптимистично меняем кэш
      const currentList = prev?.data ?? [];
      const exists = currentList.some((x) => x.uuid === uuid);
      let optimistic: ListItem[];

      if (nextState) {
        // хотим ВКЛ → если не было, добавим
        optimistic = exists ? currentList : [{ uuid }, ...currentList];
      } else {
        // хотим ВЫКЛ → фильтруем
        optimistic = currentList.filter((x) => x.uuid !== uuid);
      }

      queryClient.setQueryData<ListPayload>(key, { data: optimistic });

      // 3) серверный вызов (toggle)
      try {
        await addOrToggleFavorite(uuid);
      } catch (e) {
        // 4) откатываемся при ошибке
        queryClient.setQueryData<ListPayload>(key, prev);
        throw e;
      }
    },
    [queryClient, addOrToggleFavorite],
  );

  return { toggle };
}
