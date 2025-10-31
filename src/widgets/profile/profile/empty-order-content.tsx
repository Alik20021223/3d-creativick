import EmptyState from '@feature/empty-content';
import OrderEmptyImg from '@assets/empty-loop.svg';

const EmptyOrderContent = () => {
  return (
    <>
      <EmptyState
        title='Вы ещё ничего не заказывали'
        description='Здесь появятся ваши заказы, как только вы решите что-нибудь приобрести.
Посмотрите каталог — там уже ждут интересные 3D-модели!'
        imageSrc={OrderEmptyImg}
        wrapperClassName='md:px-0!'
        imageAlt='empty-orders'
        ctaText='В каталог'
        to='/#shop'
        align='left'
      />
    </>
  );
};

export default EmptyOrderContent;
