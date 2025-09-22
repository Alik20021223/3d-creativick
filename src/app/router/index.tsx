import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@app/layout/bgGradientLayout';
import { MAIN_ROUTES } from '@entities/main/router';
import DefaultLayout from '@app/layout/defaultLayout';
import { PRODUCTS_ROUTES } from '@entities/products/router';
import { PRODUCT_URL } from '@entities/products/constant';
import { SUPPORT_ROUTES } from '@entities/support/router';

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
    path: PRODUCT_URL.BASE,
    element: <DefaultLayout />,
    children: PRODUCTS_ROUTES,
  },
]);
