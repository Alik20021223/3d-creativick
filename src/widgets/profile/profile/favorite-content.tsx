import FavoriteItem from '@entities/profile/ui/favorite-card';
import { Button } from '@shared/shadcn/button';
import { ArrowDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { FavoriteType } from '@entities/profile/types/favorite';
import { useGetAllFavorite } from '@/entities/profile/hooks/getAllFavorite';
import EmptyFavoriteContent from './empty-favorite-content';

const PAGE = 5;

const FavoriteContent = () => {
  const [limit, setLimit] = useState(PAGE);

  const params = {
    perPage: limit,
    page: 1,
  };

  const { data, isLoading } = useGetAllFavorite(params);
  const all: FavoriteType[] = useMemo(() => data?.data ?? data?.data ?? [], [data]);

  const pageItems = all.slice(0, limit);
  const canLoadMore = limit < all.length;

  if (!all.length && !isLoading) {
    return <EmptyFavoriteContent />;
  }

  return (
    <section className='space-y-10'>
      <div className='space-y-5'>
        {pageItems
          .filter((favorite) => favorite.active)
          .map((favorite) => (
            <FavoriteItem key={favorite.uuid} data={favorite} />
          ))}
      </div>

      {canLoadMore && (
        <div className='flex w-full justify-center'>
          <Button
            variant='link'
            onClick={() => setLimit((v) => v + PAGE)}
            className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 border bg-white text-[22px] leading-[130%] max-md:w-full'
          >
            Показать еще
            <ArrowDown />
          </Button>
        </div>
      )}
    </section>
  );
};

export default FavoriteContent;
