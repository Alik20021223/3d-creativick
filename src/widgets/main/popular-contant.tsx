import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const PopularContent = () => {
  return (
    <>
      <section className='md:pt-20 pt-15 md:pb-15'>
        <h1 className='title-text px-10 max-md:pb-10 max-md:text-center'>Популярно сейчас</h1>
        <ProductCarousel items={exclusiveProductsMock} />
      </section>
    </>
  );
};

export default PopularContent;
