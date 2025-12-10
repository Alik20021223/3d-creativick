import OrderCard from '@entities/profile/ui/order-card';
import { Button } from '@shared/shadcn/button';
import { ArrowDown, X } from 'lucide-react';
import { useGetAllOrders } from '@entities/profile/hooks/getAllOrders';
import { useEffect, useMemo, useState } from 'react';
import type { OrderCardItem } from '@entities/profile/types';
import { Order } from '@entities/profile/types/order';
import { mapOrderToCardItem } from '@/entities/profile/utils/mappers/mapOrderToCardItem';
import EmptyOrderContent from './empty-order-content';
import ModalSeeOrder from '@/entities/modals/ui/modal-see-order';
import ModalCancelOrder from '@/entities/modals/ui/modal-cancel-order';
import { useModalStore } from '@entities/modals/store';
import { useRepeatOrder } from '@/entities/profile/hooks/useRepeatOrder';
import { useRepeatOrderFromCanceled } from '@/entities/profile/hooks/useRepeatOrderFromCanceled';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '@feature/custom-select';
import { statusFilterOptions } from '@utils/mock';
import { sortOrderOptions } from '@utils/mock';

const PAGE = 1;

type SortOrder = 'newest' | 'oldest';
type StatusFilter = 'all' | 'progress' | 'paid' | 'canceled';

const OrderContent = () => {
  const [params, setParams] = useState({ page: PAGE, perPage: 5 });
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const { see_order, cancel_order, openModal, closeModal } = useModalStore();

  const [selectedOrderId, setSelectedOrderId] = useState<string>();
  const [selectedOrderCode, setSelectedOrderCode] = useState<string>();

  const { handleRepeatOrder } = useRepeatOrder();
  const navigate = useNavigate();

  const { mutateAsync: repeatOrderFromCanceled } = useRepeatOrderFromCanceled(
    () => {
      // Перенаправляем на страницу корзины после успешного повтора
      navigate('/shopping-cart');
    },
    (error) => {
      console.error('Failed to repeat order:', error);
      // Можно добавить уведомление об ошибке
    },
  );

  const { data, isLoading, refetch } = useGetAllOrders(params);

  const allItems: OrderCardItem[] = useMemo(() => {
    const list = (data?.data ?? []) as Order[];
    return list.map(mapOrderToCardItem);
  }, [data]);

  // Применяем фильтры
  const items: OrderCardItem[] = useMemo(() => {
    let filtered = [...allItems];

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Сортировка по дате
    filtered.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (sortOrder === 'newest') {
        return dateB - dateA; // Сначала новые (большая дата = новее)
      } else {
        return dateA - dateB; // Сначала старые (меньшая дата = старше)
      }
    });

    return filtered;
  }, [allItems, sortOrder, statusFilter]);

  // Сброс фильтров в дефолтное состояние
  const handleClearFilters = () => {
    setSortOrder('newest');
    setStatusFilter('all');
  };

  const totalOrders = data?.meta?.total ?? items.length;

  // показываем кнопку, пока показано меньше, чем есть всего
  const canLoadMore = items.length < totalOrders;

  const handleLoadMore = () => {
    setParams((prev) => ({
      ...prev,
      perPage: prev.perPage + 5,
    }));
  };

  // 🔥 рефетчим КОГДА params уже обновился
  useEffect(() => {
    refetch();
  }, [params, refetch]);

  const hasActiveFilters = sortOrder !== 'newest' || statusFilter !== 'all';

  return (
    <>
      <section className='space-y-10'>
        {/* Фильтры */}
        <div className='flex items-center gap-4 justify-between max-md:flex-col max-md:items-stretch'>
          {/* Фильтр сортировки */}
          <div className='flex items-center gap-4'>
            <CustomSelect
              classNameContent='bg-secondary-white'
              classNameTrigger='bg-secondary-white'
              options={sortOrderOptions}
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
              placeholder='Сортировка'
            />

            {/* Фильтр по статусу */}
            <CustomSelect
              classNameContent='bg-secondary-white'
              classNameTrigger='bg-secondary-white'
              options={statusFilterOptions}
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              placeholder='Статус заказа'
            />
          </div>

          {/* Кнопка очистки */}
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              variant='link'
              aria-label='Очистить фильтры'
              className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary border bg-white max-md:w-full'
            >
              <X className='mr-2 h-4 w-4' />
              Очистить
            </Button>
          )}
        </div>

        <div className='space-y-5'>
          {items.map((order) => (
            <OrderCard
              key={order.orderNumber}
              data={{
                ...order,
                onOpenModal: (id) => {
                  setSelectedOrderId(id);
                  openModal('see_order');
                },
                onPay: (id) => {
                  handleRepeatOrder(id);
                },
                onReorder: (id) => {
                  // Для отмененных заказов и возвратов используем новый функционал повтора
                  // который создает новую корзину с товарами из старого заказа
                  if (order.status === 'canceled' || order.status === 'refund') {
                    repeatOrderFromCanceled(id);
                  } else {
                    // Для других статусов (например, progress) используем старую логику оплаты
                    handleRepeatOrder(id);
                  }
                },
                onCancel: (id) => {
                  setSelectedOrderId(id);
                  setSelectedOrderCode(order.orderNumber);
                  openModal('cancel_order');
                },
              }}
            />
          ))}

          {!items.length && !isLoading && <EmptyOrderContent />}
        </div>

        {canLoadMore && (
          <div className='flex w-full justify-center'>
            <Button
              onClick={handleLoadMore}
              variant='link'
              className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 border bg-white text-[22px] leading-[130%] max-md:w-fit'
            >
              Показать ещё
              <ArrowDown />
            </Button>
          </div>
        )}
      </section>

      {items.length > 0 && (
        <>
          <ModalSeeOrder
            open={see_order}
            setOpen={() => closeModal('see_order')}
            order_id={selectedOrderId ?? ''}
          />
          <ModalCancelOrder
            open={cancel_order}
            setOpen={(v) => {
              if (!v) {
                closeModal('cancel_order');
                // Обновляем данные после закрытия модалки
                refetch();
              }
            }}
            orderId={selectedOrderId}
            code={selectedOrderCode}
          />
        </>
      )}
    </>
  );
};

export default OrderContent;
