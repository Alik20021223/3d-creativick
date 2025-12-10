import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import CustomInput from '@feature/custom-input';
import LabeledCheckbox from '@feature/custom-checkbox';
import CustomTextArea from '@feature/custom-textarea';
import { useModalStore } from '../../store';
import { OrderFormSchema, type OrderFormType } from './validation';
import { useCreateOrder } from '../../hooks/sendCreateOrder';
import { usePayOrder } from '../../hooks/payOrder';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { useSharedStore } from '@/shared/store';

interface ModalOrderFormProps {
  open: boolean;
}

const ModalOrderForm: React.FC<ModalOrderFormProps> = ({ open }) => {
  const { closeModal } = useModalStore();

  const { setCartItems } = useAppStore();

  const { appSettings } = useSharedStore();

  const userAgreementUrl =
    appSettings.find((s) => s.key === 'user_agreement')?.value ?? '/personal-data';

  const offerAgreementUrl = appSettings.find((s) => s.key === 'offer_agreement')?.value ?? '/offer';

  const [searchParams] = useSearchParams();
  const cartId = useMemo(() => {
    const v = searchParams.get('cart_id');
    const n = v ? Number(v) : NaN;
    return Number.isFinite(n) ? n : undefined;
  }, [searchParams]);

  const form = useForm<OrderFormType>({
    defaultValues: { phone: '', address: '', wish: '', consent: false },
    resolver: zodResolver(OrderFormSchema),
    mode: 'onChange',
  });

  // важно забрать isPending/isLoading, чтобы блокировать кнопку
  const { mutateAsync: createAsync, isPending: isCreating } = useCreateOrder();
  const { mutateAsync: payAsync, isPending: isPaying } = usePayOrder();

  const onSubmit = async (data: OrderFormType) => {
    if (!cartId) {
      console.warn('cart_id отсутствует в query');
      return;
    }

    try {
      const res = await createAsync({
        coupon: localStorage.getItem('last_used_coupon') || undefined,
        address: { address: data.address || '' },
        cart_id: cartId,
        shop_id: 1,
        note: data.wish,
        phone: data.phone,
        type: 'delivery',
      });

      localStorage.removeItem('last_used_coupon');

      const orderId = res?.data?.id;

      if (!orderId) {
        throw new Error('В ответе нет order.id');
      }

      const resPay = await payAsync({ order_id: orderId });

      const directUrl = resPay?.data.url ?? null;

      setCartItems(null);

      if (directUrl) {
        window.location.href = directUrl;
        // setTimeout(() => { window.location.href = directUrl }, 0);
        return;
      }

      console.error('Не удалось получить ссылку на оплату', { res, resPay });
    } catch (err) {
      console.error('Create/Pay order error:', err);
    } finally {
      form.reset();
      closeModal('order_form');
    }
  };

  const isValid = form.formState.isValid && !!form.watch('consent');
  const isBusy = isCreating || isPaying;

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('order_form')}
        title='Оформление заказа'
        headerClassName='text-left'
        className='max-w-2xl!'
        footer={
          <div className='w-full'>
            <Button
              type='button'
              disabled={!isValid || isBusy}
              onClick={form.handleSubmit(onSubmit)}
              className='h-14 w-full rounded-[40px] text-lg text-white'
            >
              {isBusy ? 'Обрабатываем…' : 'Оформить заказ'}
            </Button>
          </div>
        }
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-2'>
          <div className='flex flex-col'>
            <label className='mb-2 text-sm font-medium text-gray-700'>Ваш номер телефона</label>
            <CustomInput<OrderFormType>
              name='phone'
              type='tel'
              inputMode='tel'
              placeholder='+7 (000) 000-00-00'
              className='h-14 rounded-[40px]'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-2 text-sm font-medium text-gray-700'>Адрес доставки</label>
            <CustomInput<OrderFormType>
              name='address'
              placeholder='Город, улица, дом, номер квартиры'
              className='h-14 rounded-[40px]'
            />
          </div>

          <CustomTextArea<OrderFormType>
            name='wish'
            label='Пожелание к заказу'
            placeholder='Ваше пожелание'
            clearable
            className='focus:border-primary-active h-[80px] min-h-[80px] rounded-[12px] border border-gray-200 px-2 py-3'
          />

          <LabeledCheckbox
            id='consent'
            name='consent'
            checked={form.watch('consent')}
            onCheckedChange={(checked) =>
              form.setValue('consent', !!checked, { shouldValidate: true })
            }
            label={
              <>
                <div className='leading-4'>
                  Я ознакомлен(-на) с{' '}
                  <a
                    href={userAgreementUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    {' '}
                    Пользовательское соглашение{' '}
                  </a>{' '}
                  и даю согласие на обработку{' '}
                  <a
                    href={offerAgreementUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    {' '}
                    Обработку персональных данных{' '}
                  </a>
                </div>
              </>
            }
            error={form.formState.errors.consent?.message}
            className='data-[state=checked]:bg-primary-active'
          />
        </form>
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalOrderForm;
