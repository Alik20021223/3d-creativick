import { useState, useEffect, useMemo, useRef } from 'react';
import { DropdownMenuSeparator } from '@shadcn/dropdown-menu';
import CustomInput from '@feature/custom-input';
import { Button } from '@shared/shadcn/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import PriceList from '@shared/components/PriceList';
import { ShoppingCart } from '../../types/cart';
import { plural, formatPrice } from '@utils/constant';
import { useModalStore } from '@entities/modals/store';
import { useLocation, useNavigate } from 'react-router-dom';

// ⬇️ расчёт итогов через API / локально
import { useRequireAuth } from '@shared/hooks/useRequireAuth';
import { useAppStore } from '@/app/store';
import { useCheckCoupon } from '../../hooks/checkPromocode';
import { useCartTotals } from '../../hooks/useCartTotals';
import { useCalcProductAuth } from '../../hooks/calcProductAuth';
import { OrderCalculateResponse } from '../../types/order';
import { COUPON_ERROR_MESSAGES } from '@/utils/mock';

interface ShopCardPriceBlockProps {
  items: ShoppingCart | null;
  currency?: string; // по умолчанию "₽"
}

const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;
const DEFAULT_TYPE = 'delivery' as const;

const ShopCardPriceBlock = ({ items, currency = '₽' }: ShopCardPriceBlockProps) => {
  const {
    handleSubmit: PromocodeSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: { promocode: localStorage.getItem('last_used_coupon') || '' },
  });

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);

  const { openModal } = useModalStore();
  const { cartItems, isAuth } = useAppStore();
  const requireAuth = useRequireAuth();

  const user_id = cartItems?.user_carts?.[0]?.user_id || 0;
  const cart_id = cartItems?.user_carts?.[0]?.cart_id || 0;
  const detailsCount = items?.user_carts?.[0]?.cartDetails?.length ?? 0;

  // ⬇️ базовый расчёт (гость / общий калькулятор: fallback)
  const { count, price, discount, total, isFetching, isError } = useCartTotals({ items, isAuth });

  const [authTotals, setAuthTotals] = useState<OrderCalculateResponse | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const promocodeValue = useWatch({ control, name: 'promocode' });
  const { mutateAsync, isPending } = useCheckCoupon();
  const { mutateAsync: checkProductAuth, isPending: isCalcPending } = useCalcProductAuth();

  const lastCalcSignature = useRef<string | null>(null);
  const isCalculatingRef = useRef(false);

  useEffect(() => {
    // если не авторизован или корзина пустая/нет cart_id — чистим authTotals
    if (!isAuth || !cart_id || detailsCount === 0) {
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
    const signature = `${cart_id}:${detailsCount}:${coupon ?? ''}`;

    if (lastCalcSignature.current === signature) {
      return;
    }

    lastCalcSignature.current = signature;
    isCalculatingRef.current = true;

    (async () => {
      try {
        const res = await checkProductAuth({
          cart_id,
          currency_id: DEFAULT_CURRENCY_ID,
          shop_id: DEFAULT_SHOP_ID,
          type: DEFAULT_TYPE,
          coupon,
        });

        setAuthTotals(res);
      } catch (e) {
        console.error('calcProductAuth error (ShopCardPriceBlock)', e);
      } finally {
        isCalculatingRef.current = false;
      }
    })();
  }, [isAuth, cart_id, detailsCount, checkProductAuth]);

  const displaySubtotal = isAuth && authTotals ? authTotals.data.price : price;
  const displayDiscount = isAuth && authTotals ? authTotals.data.total_discount : discount;
  const displayTotal = isAuth && authTotals ? authTotals.data.total_price : total;
  const displayCoupon = isAuth && authTotals ? authTotals.data.coupon_price : null;
  const loyaltyDiscount = isAuth && authTotals ? authTotals.data.loyalty_discount ?? 0 : 0;
  const priceItems = useMemo(
    () =>
      [
        Number(displayDiscount) > 0 ? { label: 'Акции', price: displayDiscount as number } : null,
        Number(displayCoupon) > 0 ? { label: 'Промокод', price: displayCoupon as number } : null,
    loyaltyDiscount > 0 ? { label: 'Карта лояльности', price: loyaltyDiscount } : null,
      ].filter(Boolean) as { label: string; price: number }[],
    [displayDiscount, displayCoupon, loyaltyDiscount],
  );

  const hasAnyDiscount = priceItems.length > 0;

  const onSubmitPromocode = async () => {
    if (!isAuth) return;

    const coupon = (promocodeValue || '').trim();
    if (!coupon || !cart_id) return;

    try {
      // 1) проверка купона
      await mutateAsync({
        user_id,
        shop_id: DEFAULT_SHOP_ID,
        coupon,
      });

      localStorage.setItem('last_used_coupon', coupon);

      // 2) пересчёт корзины для авторизованных уже с купоном
      const res = await checkProductAuth({
        cart_id,
        currency_id: DEFAULT_CURRENCY_ID,
        coupon: localStorage.getItem('last_used_coupon') || undefined,
        shop_id: DEFAULT_SHOP_ID,
        type: DEFAULT_TYPE,
      });

      // перезаписываем суммы для UI
      setAuthTotals(res);
      // Обновляем сигнатуру после ручного обновления
      const newCoupon = localStorage.getItem('last_used_coupon') || undefined;
      lastCalcSignature.current = `${cart_id}:${detailsCount}:${newCoupon ?? ''}`;
    } catch (e: unknown) {
      console.error('check coupon / calcProductAuth error (CartDrawer)', e);

      const apiError = e as { response?: { data?: unknown }; data?: unknown };
      const backend = (apiError?.response?.data ?? apiError?.data ?? {}) as {
        statusCode?: string;
        message?: string;
      };
      const ruFromCode = backend.statusCode && COUPON_ERROR_MESSAGES[backend.statusCode as string];

      const fallbackMsg = backend.message || 'Не удалось применить промокод';

      setPromoError(ruFromCode ?? fallbackMsg);
    }
  };

  const createOrder = (id?: number) => {
    if (!count) return;

    if (!isAuth) {
      requireAuth({ type: 'checkout', payload: { cart_id: id } }, () => {
        openModal('order_form');

        if (id) params.set('cart_id', String(id));
        navigate(`${pathname}?${params.toString()}`);
      });
      return;
    }

    openModal('order_form');
    if (id) params.set('cart_id', String(id));
    navigate(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!promocodeValue) return;

    const upper = promocodeValue.toUpperCase();
    if (upper !== promocodeValue) {
      setValue('promocode', upper, { shouldDirty: true });
    }
  }, [promocodeValue, setValue]);

  useEffect(() => {
    if (!promoError) return;

    const id = setTimeout(() => {
      setPromoError(null);
    }, 5000);

    return () => clearTimeout(id);
  }, [promoError]);

  return (
    <div className='bg-secondary-white w-full rounded-[20px] p-2.5'>
      {/* Промокод */}
      <form onSubmit={PromocodeSubmit(onSubmitPromocode)} className='flex gap-2'>
        <div className='flex-1'>
          <CustomInput
            name='promocode'
            placeholder='Промокод'
            clearable
            control={control}
            rules={{ required: 'Введите промокод' }}
            className='flex h-14 flex-1 rounded-[40px] text-lg!'
            disabled={
              !isAuth ||
              isPending ||
              isCalcPending ||
              localStorage.getItem('last_used_coupon') === promocodeValue?.trim()
            }
          />
        </div>
        <Button
          type='submit'
          variant='outline'
          className='flex h-[56px] w-[56px] items-center justify-center'
          disabled={
            !isAuth ||
            isPending ||
            isCalcPending ||
            !promocodeValue?.trim() ||
            localStorage.getItem('last_used_coupon') === promocodeValue?.trim()
          }
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

      {/* Сводка */}
      <div className='my-4 px-[21px]'>
        <div className='mb-4 flex items-center justify-between text-[22px]'>
          <span className='leading-[110%] font-bold'>
            {count} товар{plural(count, ['', 'а', 'ов'])}
          </span>
          <span className='leading-[130%] font-normal'>
            {formatPrice(displaySubtotal)} <span className='text-sm'>{currency}</span>
          </span>
        </div>

        <DropdownMenuSeparator />

        <div className='mt-2'>
          <PriceList items={priceItems} currency={currency} className='space-y-2' />
          <div className='mt-2 text-xs text-slate-500'>
            {(isFetching || isCalcPending) && 'Пересчёт…'}
            {isError && 'Не удалось получить расчёт — показаны ориентировочные суммы'}
          </div>
        </div>
      </div>

      {/* Итого + переход */}
      <div className='rounded-[10px] bg-white p-5'>
        <div className='mb-6 space-y-2'>
          {hasAnyDiscount ? (
            <div className='text-dark-blue flex justify-between text-lg font-normal'>
              <span>Общая цена</span>
              <span className='line-through'>
                {formatPrice(displaySubtotal)} {currency}
              </span>
            </div>
          ) : (
            <div className='h-[26px]' />
          )}

          <div className='text-secondary-text flex justify-between text-[22px] leading-[110%] font-bold'>
            <span>Итого:</span>
            <span>
              {formatPrice(displayTotal)} {currency}
            </span>
          </div>
        </div>

        <Button
          type='button'
          onClick={() => createOrder(cart_id)}
          className='h-14 w-full text-[22px] text-white'
        >
          Перейти к оформлению <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ShopCardPriceBlock;
