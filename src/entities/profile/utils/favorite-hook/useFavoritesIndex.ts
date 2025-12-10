import { useMemo } from 'react';
import { useGetAllFavorite } from '@entities/profile/hooks/getAllFavorite';
import { useAppStore } from '@app/store';

export const FAVORITES_INDEX_KEY = ['favorites', 'index'];

export function useFavoritesIndex() {
  const { isAuth } = useAppStore();

  const params = { perPage: 100, page: 1 };

  const { data, isLoading, refetch } = useGetAllFavorite(params);

  const list = useMemo(() => data?.data ?? [], [data]);
  const ids = useMemo(() => new Set<string>(list.map((i: { uuid: string }) => i.uuid)), [list]);

  return { isAuth, list, ids, isLoading, refetch };
}
