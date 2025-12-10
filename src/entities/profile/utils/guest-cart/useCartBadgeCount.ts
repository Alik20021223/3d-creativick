import { useMemo } from 'react';
import { useAppStore } from '@app/store';
import { useGuestCart } from './useGuestCart';

type Options = {
  /** Если true — считаем сумму quantity, иначе число позиций */
  sumQuantities?: boolean;
};

export function useCartBadgeCount(opts?: Options) {
  const sum = opts?.sumQuantities ?? false;

  const { isAuth, cartItemsCount, cartItems } = useAppStore();
  const { items: guestItems } = useGuestCart();

  return useMemo(() => {
    if (isAuth) {
      if (sum) {
        const details = cartItems?.user_carts?.[0]?.cartDetails ?? [];
        return details.reduce((acc, d) => acc + (d?.quantity ?? 1), 0);
      }
      // по умолчанию — количество позиций, как у тебя было
      return cartItemsCount ?? 0;
    }

    // гость
    if (sum) {
      return guestItems.reduce((acc, i) => acc + (i.quantity ?? 1), 0);
    }
    return guestItems.length;
  }, [isAuth, cartItemsCount, cartItems, guestItems, sum]);
}
