import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useGetOrderById } from '@/entities/profile/hooks/getOrderById';
import { OrderDetail } from '@/entities/profile/types/order';
import { LoadingSpinner } from '@shared/components/loading-spinner';

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

  const { data: orderData, isLoading: isLoadingOrder } = useGetOrderById(orderId || '');

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

  console.log('fileUrlFromOrder', fileUrlFromOrder);
  console.log('fileUrl', fileUrl);
  

  // итоговый URL для скачивания: приоритет — пропсы, потом orderData
  const effectiveFileUrl = fileUrl || fileUrlFromOrder;

  // есть ли вообще что скачивать
  // Важно: если есть явные пропсы (file/fileUrl), используем их сразу
  // Если их нет, ждем завершения загрузки данных заказа, чтобы правильно определить тип контента
  const hasExplicitFile = Boolean(file || fileUrl);
  const hasDigitalFile = useMemo(() => {
    // Если есть явные пропсы, используем их сразу
    if (hasExplicitFile) {
      return true;
    }
    
    // Если нет явных пропсов, ждем загрузки данных
    // Не делаем вывод до завершения загрузки
    if (isLoadingOrder) {
      return false; // Временно false, обновится после загрузки
    }
    
    // После загрузки проверяем данные из заказа
    return Boolean(effectiveFileUrl);
  }, [hasExplicitFile, isLoadingOrder, effectiveFileUrl]);

  console.log('hasDigitalFile', hasDigitalFile);
  console.log('isLoadingOrder', isLoadingOrder);
  console.log('hasExplicitFile', hasExplicitFile);

  const email = 'info@3dkreativik.ru';

  const description: React.ReactNode = useMemo(() => {
    // Пока идет загрузка и нет явных пропсов, ждем завершения загрузки
    // чтобы показать правильное описание
    if (!hasExplicitFile && isLoadingOrder) {
      return null; // Не показываем описание до загрузки данных
    }

    return hasDigitalFile ? (
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
      Благодарим за обращение!
      <br />
      Ваш заказ принят и будет отправлен после новогодних каникул - 12 января.
      <br />
      Желаем волшебных праздников и вдохновения для создания 3D-шедевров в Новом Году!
      <br />
      <br />
      Спасибо, что Вы с нами!
      <br />
      С уважением, команда «3D Креативик».
      <br />
      Если возникнут вопросы, просто напишите нам на{' '}
      <a href={`mailto:${email}`} className='text-primary underline'>
        {email}
      </a>
      .
    </>
  );
  }, [hasExplicitFile, isLoadingOrder, hasDigitalFile, orderId, email]);

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
        {!hasExplicitFile && isLoadingOrder ? (
          <div className='flex items-center gap-3 py-2'>
            <LoadingSpinner size='sm' variant='dots' />
            <p className='text-secondary-text'>Загрузка информации о заказе...</p>
          </div>
        ) : (
          description && <p className='text-secondary-text'>{description}</p>
        )}
      </div>
    </ModalLayout>
  );
};

export default ModalSuccessPayment;
