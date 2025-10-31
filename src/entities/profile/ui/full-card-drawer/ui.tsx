'use client';
import { Button } from '@shadcn/button';
import { useEffect, useMemo } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { formatPrice, plural } from '@utils/constant';
import { useForm } from 'react-hook-form';
import CustomInput from '@feature/custom-input';
import CardItem from './card-item';
import { ShoppingCart } from '../../types/cart';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;

  items: ShoppingCart;
  currency?: string; // default: ₽

  onRemove?: (id: number) => void;
  onCheckout?: () => void;
  onGoToCart?: () => void;

  onApplyPromo: (promocode: string) => void;
};

export default function CartDrawer({
  open,
  onClose,
  items,
  currency = '₽',
  onRemove,
  onCheckout,
  onGoToCart,
  onApplyPromo,
}: CartDrawerProps) {
  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const {
    handleSubmit: PromocodeSubmit,
    control,
    getValues,
    // formState,
  } = useForm({
    defaultValues: { promocode: '' },
  });

  const oldTotal = useMemo(
    () =>
      items.user_carts[0].cartDetails.reduce(
        (s, it) => s + (typeof it.discount === 'number' ? it.price : it.price),
        0,
      ),
    [items],
  );

  const onSubmitPromocode = () => {
    const value = getValues('promocode');
    onApplyPromo(value);
  };

  return (
    <>
      <div className='flex h-full flex-col overflow-hidden px-6 py-5 md:px-8'>
        {/* Header */}
        <h2 className='text-dark-blue mb-4 text-[18px] font-semibold'>
          В корзине {items.user_carts[0].cartDetails.length} товар
          {plural(items.user_carts[0].cartDetails.length, ['', 'а', 'ов'])}
        </h2>

        {/* Items — занимает всё оставшееся место */}
        <ul className='min-h-0 flex-grow space-y-3 overflow-y-auto pr-1'>
          {items.user_carts[0].cartDetails.map((item) => (
            <CardItem key={item.id} item={item} currency={currency} onRemove={onRemove} />
          ))}
        </ul>

        {/* Footer — не скроллится */}
        <div className='shrink-0 pt-4'>
          <form onSubmit={PromocodeSubmit(onSubmitPromocode)} className='flex gap-2'>
            <div className='flex-1'>
              <CustomInput
                name='promocode'
                placeholder='Промокод'
                clearable
                disabled={true}
                control={control}
                rules={{ required: 'Введите промокод' }}
                className='flex h-14 flex-1 rounded-[40px] text-lg!'
              />
            </div>
            <Button
              // disabled={!formState.isValid}
              disabled={true}
              type='submit'
              variant='outline'
              className='flex h-[56px] w-[56px] items-center justify-center'
            >
              <ArrowRight />
            </Button>
          </form>

          <div className='mt-4 flex items-center justify-between'>
            <div className='text-secondary-text text-[22px] font-semibold'>Итого:</div>
            <div className='flex items-center gap-4 text-right'>
              {oldTotal > items.total_price ? (
                <div className='text-secondary-gray text-[14px] line-through'>
                  {formatPrice(oldTotal)} {currency}
                </div>
              ) : (
                <div className='h-[20px]' />
              )}
              <div className='text-secondary-text text-[22px] font-bold'>
                {formatPrice(items.total_price)} {currency}
              </div>
            </div>
          </div>

          <div className='mt-4 space-y-3'>
            <Button onClick={onCheckout} className='h-14 w-full rounded-full text-white'>
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
      </div>
    </>
  );
}
