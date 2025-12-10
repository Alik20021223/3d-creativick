// import { exclusiveProductsMock } from '@utils/mock';

import { useMemo } from 'react';
import ProductCarousel from '@/feature/exclusive-carousel';
import { usePopularGet } from '@entities/main/hooks/getAllPopular';
import { hasAvailableStock } from '@utils/product-variants';

const PopularContent = () => {
  const { data } = usePopularGet();

  // Фильтруем только активные товары с доступными вариантами
  const activeProducts = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (product) =>
        product.active === true &&
        hasAvailableStock({ uuid: product.uuid, stock_balances: product.stock_balances }),
    );
  }, [data]);

  return (
    <>
      <section className='container-custom pt-15 pb-10 md:pt-20 md:pb-15'>
        <h1 className='title-text max-2xl:px-10 max-md:px-2.5 max-md:pb-10 max-md:text-center 2xl:px-0'>
          Популярно сейчас
        </h1>
        <ProductCarousel buttonShow={true} items={activeProducts} />
      </section>
    </>
  );
};

export default PopularContent;
