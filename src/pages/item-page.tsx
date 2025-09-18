import BlockItem from '@widgets/product-content/block-item-content';
import BottomContent from '@/widgets/product-content/bottom-content';
import DetailsSeriesContent from '@/widgets/product-content/details-seria-content';
import { PRODUCT_PATH_MAP } from '@entities/products/constant/path-map';
import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import { ImagesItems, infoSeries } from '@entities/products/mock';

const PATH_MAP = {
  '*': PRODUCT_PATH_MAP,
};

const ItemPage = () => {
  return (
    <>
      <section className='bg-white pt-10'>
        <div className='container-custom space-y-4 px-2.5 md:px-10 2xl:px-0'>
          <div className='flex items-center gap-4'>
            <BackBtnNavigate />
            <DynamicBreadcrumbs pathMap={PATH_MAP} />
          </div>

          <BlockItem visible={4} images={ImagesItems} infoData={infoSeries} />
        </div>
        <div className='bg-catalog mt-15 h-full rounded-t-[80px]'>
          <DetailsSeriesContent />
          <div className='z-0 h-full rounded-t-[80px] bg-white'>
            <BottomContent />
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemPage;
