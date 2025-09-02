import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const ExclusiveBlock = () => {
  return (
    <>
      <section className='space-y-4 px-10 py-15'>
        <h1 className='text-dark-blue text-[54px] leading-[110%] font-bold'>Топ товаров</h1>
        <ProductCarousel items={exclusiveProductsMock} />
      </section>
    </>
  );
};

export default ExclusiveBlock;
