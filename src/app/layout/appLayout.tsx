// src/app/layout/AppLayout.tsx
import { headerMock } from '@utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@lib/utils';
import CartDrawerLayout from '@feature/card-drawer/ui';
import EmptyCardDrawer from '@entities/profile/ui/empty-card-drawer';
import CartDrawer from '@entities/profile/ui/full-card-drawer';
import FloatingButtons from '@feature/floatingButton';
import ModalLkForm from '@entities/modals/ui/modal-lk-form';
import AuthContent from '@widgets/modals/auth-content';
import RegisterContent from '@widgets/modals/register-content';
import { useGetShoppingCart } from '@entities/profile/hooks/getShoppingCart';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import ModalOrderForm from '@entities/modals/ui/modal-create-order';
import { useModalStore } from '@entities/modals/store';

import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';
import { mapGuestToShoppingCart } from '@entities/profile/utils/guest-cart/mapGuestToShoppingCart';
import { useAddToShoppingCart } from '@/entities/profile/hooks/addToShoppingCart';
import { useMergeGuestCartOnLogin } from '@/entities/profile/utils/guest-cart/useMergeGuestCartOnLogin';

type MenuKind = 'main' | 'shop';

type AppLayoutProps = {
  useGradientBg?: boolean;
  menu?: MenuKind;
  className?: string;
};

