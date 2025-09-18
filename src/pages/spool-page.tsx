import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import BottomContent from '@/widgets/product-content/bottom-content';
import { PRODUCT_PATH_MAP } from '@entities/products/constant/path-map';
import DetailsSeriesContent from '@widgets/product-content/details-seria-content';
import { COLOR_PALETTE, COLORS_BY_SET, productCardsMock } from '@/utils/mock';
import { useMemo } from 'react';

import BlockItem from '@widgets/product-content/block-item-content';
import { ImagesItems, infoSpool } from '@entities/products/mock';

const PATH_MAP = {
  '*': PRODUCT_PATH_MAP,
};

const SpoolPage = () => {
  const uiColors = useMemo(() => {
    return COLORS_BY_SET['spool']
      .map((v) => ({ value: v, class: COLOR_PALETTE[v] }))
      .filter((c) => !!c.class);
  }, []);

  return (
    <>
      <section className='bg-white pt-10'>
        <div className='container-custom space-y-4 px-2.5 md:px-10 2xl:px-0'>
          <div className='flex items-center gap-4'>
            <BackBtnNavigate />
            <DynamicBreadcrumbs pathMap={PATH_MAP} />
          </div>

          <BlockItem
            images={ImagesItems}
            visible={4}
            infoData={{ ...infoSpool, colors: uiColors }}
            onAdd={() => console.log('Добавлено')}
            onColorChange={(c) => console.log('color =', c)}
          />
        </div>
        <div className='bg-catalog mt-15 h-full rounded-t-[80px]'>
          <DetailsSeriesContent
            title='Может быть интересно'
            items={productCardsMock.filter((_, i) => i <= 10 && i !== 1)}
          />
          <div className='z-0 h-full rounded-t-[80px] bg-white'>
            <BottomContent interesringBlock={false} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SpoolPage;
