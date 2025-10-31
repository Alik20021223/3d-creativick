import { DropdownMenuSeparator } from '@shadcn/dropdown-menu';
import CustomInput from '@feature/custom-input';
import { Button } from '@shared/shadcn/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import PriceList from '@shared/components/PriceList';
import { useMemo } from 'react';
import { ShoppingCart } from '../../types/cart';
import { plural } from '@utils/constant';

interface ShopCardPriceBlockProps {
  items: ShoppingCart | null;
}

const ShopCardPriceBlock = ({ items }: ShopCardPriceBlockProps) => {
  const {
    handleSubmit: PromocodeSubmit,
    control,
    getValues,
    // formState,
  } = useForm({
    defaultValues: { promocode: '' },
  });

  const onSubmitPromocode = () => {
    const value = getValues('promocode');
    console.log('Промокод:', value);
    // тут можно сделать API-запрос, валидацию и т.д.
  };

  const oldTotal = useMemo(
    () =>
      items?.user_carts[0].cartDetails.reduce(
        (s, it) => s + (typeof it.discount === 'number' ? it.discount : it.price),
        0,
      ),
    [items],
  );

  const priceWithoutDiscount = useMemo(
    () =>
      items?.user_carts[0].cartDetails.reduce(
        (s, it) => s + (typeof it.discount === 'number' ? it.price : it.price),
        0,
      ),
    [items],
  );

  return (
    <>
      <div className='bg-secondary-white w-full rounded-[20px] p-2.5'>
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
            disabled={true}
            type='submit'
            variant='outline'
            className='flex h-[56px] w-[56px] items-center justify-center'
          >
            <ArrowRight />
          </Button>
        </form>
        <div className='my-4 px-[21px]'>
          <div className='mb-4 flex items-center justify-between text-[22px]'>
            <span className='leading-[110%] font-bold'>
              {items?.user_carts[0].cartDetails.length} товар
              {plural(items?.user_carts[0].cartDetails.length || 0, ['', 'а', 'ов'])}
            </span>
            <span className='leading-[130%] font-normal'>
              {priceWithoutDiscount}
              <span className='text-sm'> ₽</span>
            </span>
          </div>
          <DropdownMenuSeparator />
          <div className='mt-2'>
            <PriceList
              items={[
                // { label: 'Промокод', price: 1423 },
                { label: 'Акции', price: oldTotal || 0 },
              ]}
              className='space-y-2'
            />
          </div>
        </div>
        <div className='rounded-[10px] bg-white p-5'>
          <div className='mb-6 space-y-2'>
            <div className='text-dark-blue flex justify-between text-lg font-normal'>
              <span className=''>Общая цена</span>
              <span>- {oldTotal} ₽</span>
            </div>
            <div className='text-secondary-text flex justify-between text-[22px] leading-[110%] font-bold'>
              <span className=''>Итого:</span>
              <span>{items?.total_price} ₽</span>
            </div>
          </div>
          <Button className='h-14 w-full text-[22px] text-white'>
            Перейти к оформлению <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShopCardPriceBlock;
