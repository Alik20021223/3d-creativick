import EmptyState from '@feature/empty-content';
import ShoppingCartContent from '@widgets/profile/shopping-cart/shopping-cart-content';
import miniBearCard from '@assets/bear-card-store.png';
import { useCartBadgeCount } from '@/entities/profile/utils/guest-cart/useCartBadgeCount';

const ShoppingCartPage = () => {
  const cartCount = useCartBadgeCount();

  return (
    <>
      <section className='mt-25 rounded-t-[80px] bg-white md:mt-15 md:py-20'>
        {cartCount > 0 ? (
          <ShoppingCartContent />
        ) : (
          <EmptyState
            title='Здесь пока ещё ничего нет'
            description='Самое время добавить в корзину все необходимое для реализации ваших идей и начать творить!'
            imageSrc={miniBearCard}
            imageAlt='mini-bear-store'
            ctaText='В каталог'
            to='/#shop'
            align='left'
          />
        )}
      </section>
    </>
  );
};

export default ShoppingCartPage;