export default function AppLayout({
  useGradientBg = false,
  menu = 'shop',
  className,
}: AppLayoutProps) {
  const menuItems = headerMock[menu];
  const { openMenu, openShoppingCart, closeAll, openLkModal, setExclusive, setCartItems, isAuth, cartItems: storeCartItems } =
    useAppStore();

  const location = useLocation();

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (sp.get('lk') === 'true' || sp.has('lk')) {
      setExclusive('lk', true);
      sp.delete('lk');
      const qs = sp.toString();
      const newUrl = `${location.pathname}${qs ? `?${qs}` : ''}${location.hash || ''}`;
      window.history.replaceState(null, '', newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth_otp = useModalStore((state) => state.auth_otp);
  const success_auth_otp = useModalStore((state) => state.success_auth_otp);
  const register_otp = useModalStore((state) => state.register_otp);
  const register_form = useModalStore((state) => state.register_form);
  const register_success = useModalStore((state) => state.register_success);
  const email_otp = useModalStore((state) => state.email_otp);
  const change_email_form = useModalStore((state) => state.change_email_form);
  const change_email_success = useModalStore((state) => state.change_email_success);
  const success_payment = useModalStore((state) => state.success_payment);
  const fail_payment = useModalStore((state) => state.fail_payment);
  const order_form = useModalStore((state) => state.order_form);
  const confirm_delete_all_item = useModalStore((state) => state.confirm_delete_all_item);
  const confirm_delete_account = useModalStore((state) => state.confirm_delete_account);
  const confirm_delete_item = useModalStore((state) => state.confirm_delete_item);
  const see_order = useModalStore((state) => state.see_order);
  const cancel_order = useModalStore((state) => state.cancel_order);

  const modalFlags = useMemo(
    () => ({
      auth_otp,
      success_auth_otp,
      register_otp,
      register_form,
      register_success,
      email_otp,
      change_email_form,
      change_email_success,
      success_payment,
      fail_payment,
      order_form,
      confirm_delete_all_item,
      confirm_delete_account,
      confirm_delete_item,
      see_order,
      cancel_order,
    }),
    [
      auth_otp,
      success_auth_otp,
      register_otp,
      register_form,
      register_success,
      email_otp,
      change_email_form,
      change_email_success,
      success_payment,
      fail_payment,
      order_form,
      confirm_delete_all_item,
      confirm_delete_account,
      confirm_delete_item,
      see_order,
      cancel_order,
    ],
  );

  const { mutateAsync: addToCartApi } = useAddToShoppingCart();

  useMergeGuestCartOnLogin(Boolean(isAuth), addToCartApi);

  const isModalOpen = useMemo(
    () => Object.values(modalFlags).some(Boolean),
    [modalFlags],
  );

  useEffect(() => {
    const el = document.documentElement;
    const locked = openMenu || openShoppingCart || openLkModal || isModalOpen;
    el.classList.toggle('overflow-hidden', locked);
    return () => {
      el.classList.remove('overflow-hidden');
    };
  }, [openMenu, openShoppingCart, openLkModal, isModalOpen]);

  // авторизованная корзина
  const { data: cardItems } = useGetShoppingCart({ enabled: isAuth });
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  // гостевая корзина
  const guest = useGuestCart();
  
  // состояние загрузки при удалении элемента
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]); // удаляем closeAll

  useEffect(() => {
    setCartItems(cardItems ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardItems]); // удаляем setCartItems - проверка на изменения теперь в store

  const navigate = useNavigate();

  // 👇 универсальная «корзина для дровера» (ShoppingCart-совместимая)
  // Используем storeCartItems для оптимистичных обновлений, cardItems как fallback
  const drawerItems = useMemo(() => {
    if (isAuth) {
      // Используем storeCartItems, так как там уже есть оптимистичные обновления
      return storeCartItems || cardItems || mapGuestToShoppingCart([]);
    }
    return mapGuestToShoppingCart(guest.items);
  }, [isAuth, storeCartItems, cardItems, guest.items]);

  // есть ли что показывать
  const hasItems = useMemo(() => {
    if (isAuth) {
      // Проверяем storeCartItems для актуального состояния после оптимистичного обновления
      const currentCart = storeCartItems || cardItems;
      return (currentCart?.user_carts?.[0]?.cartDetails?.length ?? 0) > 0;
    }
    return guest.items.length > 0;
  }, [isAuth, storeCartItems, cardItems, guest.items]);

  // удаление элемента из дровера: у авторизованных — по id строки корзины; у гостя — по stock_id (мы так и подставили id)
  const handleRemoveFromDrawer = async (id: number) => {
    if (isAuth) {
      // Сохраняем исходное состояние для отката в случае ошибки
      const previousCartItems = storeCartItems || cardItems;
      
      // Включаем состояние загрузки
      setIsDeleting(true);
      
      // Оптимистичное обновление: сразу обновляем локальное состояние
      if (previousCartItems) {
        const updatedCart = {
          ...previousCartItems,
          user_carts: previousCartItems.user_carts.map((uc) => ({
            ...uc,
            cartDetails: uc.cartDetails?.filter((detail) => detail.id !== id) ?? [],
          })),
        };
        setCartItems(updatedCart);
      }
      
      try {
        await deleteCart({ ids: [id] });
        // После успешного удаления React Query обновит данные автоматически через refetchQueries
        // Дождемся обновления cardItems через useEffect выше
      } catch (error) {
        // В случае ошибки возвращаем исходное состояние
        if (previousCartItems) {
          setCartItems(previousCartItems);
        }
        throw error;
      } finally {
        // Выключаем состояние загрузки после завершения
        setIsDeleting(false);
      }
    } else {
      guest.removeByStockId(id); // id === stock_id (см. маппер)
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex min-h-dvh flex-col overflow-x-hidden',
          useGradientBg ? 'bg-gradient' : 'bg-secondary-white',
          className,
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'relative z-60 mx-auto flex w-full md:max-w-full',
            !openShoppingCart && 'md:pt-5',
          )}
        >
          <Header menuItems={menuItems} />
        </div>

        {/* Content */}
        <div className='relative z-10 mx-auto flex w-full flex-grow flex-col md:max-w-full md:pt-15'>
          <main className='h-full w-full flex-grow'>
            <Outlet />
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* затемняющий оверлей под cart-drawer */}
      {openShoppingCart && (
        <div
          onClick={() => setExclusive('cart', false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
          aria-hidden
        />
      )}

      {/* Cart Drawer */}
      <CartDrawerLayout open={openShoppingCart} onClose={() => setExclusive('cart', false)}>
        {hasItems ? (
          <CartDrawer
            open={openShoppingCart}
            onClose={() => setExclusive('cart', false)}
            items={drawerItems}
            onRemove={handleRemoveFromDrawer}
            onGoToCart={() => navigate('/shopping-cart')}
            onApplyPromo={() => console.log('onApplyPromo')}
            isDeleting={isDeleting}
          />
        ) : (
          <EmptyCardDrawer />
        )}
      </CartDrawerLayout>

      {/* Модалки */}
      <ModalLkForm open={openLkModal} setOpen={setExclusive} />
      <ModalOrderForm open={order_form} />

      <AuthContent />
      <RegisterContent />

      <FloatingButtons showAt={200} />
      <ScrollRestoration />
    </>
  );
}
