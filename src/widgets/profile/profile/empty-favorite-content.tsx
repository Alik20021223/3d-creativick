import EmptyState from '@feature/empty-content';
import OrderEmptyImg from '@assets/empty-loop.webp';

const EmptyFavoriteContent = () => {
  return (
    <>
      <EmptyState
        title='Здесь будут отображаться ваши любимые товары.'
        description='Добавьте понравившиеся модели в избранное — и они всегда будут под рукой!'
        imageSrc={OrderEmptyImg}
        wrapperClassName='md:px-0!'
        imageAlt='empty-favorites'
        ctaText='В каталог'
        to='/#shop'
        align='left'
      />
    </>
  );
};

export default EmptyFavoriteContent;
