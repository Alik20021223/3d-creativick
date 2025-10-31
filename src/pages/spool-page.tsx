import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import BottomContent from '@widgets/product-content/bottom-content';
import { PRODUCT_PATH_MAP } from '@entities/products/constant/path-map';
// import DetailsSeriesContent from '@widgets/product-content/details-seria-content';
// import { COLOR_PALETTE, COLORS_BY_SET } from '@utils/mock';
// import { useMemo } from 'react';

import BlockItem from '@widgets/product-content/block-item-content';
// import { ImagesItems, infoSpool } from '@entities/products/mock';
import { useParams } from 'react-router-dom';
import { useProductById } from '@entities/main/hooks/getProductById';
import { useGetAllProducts } from '@entities/main/hooks/getAllProducts';
import ProductCarousel from '@feature/exclusive-carousel';

const PATH_MAP = {
  '*': PRODUCT_PATH_MAP,
};

const SpoolPage = () => {
  const { titleId } = useParams<{ titleId: string }>();

  const { data: productData } = useProductById(titleId);

  const params = {
    perPage: 10,
    page: 1,
  };

  const { data: products } = useGetAllProducts(params);

  if (!productData) return null;

  return (
    <>
      <section className='bg-white pt-10'>
        <div className='container-custom space-y-4 px-2.5 md:px-10 2xl:px-0'>
          <div className='flex items-center gap-4'>
            <BackBtnNavigate />
            <DynamicBreadcrumbs pathMap={PATH_MAP} />
          </div>

          <BlockItem
            isSpool={true}
            images={productData?.galleries}
            visible={4}
            infoData={productData}
          />
        </div>
        <div className='bg-catalog mt-15 h-full rounded-t-[80px]'>
          {products?.data && products?.data.length > 0 && (
            <div className='container-custom pt-20 pb-25 max-md:py-15'>
              <h1 className='title-text px-10 text-white max-md:pb-10 max-md:text-center 2xl:px-0'>
                Может быть интересно
              </h1>
              <ProductCarousel items={products.data} />
            </div>
          )}
          <div className='z-0 h-full rounded-t-[80px] bg-white'>
            <BottomContent interesringBlock={false} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SpoolPage;
