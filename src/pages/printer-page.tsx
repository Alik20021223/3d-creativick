import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import BottomContent from '@widgets/product-content/bottom-content';
import BlockItem from '@widgets/product-content/block-item-content';
import { useParams } from 'react-router-dom';
import { useProductById } from '@entities/main/hooks/getProductById';
import ProductCarousel from '@feature/exclusive-carousel';
import { useGetAllProducts } from '@entities/main/hooks/getAllProducts';
import { useGetOurActions } from '@entities/main/hooks/getOurActions';
import { techHtml } from '@entities/products/mock';
import { useProductBreadcrumbs } from '@/shared/hooks/useProductBreadcrumbs';
import { useRelatedProducts } from '@/shared/hooks/useRelatedProducts';
import { useMemo } from 'react';

const PrinterPage = () => {
  const { titleId } = useParams<{ titleId: string }>();

  const { data: productData } = useProductById(titleId);

  const params = { perPage: 10, page: 1 };
  const { data: products } = useGetAllProducts(params);
  const { data: actionsData } = useGetOurActions();

  const { pathMap: PATH_MAP } = useProductBreadcrumbs({ productData });

  const relatedProducts = useRelatedProducts({
    current: productData ?? undefined,
    all: products?.data ?? undefined,
    limit: 9,
  });

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

        <BlockItem
          techData={techHtml}
          images={productData.galleries}
          visible={4}
          infoData={productData}
        />
      </div>
      <div className='bg-catalog mt-15 h-full rounded-t-[80px]'>
        {relatedProducts.length > 0 && (
          <div className='container-custom pt-20 pb-25 max-md:py-15'>
            <h1 className='title-text px-10 text-white max-md:pb-10 max-md:text-center 2xl:px-0'>
              Может быть интересно
            </h1>
            <ProductCarousel items={relatedProducts} />
          </div>
        )}

        {hasActiveActions ? (
          <div className='z-0 h-full rounded-t-[80px] bg-white'>
            <BottomContent interesringBlock={false} />
          </div>
        ) : (
          <BottomContent interesringBlock={false} />
        )}
      </div>
    </section>
  );
};

export default PrinterPage;
