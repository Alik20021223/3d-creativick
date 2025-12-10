// useCartTotals.ts
import { useMemo } from 'react';
import { useCalculateOrderProducts } from './getCalculateProduct';
import { ShoppingCart } from '../types/cart';

const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;
const DEFAULT_TYPE = 'pickup' as const;

type Params = {
  items: ShoppingCart | null;
  isAuth: boolean;
};

export function useCartTotals({ items, isAuth }: Params) {
  const details = useMemo(
    () => items?.user_carts?.[0]?.cartDetails ?? [],
    [items],
  );

  const products = useMemo(
    () =>
      details
        .map((it) => ({
          stock_id: it?.stock?.id as number,
          quantity: it?.quantity ?? 1,
        }))
        .filter(
          (p) => typeof p.stock_id === 'number' && p.stock_id > 0,
        ),
    [details],
  );

  /** ============================
   * FALLBACK LOGIC (НЕавторизован)
   * ============================ */

  const fallbackSubtotal = useMemo(() => {
    return details.reduce((sum, it) => {
      return sum + (it.price ?? 0);
    }, 0);
  }, [details]);

  const fallbackTotal = useMemo(() => {
    return details.reduce((sum, it) => {
      const basePrice = it.price ?? 0;
      const discount = it.discount;

      if (!discount) {
        return sum + basePrice;
      }

      const discountType = discount.type ?? 'fix';
      let discountValue = 0;

      if (discountType === 'fix') {
        discountValue = discount.price;
      } else if (discountType === 'percent') {
        discountValue = (basePrice * discount.price) / 100;
      }

      const finalPrice = Math.max(basePrice - discountValue, 0);

      return sum + finalPrice;
    }, 0);
  }, [details]);

  const fallbackDiscount = useMemo(() => {
    return Math.max(0, fallbackSubtotal - fallbackTotal);
  }, [fallbackSubtotal, fallbackTotal]);

  /** ============================
   *   API LOGIC (АВТОРИЗОВАН)
   * ============================ */

  const {
    data: calc,
    isFetching,
    isError,
  } = useCalculateOrderProducts(
    isAuth && products.length
      ? {
          shop_id: DEFAULT_SHOP_ID,
          currency_id: DEFAULT_CURRENCY_ID,
          type: DEFAULT_TYPE,
          products,
        }
      : undefined,
    {
      enabled: !isAuth,
    },
  );

  const useApi = isAuth && !!calc;

  const price = useApi && typeof calc?.price === 'number'
    ? calc.price
    : fallbackSubtotal;

  const discount =
    useApi && typeof calc?.total_discount === 'number'
      ? calc.total_discount
      : fallbackDiscount;

  const total =
    useApi && typeof calc?.total_price === 'number'
      ? calc.total_price
      : fallbackTotal;

  return {
    details,
    count: details.length,
    price,
    discount,
    total,
    isFetching: useApi && isFetching,
    isError: useApi && isError,
  };
}