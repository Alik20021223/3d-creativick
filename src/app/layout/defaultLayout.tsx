import { headerMock } from '@/utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import {
  Outlet,
  ScrollRestoration,
  useNavigate,
} from 'react-router-dom';
import { useAppStore } from '../store';
import { useEffect } from 'react';
import { cn } from '@lib/utils';
import CartDrawerLayout from '@feature/card-drawer/ui';
import { cards } from '@entities/profile/mock';
import EmptyCardDrawer from '@entities/profile/ui/empty-card-drawer';
import CartDrawer from '@entities/profile/ui/full-card-drawer';
import FloatingButtons from '@feature/floatingButton';

export default function DefaultLayout({ className }: { className?: string }) {
  const menuItems = headerMock.shop;
  const { openMenu, openShoppingCart, setOpenShoppingCart, closeAll } = useAppStore();

  useEffect(() => {
    const { style } = document.documentElement;
    const prev = style.overflow;
    if (openMenu || openShoppingCart) style.overflow = 'hidden';
    return () => { style.overflow = prev };
  }, [openMenu, openShoppingCart]);

  useEffect(() => {
    closeAll();
  }, [location.pathname, location.search, closeAll]);


  const navigate = useNavigate()

  return (
    <>
      <div className={cn('flex min-h-dvh flex-col overflow-x-hidden ', className)}>
        <div className={`relative z-60 mx-auto flex w-full md:max-w-full ${openShoppingCart ? '' : 'md:pt-5'}`}>
          <Header menuItems={menuItems} />
        </div>
        <div className="relative z-10 mx-auto flex w-full flex-grow flex-col md:max-w-full md:pt-15">
          <main className="h-full w-full flex-grow">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>

      {/* ✅ единый полноэкранный оверлей ПОД хедером и ПОД карточкой */}
      {openShoppingCart && (
        <div
          onClick={() => setOpenShoppingCart(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
          aria-hidden
        />
      )}

      <CartDrawerLayout
        open={openShoppingCart}
        onClose={() => setOpenShoppingCart(false)}
      >
        {cards.length > 0 ?
          <CartDrawer
            open={openShoppingCart}
            onClose={() => setOpenShoppingCart(false)}
            items={cards.slice(0, 3)}
            onRemove={(id) => console.log(id)}
            onCheckout={() => console.log('onCheckout')}
            onGoToCart={() => navigate('shopping-cart')}
            onApplyPromo={() => console.log('onGoToCart')}
          />
          :
          <EmptyCardDrawer />
        }
      </CartDrawerLayout>

      <FloatingButtons
        showAt={200} // когда показывать кнопку «вверх»
      />

      <ScrollRestoration />
    </>
  );
}


