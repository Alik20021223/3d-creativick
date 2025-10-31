import EmptyState from '@feature/empty-content';
import bearPng from '@assets/bear-card-store.png';

const EmptyShoppingContent = () => {
  return (
    <>
      <EmptyState
        title='Здесь пока ещё ничего нет'
        description='Самое время добавить в корзину все необходимое для реализации ваших идей и начать творить!'
        imageSrc={bearPng}
        wrapperClassName='md:px-0!'
        imageAlt='empty-orders'
        ctaText='В каталог'
        to='/#shop'
        align='left'
      />
    </>
  );
};

export default EmptyShoppingContent;
