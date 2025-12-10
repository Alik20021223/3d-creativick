import { lazy, Suspense } from 'react';
import { PRODUCT_URL } from '@entities/products/constant';
import { LoadingSpinner } from '@shared/components/loading-spinner';

const ItemPage = lazy(() => import('@pages/item-page'));
const DetailPage = lazy(() => import('@pages/detail-page'));
const PrinterPage = lazy(() => import('@pages/printer-page'));
const SpoolPage = lazy(() => import('@pages/spool-page'));

// Компонент для загрузки страниц продуктов
const ProductPageLoader = () => (
  <div className='flex min-h-[60vh] items-center justify-center'>
    <LoadingSpinner size='lg' />
  </div>
);

export const PRODUCTS_ROUTES = [
  {
    path: PRODUCT_URL.ITEM,
    element: (
      <Suspense fallback={<ProductPageLoader />}>
        <ItemPage />
      </Suspense>
    ),
  },
  {
    path: PRODUCT_URL.DETAIL,
    element: (
      <Suspense fallback={<ProductPageLoader />}>
        <DetailPage />
      </Suspense>
    ),
  },
  {
    path: PRODUCT_URL.PRINTER,
    element: (
      <Suspense fallback={<ProductPageLoader />}>
        <PrinterPage />
      </Suspense>
    ),
  },
  {
    path: PRODUCT_URL.SPOOL,
    element: (
      <Suspense fallback={<ProductPageLoader />}>
        <SpoolPage />
      </Suspense>
    ),
  },
];
