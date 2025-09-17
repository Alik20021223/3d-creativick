import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const ExclusiveBlock = () => {
  return (
    <>
      <section className='space-y-4 py-15'>
        <h1 className='title-text max-md:text-center'>Топ товаров</h1>
        <ProductCarousel items={exclusiveProductsMock} />
      </section>
    </>
  );
};

export default ExclusiveBlock;
