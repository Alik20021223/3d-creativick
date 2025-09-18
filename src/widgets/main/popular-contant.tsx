import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';

const PopularContent = () => {
  return (
    <>
      <section className='container-custom pt-15 md:pt-20 md:pb-15'>
        <h1 className='title-text max-2xl:px-10 max-md:px-2.5 max-md:pb-10 max-md:text-center 2xl:px-0'>
          Популярно сейчас
        </h1>
        <ProductCarousel items={exclusiveProductsMock} />
      </section>
    </>
  );
};

export default PopularContent;
