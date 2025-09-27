import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@app/layout/bgGradientLayout';
import { MAIN_ROUTES } from '@entities/main/router';
import DefaultLayout from '@app/layout/defaultLayout';
import { PRODUCTS_ROUTES } from '@entities/products/router';
import { PRODUCT_URL } from '@entities/products/constant';
import { SUPPORT_ROUTES } from '@entities/support/router';
import { PROFILE_URL } from '@entities/profile/constant';
import { PROFILE_ROUTES } from '@entities/profile/router';
import { lazy } from 'react';


const ShoppingCartPage = lazy(() => import('@pages/shopping-cart-page'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: MAIN_ROUTES,
  },
  {
    path: '/support',
    element: <MainLayout />,
    children: SUPPORT_ROUTES,
  },
  {
    path: '/',
    element: <DefaultLayout className='bg-secondary-white' />,
    children: [
      {
        path: '/shopping-cart',
        element: <ShoppingCartPage />
      }
    ]
  },
  {
    path: PRODUCT_URL.BASE,
    element: <DefaultLayout />,
    children: PRODUCTS_ROUTES,
  },
  {
    path: PROFILE_URL.BASE,
    element: <DefaultLayout />,
    children: PROFILE_ROUTES,
  },
]);
