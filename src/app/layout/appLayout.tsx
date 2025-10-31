// src/app/layout/AppLayout.tsx
import { headerMock } from '@utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { useEffect } from 'react';
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

type MenuKind = 'main' | 'shop';

type AppLayoutProps = {
  /** Добавить градиентный фон как в MainLayout */
  useGradientBg?: boolean;
  /** Какой набор пунктов меню отдавать в Header */
  menu?: MenuKind;
  /** Доп. классы на корневой оболочке */
  className?: string;
};

export default function AppLayout({
  useGradientBg = false,
  menu = 'shop',
  className,
}: AppLayoutProps) {
  const menuItems = headerMock[menu];
  const {
    openMenu,
    openShoppingCart,
    setOpenShoppingCart,
    closeAll,
    openLkModal,
    setOpenLkModal,
    setCartItems,
  } = useAppStore();

  useEffect(() => {
    const el = document.documentElement; // можно document.body
    const locked = openMenu || openShoppingCart; // добавь сюда остальные модалки, если есть
    el.classList.toggle('overflow-hidden', locked);
    return () => {
      el.classList.remove('overflow-hidden');
    };
  }, [openMenu, openShoppingCart]);

  const { data: cardItems } = useGetShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  useEffect(() => {
    closeAll();
  }, [location.pathname, location.search, closeAll]);

  useEffect(() => {
    if (cardItems) {
      setCartItems(cardItems || null);
    }
  }, [cardItems, setCartItems]);

  const navigate = useNavigate();

  const handleDeleteCart = async (id: number) => {
    await deleteCart({ ids: [id] });
  };

  return (
    <>
      <div
        className={cn(
          'flex min-h-dvh flex-col overflow-x-hidden',
          useGradientBg && 'bg-gradient',
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
          onClick={() => setOpenShoppingCart(false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
          aria-hidden
        />
      )}

      {/* Cart Drawer */}
      <CartDrawerLayout open={openShoppingCart} onClose={() => setOpenShoppingCart(false)}>
        {cardItems && cardItems?.user_carts[0].cartDetails.length > 0 ? (
          <CartDrawer
            open={openShoppingCart}
            onClose={() => setOpenShoppingCart(false)}
            items={cardItems}
            onRemove={handleDeleteCart}
            onCheckout={() => console.log('onCheckout')}
            onGoToCart={() => navigate('/shopping-cart')}
            onApplyPromo={() => console.log('onApplyPromo')}
          />
        ) : (
          <EmptyCardDrawer />
        )}
      </CartDrawerLayout>

      {/* Модалка ЛК — по флагу */}

      <ModalLkForm open={openLkModal} setOpen={setOpenLkModal} />

      <AuthContent />
      <RegisterContent />

      <FloatingButtons showAt={200} />
      <ScrollRestoration />
    </>
  );
}
