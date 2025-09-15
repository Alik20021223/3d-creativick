import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const PopularContent = () => {
  return (
    <>
      <section className='relative z-[20]'>
        <div className='md:pt-20 pt-15 bg-white rounded-t-[80px] md:mt-[241px] md:pb-15'>
          <h1 className='title-text px-10 max-md:pb-10 max-md:text-center'>Популярно сейчас</h1>
          <ProductCarousel items={exclusiveProductsMock} />
        </div>
      </section>
    </>
  );
};

export default PopularContent;
