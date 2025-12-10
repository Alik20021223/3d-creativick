import { createBrowserRouter } from 'react-router-dom';
import { MAIN_ROUTES } from '@entities/main/router';
import { PRODUCTS_ROUTES } from '@entities/products/router';
import { PRODUCT_URL } from '@entities/products/constant';
import { SUPPORT_ROUTES } from '@entities/support/router';
import { PROFILE_URL } from '@entities/profile/constant';
import { PROFILE_ROUTES } from '@entities/profile/router';
import { lazy, Suspense } from 'react';
import AppLayout from '@app/layout/appLayout';
import ErrorPage from '@pages/404-page';
import MaintenanceGate from './MaintenanceGate';
import ProtectedRoute from './ProtectedRoute';
import { LoadingSpinner } from '@shared/components/loading-spinner';

const ShoppingCartPage = lazy(() => import('@pages/shopping-cart-page'));

// Компонент для отображения загрузки страниц
const PageLoader = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <LoadingSpinner size='lg' />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MaintenanceGate />,
    children: [
      {
        path: '/',
        element: <AppLayout useGradientBg={true} menu='shop' />,
        children: MAIN_ROUTES,
      },
      {
        path: '/support',
        element: <AppLayout useGradientBg={true} menu='shop' />,
        children: SUPPORT_ROUTES,
      },
      {
        path: '/',
        element: <AppLayout useGradientBg={false} className='bg-secondary-white' />,
        children: [
          {
            path: '/shopping-cart',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ShoppingCartPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: PRODUCT_URL.BASE,
        element: <AppLayout useGradientBg={false} />,
        children: PRODUCTS_ROUTES,
      },
      {
        element: <ProtectedRoute />, // оборачиваем профиль
        children: [
          {
            path: PROFILE_URL.BASE,
            element: <AppLayout useGradientBg={true} menu='shop' />,
            children: PROFILE_ROUTES,
          },
        ],
      },
      {
        path: '/',
        element: <AppLayout useGradientBg={false} className='bg-secondary-white' />,
        children: [{ path: '*', element: <ErrorPage /> }],
      },
    ],
  },
]);
