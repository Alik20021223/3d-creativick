import ShopCard from '@entities/profile/ui/shop-card';
import { useAppStore } from '@app/store';
import ShopCardPriceBlock from '@entities/profile/ui/shop-card-price-block';
import { Button } from '@shared/shadcn/button';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { plural } from '@utils/constant';
import { useDeleteAllShoppingCart } from '@entities/profile/hooks/deleteAllShoppingCarts';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';

import { useMemo, useState } from 'react';

import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';
import { mapGuestToShoppingCart } from '@entities/profile/utils/guest-cart/mapGuestToShoppingCart';
import { useModalStore } from '@/entities/modals/store';
import ModalConfirmDeleteAllItem from '@/entities/modals/ui/modal-confirm-delete-all-item/ui';
import ModalConfirmDeleteItem from '@/entities/modals/ui/modal-confirm-delete-item';

const ShoppingCartContent = () => {
  const { cartItems, isAuth, setCartItems } = useAppStore();
  const { mutateAsync: deleteAllCart } = useDeleteAllShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  const { confirm_delete_all_item, confirm_delete_item, openModal, closeModal } = useModalStore();

  // id позиции, которую хотим удалить (для модалки подтверждения)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  // title продукта, который хотим удалить (для модалки подтверждения)
  const [deleteItemTitle, setDeleteItemTitle] = useState<string>('');

  // гостевая корзина
  const guest = useGuestCart();

  // единый объект корзины (для отображения и для прайс-блока)
  const viewCart = useMemo(() => {
    if (isAuth && cartItems) return cartItems;
    return mapGuestToShoppingCart(guest.items);
  }, [isAuth, cartItems, guest.items]);

  const details = viewCart.user_carts?.[0]?.cartDetails ?? [];
  const count = details.length;

  // очистка всей корзины
  const handleDeleteAllCart = async () => {
    closeModal('confirm_delete_all_item');

    if (isAuth) {
      if (!cartItems) return;
      const id = cartItems.user_carts[0].cart_id;
      setCartItems(null);
      await deleteAllCart({ ids: [id] });
    } else {
      guest.clear();
    }
  };

  // реальное удаление строки (после подтверждения)
  const handleDeleteCart = async (id: number) => {
    if (isAuth) {
      await deleteCart({ ids: [id] });
      // дальше либо рефетчится через react-query,
      // либо можно руками обновить store, если нужно
    } else {
      // в гостевой корзине id === stock_id (см. mapGuestToShoppingCart)
      guest.removeByStockId(id);
    }
  };

  // открыть модалку подтверждения для конкретной позиции
  const handleAskDeleteItem = (id: number) => {
    const item = details.find((item) => item.id === id);
    const title = item?.stock?.product?.translation?.title ?? 'Товар';
    setDeleteItemId(id);
    setDeleteItemTitle(title);
    openModal('confirm_delete_item');
  };

  // подтвердили удаление в модалке
  const handleConfirmDeleteItem = async (id: number) => {
    await handleDeleteCart(id);
    closeModal('confirm_delete_item');
    setDeleteItemId(null);
    setDeleteItemTitle('');
  };

  return (
    <>
      <article className='flex flex-col px-2.5 py-10 md:px-10'>
        <div className='flex w-full justify-between max-md:flex-col'>
          <div className='max-md:mb-10 md:w-[70%]'>
            <h1 className='title-text max-md:text-center'>
              В корзине {count} товар{plural(count, ['', 'а', 'ов'])}
            </h1>
            <p className='description-text mt-[22px]'>
              Проверьте содержимое корзины, чтобы убедиться, что все нужные вам товары в ней, и
              смело приступайте к оформлению заказа!
            </p>
          </div>
          <Button
            variant='link'
            onClick={() => openModal('confirm_delete_all_item')}
            className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 w-[298px] border bg-white text-[22px] leading-[130%] max-md:w-full'
          >
            Очистить корзину
            <Trash2 />
          </Button>
        </div>

        <div className='mt-10 flex w-full gap-5 max-md:flex-col'>
          <div className='max-md:mb-10 md:w-[70%]'>
            <div className='flex flex-col gap-4'>
              {details.map((item) => (
                <ShopCard
                  key={item.id}
                  data={item}
                  // вместо прямого удаления — сначала спрашиваем подтверждение
                  onRemove={() => handleAskDeleteItem(item.id)}
                />
              ))}
            </div>
            <div className='mt-6 flex w-full justify-center py-3.5 md:justify-end'>
              <Link to='/#shop' className='text-primary text-[22px] leading-[130%] underline'>
                В магазин
              </Link>
            </div>
          </div>

          <div className='md:w-[calc(100%-70%)]'>
            <ShopCardPriceBlock items={viewCart} />
          </div>
        </div>
      </article>

      {/* Модалка "Очистить корзину" */}
      <ModalConfirmDeleteAllItem
        open={confirm_delete_all_item}
        setOpen={(v) =>
          v ? openModal('confirm_delete_all_item') : closeModal('confirm_delete_all_item')
        }
        onConfirm={handleDeleteAllCart}
      />

      {/* Модалка "Удалить товар" */}
      <ModalConfirmDeleteItem
        open={confirm_delete_item}
        id={deleteItemId ?? 0}
        title={deleteItemTitle}
        setOpen={(v) => {
          if (!v) {
            closeModal('confirm_delete_item');
            setDeleteItemId(null);
            setDeleteItemTitle('');
          } else {
            openModal('confirm_delete_item');
          }
        }}
        handleDeleteItem={handleConfirmDeleteItem}
      />
    </>
  );
};

export default ShoppingCartContent;
