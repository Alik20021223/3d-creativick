import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@app/layout/bgGradientLayout';
import { MAIN_ROUTES } from '@entities/main/router';
import DefaultLayout from '@app/layout/defaultLayout';
import { PRODUCTS_ROUTES } from '@entities/products/router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: MAIN_ROUTES,
  },
  {
    path: '/:titleId',
    element: <DefaultLayout />,
    children: PRODUCTS_ROUTES,
  }
]);
