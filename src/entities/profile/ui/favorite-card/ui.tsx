import { Button } from '@shadcn/button';
import { formatPrice } from '@utils/constant';
import { Image } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import ButtonSave from '@feature/button-save';
import { useMemo, useState } from 'react';
import type { FavoriteType } from '@entities/profile/types/favorite';
import { useAddToShoppingCart } from '@entities/profile/hooks/addToShoppingCart';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import { useAppStore } from '@app/store';
import { getDetailPathByVariant } from '@utils/product-variants';
import { useAddToFavoriteCart } from '../../hooks/addFavoriteCart';
import { CartDetail } from '../../types/cart';
import { calcOldPrice, calcPrice } from '@/utils/product-pricing';

type FavoriteItemProps = {
  data: FavoriteType;
  currency?: string; // default: ₽
  className?: string;
};

export default function FavoriteItem({ data, currency = '₽', className = '' }: FavoriteItemProps) {
  const [isSave, setSave] = useState(true);

  // корзина
  const { mutateAsync: addToCart, isPending: addLoading } = useAddToShoppingCart();
  const { mutateAsync: deleteCart, isPending: delLoading } = useDeleteShoppingCart();
  const { cartItems } = useAppStore();
  const cartDetails = useMemo(() => cartItems?.user_carts?.[0]?.cartDetails || [], [cartItems]);

  // избранное (лайк)
  const { mutateAsync: addFavorite, isPending: favLoading } = useAddToFavoriteCart();

  // витрина
  const title = data.translation?.title ?? `Товар #${data.id}`;
  const description = data.translation?.description ?? '';
  const imageUrl = data.img;

  // цены
  const price = useMemo(() => calcPrice(data ?? {}), [data]);
  const oldPrice = useMemo(() => calcOldPrice(data ?? {}, price), [data, price]);

  // первый вариант (как «быстрая покупка» с карточки избранного)
  const firstStock = data.stock_balances?.[0];
  const firstStockId = firstStock?.id;

  // ссылка на детали
  const href = useMemo(() => {
    return getDetailPathByVariant(data.uuid, firstStock?.color ?? null, firstStock?.size ?? null);
  }, [data.uuid, firstStock?.color, firstStock?.size]);

  // в корзине ли именно этот вариант?
  const isInCart = useMemo(() => {
    if (!firstStockId) return false;
    return cartDetails.some((cd: CartDetail) => cd?.stock?.id === firstStockId);
  }, [cartDetails, firstStockId]);

  // id записи корзины для удаления (по совпадению stock.id)
  const cartDetailIdToDelete = useMemo(() => {
    if (!firstStockId) return undefined;
    return cartDetails.find((cd: CartDetail) => cd?.stock?.id === firstStockId)?.id;
  }, [cartDetails, firstStockId]);

  const onAddToCart = async () => {
    if (!firstStockId) return;
    await addToCart({
      products: [{ stock_id: firstStockId, quantity: 1 }],
      currency_id: 1,
      shop_id: 1,
    });
  };

  const onRemoveFromCart = async () => {
    if (!cartDetailIdToDelete) return;
    await deleteCart({ ids: [cartDetailIdToDelete] });
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addFavorite(data.uuid);
      setSave((s) => !s);
    } catch (err) {
      console.error('favorite error', err);
    }
  };

  return (
    <article
      className={cn(
        'group bg-secondary-white relative flex h-fit w-full items-stretch gap-5 rounded-[28px] p-2.5 max-md:flex-col md:h-[190px] md:h-[360px] md:gap-6 md:p-5',
        className,
      )}
      role='article'
    >
      {/* Изображение */}
      <a
        href={href}
        className='relative aspect-square h-full flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white ring-offset-2 transition outline-none group-hover:border-slate-300 focus:ring-2 focus:ring-indigo-500 max-md:h-[150px] md:w-[320px]'
        aria-label={title}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className='h-full w-full object-cover object-center'
            loading='lazy'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <Image className='h-10 w-10 text-slate-400' />
          </div>
        )}
      </a>

      {/* Контент */}
      <div className='flex justify-between gap-6 max-md:items-start'>
        <div className='flex w-3/4 flex-col justify-center md:space-y-3'>
          <h3 className='text-secondary-text text-[22px] leading-tight font-semibold'>{title}</h3>
          {description ? (
            <p className='line-clamp-2 max-w-prose text-sm leading-relaxed text-slate-600 max-md:hidden'>
              {description}
            </p>
          ) : null}
          <a
            href={href}
            className='text-dark-blue inline-block text-sm font-medium underline-offset-4 hover:underline max-md:hidden'
          >
            Подробнее
          </a>
        </div>

        <div className='flex self-start'>
          <ButtonSave
            className='h-10 w-10 md:hidden'
            active
            onSave={handleToggleFavorite}
            status={isSave}
            disabled={favLoading}
          />
        </div>
      </div>

      <div className='flex min-w-[220px] flex-col items-end justify-end gap-3 max-md:hidden'>
        {typeof oldPrice === 'number' && oldPrice > price && (
          <div className='text-secondary-gray text-right text-[18px] leading-[130%] line-through'>
            {formatPrice(oldPrice)} {currency}
          </div>
        )}
        <div className='text-dark-blue text-right text-[32px] leading-[110%] font-bold'>
          {formatPrice(price)} {currency}
        </div>
      </div>

      <div className='flex items-center justify-between md:flex-col md:items-end'>
        <ButtonSave
          className='max-md:hidden md:h-12.5 md:w-12.5'
          active
          onSave={handleToggleFavorite}
          status={isSave}
          disabled={favLoading}
        />

        <div className='flex flex-col items-start justify-start md:hidden'>
          {typeof oldPrice === 'number' && oldPrice > price && (
            <div className='text-secondary-gray text-left text-[18px] leading-[130%] line-through'>
              {formatPrice(oldPrice)} {currency}
            </div>
          )}
          <div className='text-dark-blue text-left text-[24px] leading-[110%] font-bold'>
            {formatPrice(price)} {currency}
          </div>
        </div>

        <Button
          type='button'
          disabled={!firstStockId || addLoading || delLoading}
          onClick={isInCart ? onRemoveFromCart : onAddToCart}
          variant={isInCart ? 'destructive' : undefined}
          className={cn(
            'h-11 rounded-full px-8 text-base font-medium text-white disabled:opacity-60 md:px-14',
          )}
        >
          {isInCart ? 'Удалить из корзины' : 'В корзину'}
        </Button>
      </div>
    </article>
  );
}
