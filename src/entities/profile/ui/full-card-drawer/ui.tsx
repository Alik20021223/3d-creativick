'use client';
import { Button } from '@shadcn/button';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { formatPrice, plural } from '@utils/constant';
import { useForm } from 'react-hook-form';
import CustomInput from '@feature/custom-input';
import CardItem from './card-item';
import { ShoppingCart } from '../../types/cart';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModalStore } from '@entities/modals/store';
import { useRequireAuth } from '@shared/hooks/useRequireAuth';
import { useAppStore } from '@/app/store';
import PriceList from '@shared/components/PriceList';

import { useCheckCoupon } from '../../hooks/checkPromocode';
import { useCalcProductAuth } from '../../hooks/calcProductAuth';
import { OrderCalculateResponse } from '../../types/order';
import { COUPON_ERROR_MESSAGES } from '@/utils/mock';

import { useCartTotals } from '@entities/profile/hooks/useCartTotals';
import { LoadingSpinner } from '@shared/components/loading-spinner';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;

  items: ShoppingCart;
  currency?: string;

  onRemove?: (id: number) => void;
  onGoToCart?: () => void;

  onApplyPromo: (promocode: string) => void;

  calcShopId?: number;
  calcCurrencyId?: number;
  calcType?: 'pickup' | 'delivery' | string;
  
  isDeleting?: boolean;
};

const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;
const DEFAULT_TYPE = 'pickup' as const;

