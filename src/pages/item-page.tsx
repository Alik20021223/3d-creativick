import BlockItem from '@widgets/product-content/block-item-content';
import BottomContent from '@widgets/product-content/bottom-content';
import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import { useParams } from 'react-router-dom';
import { useProductById } from '@entities/main/hooks/getProductById';
import { useGetAllProducts } from '@entities/main/hooks/getAllProducts';
import { useGetOurActions } from '@entities/main/hooks/getOurActions';
import DetailsSeriesContent from '@widgets/product-content/details-seria-content';
import { useProductBreadcrumbs } from '@shared/hooks/useProductBreadcrumbs';
import { useMemo } from 'react';

const ItemPage = () => {
  const { titleId } = useParams<{ titleId: string }>();

  const params = {
    perPage: 10,
    page: 1,
  };

  const { data: AllProducts } = useGetAllProducts(params);
  const { data: productData } = useProductById(titleId);
  const { data: actionsData } = useGetOurActions();

  const { pathMap: PATH_MAP } = useProductBreadcrumbs({ productData });

  // Проверяем, есть ли активные акции
  const hasActiveActions = useMemo(() => {
    const banners = (actionsData ?? []).filter((b) => b.active === 1);
    return banners.length > 0;
  }, [actionsData]);

  if (!productData) return null;   

  return (
    <section className='pt-10 max-md:pt-25'>
      <div className='container-custom space-y-4 px-2.5 md:px-10 2xl:px-0'>
        <div className='flex items-center gap-4'>
          <BackBtnNavigate />
          <DynamicBreadcrumbs startLink={{ value: 'Каталог', link: '/#shop' }} pathMap={PATH_MAP} />
        </div>
        <BlockItem images={productData.galleries} visible={4} infoData={productData} />
      </div>
      <div className='bg-catalog mt-15 h-full rounded-t-[80px]'>
        {productData.has_models && <DetailsSeriesContent items={productData.models || []} />}
        {hasActiveActions ? (
          <div className='z-0 h-full rounded-t-[80px] bg-white'>
            <BottomContent items={AllProducts?.data} currentProduct={productData} />
          </div>
        ) : (
          <BottomContent items={AllProducts?.data} currentProduct={productData} />
        )}
      </div>
    </section>
  );
};

export default ItemPage;
