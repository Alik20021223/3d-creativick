import EmptyState from '@feature/empty-content';
import ShoppingCartContent from '@widgets/profile/shopping-cart/shopping-cart-content';
import miniBearCard from '@assets/bear-card-store.png';
import { useAppStore } from '@app/store';

const ShoppingCartPage = () => {
  const { cartItemsCount } = useAppStore();

  return (
    <>
      <section className='mt-15 rounded-t-[80px] bg-white md:py-20'>
        {cartItemsCount > 0 ? (
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