export default function CartDrawer({
  open,
  onClose,
  items,
  currency = '₽',
  onRemove,
  onGoToCart,
  onApplyPromo,
  calcShopId = DEFAULT_SHOP_ID,
  calcCurrencyId = DEFAULT_CURRENCY_ID,
  calcType = DEFAULT_TYPE,
  isDeleting = false,
}: CartDrawerProps) {
  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const { openModal } = useModalStore();
  const { isAuth, closeAll, cartItems } = useAppStore();
  const requireAuth = useRequireAuth();

  const user_id = cartItems?.user_carts?.[0]?.user_id || 0;
  const cart_id = cartItems?.user_carts?.[0]?.cart_id || 0;

  /** ------------------------------
   *      PROMOCODE FORM
   * ------------------------------ */
  const {
    handleSubmit: PromocodeSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: { promocode: localStorage.getItem('last_used_coupon') || '' },
    mode: 'onChange',
  });

  const promocodeValue = watch('promocode');

  const { mutateAsync: checkCoupon, isPending: isCouponPending } = useCheckCoupon();
  const { mutateAsync: checkProductAuth, isPending: isCalcPending } = useCalcProductAuth();

  // Сохраняем ссылку на функцию для стабильности
  const checkProductAuthRef = useRef(checkProductAuth);
  useEffect(() => {
    checkProductAuthRef.current = checkProductAuth;
  }, [checkProductAuth]);

  const [authTotals, setAuthTotals] = useState<OrderCalculateResponse | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  /** ------------------------------
   *      BASE TOTALS FROM CART
   *      (Гости + авториз. без купона)
   * ------------------------------ */
  const {
    details,
    count,
    price: subtotalBase,
    total: totalBase,
    discount: discountBase,
    isFetching,
    isError,
  } = useCartTotals({ items, isAuth });

  /** ------------------------------
   *      APPLY AUTH TOTALS IF EXIST
   * ------------------------------ */
  const subtotal = isAuth && authTotals ? authTotals.data.price : subtotalBase;
  const total = isAuth && authTotals ? authTotals.data.total_price : totalBase;
  const discount = isAuth && authTotals ? authTotals.data.total_discount : discountBase;
  const couponDiscount = isAuth && authTotals ? authTotals.data.coupon_price ?? 0 : 0;
  const loyaltyDiscount = isAuth && authTotals ? authTotals.data.loyalty_discount ?? 0 : 0;
  const promoDiscount = typeof discount === 'number' ? discount : 0;
  const discountItems = useMemo(
    () =>
      [
    promoDiscount > 0 ? { label: 'Акции', price: promoDiscount } : null,
    couponDiscount > 0 ? { label: 'Промокод', price: couponDiscount } : null,
    loyaltyDiscount > 0 ? { label: 'Карта лояльности', price: loyaltyDiscount } : null,
      ].filter(Boolean) as { label: string; price: number }[],
    [promoDiscount, couponDiscount, loyaltyDiscount],
  );
  const hasDiscounts = discountItems.length > 0;

  /** ------------------------------
   *      INITIAL AUTH CALC
   * ------------------------------ */
  const lastCalcSignature = useRef<string | null>(null);
  const isCalculatingRef = useRef(false);
  const detailsLength = details.length;

  useEffect(() => {
    if (!isAuth || !cart_id || !detailsLength) {
      setAuthTotals(null);
      lastCalcSignature.current = null;
      isCalculatingRef.current = false;
      return;
    }

    // Предотвращаем параллельные запросы
    if (isCalculatingRef.current) {
      return;
    }

    const coupon = localStorage.getItem('last_used_coupon') || undefined;
    const signature = `${cart_id}:${detailsLength}:${coupon ?? ''}:${calcShopId}:${
      calcCurrencyId
    }:${calcType}`;

    if (lastCalcSignature.current === signature) {
      return;
    }

    lastCalcSignature.current = signature;
    isCalculatingRef.current = true;

    (async () => {
      try {
        const res = await checkProductAuthRef.current({
          coupon,
          cart_id,
          currency_id: calcCurrencyId ?? DEFAULT_CURRENCY_ID,
          shop_id: calcShopId ?? DEFAULT_SHOP_ID,
          type: calcType === 'pickup' || calcType === 'delivery' ? calcType : DEFAULT_TYPE,
        });

        setAuthTotals(res);
      } catch (e) {
        console.error('initial calcProductAuth error (CartDrawer)', e);
      } finally {
        isCalculatingRef.current = false;
      }
    })();
  }, [
    isAuth,
    cart_id,
    detailsLength,
    calcShopId,
    calcCurrencyId,
    calcType,
  ]);

  /** ------------------------------
   *      PROMOCODE SUBMIT
   * ------------------------------ */
  const onSubmitPromocode = async () => {
    if (!isAuth) return;

    const coupon = (promocodeValue || '').trim();
    if (!coupon || !cart_id) return;

    try {
      setPromoError(null);

      await checkCoupon({
        user_id,
        shop_id: calcShopId ?? DEFAULT_SHOP_ID,
        coupon,
      });

      localStorage.setItem('last_used_coupon', coupon);

      const calcRes = await checkProductAuth({
        cart_id,
        currency_id: calcCurrencyId ?? DEFAULT_CURRENCY_ID,
        coupon: localStorage.getItem('last_used_coupon') || undefined,
        shop_id: calcShopId ?? DEFAULT_SHOP_ID,
        type: calcType === 'pickup' || calcType === 'delivery' ? calcType : DEFAULT_TYPE,
      });

      setAuthTotals(calcRes);
      // Обновляем сигнатуру после ручного обновления
      const newCoupon = localStorage.getItem('last_used_coupon') || undefined;
      lastCalcSignature.current = `${cart_id}:${detailsLength}:${newCoupon ?? ''}:${calcShopId}:${calcCurrencyId}:${calcType}`;

      onApplyPromo(coupon);
    } catch (e: unknown) {
      console.error('check coupon / calcProductAuth error', e);

      const apiError = e as { response?: { data?: unknown }; data?: unknown };
      const backend = (apiError?.response?.data ?? apiError?.data ?? {}) as {
        statusCode?: string;
        message?: string;
      };

      const ruFromCode = backend.statusCode && COUPON_ERROR_MESSAGES[backend.statusCode];
      const fallbackMsg = backend.message || 'Не удалось применить промокод';

      setPromoError(ruFromCode ?? fallbackMsg);
    }
  };

  /** ------------------------------
   *      CREATE ORDER
   * ------------------------------ */
  const createOrder = (id?: number) => {
    if (!count) return;

    const proceed = () => {
      closeAll();
      openModal('order_form');
      const params = new URLSearchParams(search);
      if (id) params.set('cart_id', String(id));
      navigate(`${pathname}?${params.toString()}`);
    };

    if (!isAuth) {
      requireAuth({ type: 'checkout', payload: { cart_id: id } }, proceed);
      return;
    }

    proceed();
  };

  /** ------------------------------
   *      UI HELPERS
   * ------------------------------ */
  const lastUsedCoupon = (
    typeof window !== 'undefined' ? localStorage.getItem('last_used_coupon') : ''
  )?.trim();
  const isSameCoupon =
    lastUsedCoupon && lastUsedCoupon === (promocodeValue || '').trim();

  useEffect(() => {
    if (!promoError) return;

    const id = setTimeout(() => setPromoError(null), 5000);
    return () => clearTimeout(id);
  }, [promoError]);

  useEffect(() => {
    if (!promocodeValue) return;

    const upper = promocodeValue.toUpperCase();
    if (upper !== promocodeValue) {
      setValue('promocode', upper, { shouldDirty: true });
    }
  }, [promocodeValue, setValue]);

  /** ------------------------------
   *             UI
   * ------------------------------ */
  return (
    <div className='relative flex h-full flex-col overflow-hidden px-6 py-5 md:px-8'>
      {/* Контент корзины */}
      <div className={`h-full flex flex-col ${isDeleting ? 'pointer-events-none opacity-50' : ''}`}>
      <h2 className='text-dark-blue mb-4 text-[18px] font-semibold'>
        В корзине {details.length} товар{plural(details.length, ['', 'а', 'ов'])}
      </h2>

      <ul className='min-h-0 flex-grow space-y-3 overflow-y-auto pr-1'>
        {details.map((item) => (
          <CardItem key={item.id} item={item} currency={currency} onRemove={onRemove} />
        ))}
      </ul>

      <div className='shrink-0 pt-4'>
        {/* PROMOCODE */}
        <form onSubmit={PromocodeSubmit(onSubmitPromocode)} className='flex gap-2'>
          <div className='flex-1'>
            <CustomInput
              name='promocode'
              placeholder='Промокод'
              clearable
              control={control}
              className='flex h-14 flex-1 rounded-[40px] text-lg!'
              disabled={isDeleting || !isAuth || isCouponPending || isCalcPending || !!isSameCoupon}
            />
          </div>
          <Button
            type='submit'
            variant='outline'
            className='flex h-[56px] w-[56px] items-center justify-center'
            disabled={!isAuth || isCouponPending || isCalcPending || !!isSameCoupon}
          >
            <ArrowRight />
          </Button>
        </form>

        {promoError && <p className='mt-1 px-1 text-xs text-red-500'>{promoError}</p>}

        {!isAuth && (
          <p className='mt-1 px-1 text-xs text-slate-500'>
            Чтобы использовать промокод, войдите в аккаунт.
          </p>
        )}

        {discountItems.length > 0 && (
          <div className='mt-4'>
            <PriceList items={discountItems} currency={currency} className='space-y-1 text-base' />
          </div>
        )}

        {/* TOTALS */}
        <div className='mt-4 flex items-center justify-between'>
          <div className='text-secondary-text text-[22px] font-semibold'>
            Итого:
            {(isFetching || isCalcPending) && (
              <span className='ml-2 text-[13px] font-normal text-gray-500'>(считаем…)</span>
            )}
            {isError && (
              <span className='ml-2 text-[13px] font-normal text-red-600'>(нет связи)</span>
            )}
          </div>

          <div className='flex items-center gap-4 text-right'>
            {hasDiscounts ? (
              <div className='text-secondary-gray text-[14px] line-through'>
                {formatPrice(subtotal)} {currency}
              </div>
            ) : (
              <div className='h-[20px]' />
            )}

            <div className='text-secondary-text text-[22px] font-bold'>
              {formatPrice(total)} {currency}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className='mt-4 space-y-3'>
          <Button
            onClick={() => createOrder(items?.user_carts?.[0]?.cart_id)}
            disabled={isDeleting || isFetching || isCalcPending}
            className='h-14 w-full rounded-full text-white'
          >
            Оформить заказ
          </Button>
          <Button
            variant='outline'
            onClick={onGoToCart}
            className='h-14 w-full rounded-full border-2'
          >
            <span className='flex items-center gap-1'>
              Перейти в корзину <ChevronRight className='h-5 w-5' />
            </span>
          </Button>
        </div>
      </div>
      
      {/* Overlay с затемнением и спиннером при удалении - исключаем область кнопки закрытия (верхний правый угол ~70px) */}
      {isDeleting && (
        <div 
          className='absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-[40px]'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex flex-col items-center gap-4'>
            <LoadingSpinner size='lg' variant='spinner' />
            <p className='text-white text-sm font-medium'>Удаление...</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}