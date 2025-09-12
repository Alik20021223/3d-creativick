import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const PopularContent = () => {
  return (
    <>
      <section className='relative z-[60] rounded-t-[80px] bg-white md:mt-[241px] md:pb-15'>
        <div className='pt-20'>
          <h1 className='title-text px-10'>Популярно сейчас</h1>
          <ProductCarousel items={exclusiveProductsMock} />
        </div>
      </section>
    </>
  );
};

export default PopularContent;
