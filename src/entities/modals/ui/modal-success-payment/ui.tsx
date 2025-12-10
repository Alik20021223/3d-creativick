import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useGetOrderById } from '@/entities/profile/hooks/getOrderById';
import { OrderDetail } from '@/entities/profile/types/order';

interface ModalSuccessPaymentProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  /** локальный файл (если сразу отдаёшь с фронта) */
  file?: File;
  /** явный URL (если уже знаешь ссылку) */
  fileUrl?: string;
  /** коллбек для кнопки "К моим заказам" */
  onGoToOrders?: () => void;
}

const ModalSuccessPayment: React.FC<ModalSuccessPaymentProps> = ({
  open,
  setOpen,
  file,
  fileUrl,
  onGoToOrders,
}) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const orderId = searchParams.get('order_id');

  const { data: orderData } = useGetOrderById(orderId || '');

  const fileUrlFromOrder = useMemo(() => {
    if (!orderData) return undefined;

    // пример структуры — подправь под свою
    const details = orderData.details || [];

    // ищем первый digital-item
    const digital = details.find(
      (d: OrderDetail) =>
        d?.stock.product.private_manual ||
        d?.stock.product.public_manual ||
        d?.stock.product.model_assets_archive,
    );

    if (!digital) return undefined;

    return (digital.stock.product.private_manual ||
      digital.stock.product.public_manual ||
      digital.stock.product.model_assets_archive) as string | undefined;
  }, [orderData]);

  // итоговый URL для скачивания: приоритет — пропсы, потом orderData
  const effectiveFileUrl = fileUrl || fileUrlFromOrder;

  // есть ли вообще что скачивать
  const hasDigitalFile = Boolean(file || effectiveFileUrl);

  const email = 'info@3dkreativik.ru';

  const description: React.ReactNode = hasDigitalFile ? (
    <>
      Печатайте, учитесь, творите! Чтобы скачать серию, зайдите в личный кабинет, откройте раздел
      «Заказы» откройте заказ "{orderId}" и нажмите «Детали заказа». Если возникнут сложности — мы
      всегда готовы помочь, просто напишите нам на{' '}
      <a href={`mailto:${email}`} className='text-primary underline'>
        {email}
      </a>
      . Все ваши покупки вы можете отследить в личном кабинете.
    </>
  ) : (
    <>
      Ваш заказ обрабатывается, мы свяжемся с вами в ближайшее время. Если возникнут сложности,
      просто напишите нам на{' '}
      <a href={`mailto:${email}`} className='text-primary underline'>
        {email}
      </a>
      . Все ваши покупки вы можете отследить в личном кабинете.
    </>
  );

  return (
    <ModalLayout
      open={open}
      onOpenChange={setOpen}
      headerClassName='text-left'
      className='flex w-full max-w-fit items-end gap-10'
      successPay
      title='Успешная оплата'
      footer={
        <div className='flex w-full gap-3'>
          <Button onClick={onGoToOrders} className='h-full flex-1 text-white'>
            К моим заказам <ChevronRight className='ml-1 h-4 w-4' />
          </Button>
        </div>
      }
    >
      <div className='space-y-2'>
        <p className='text-secondary-text text-lg'>Поздравляем с покупкой!</p>
        <p className='text-secondary-text'>{description}</p>
      </div>
    </ModalLayout>
  );
};

export default ModalSuccessPayment;
