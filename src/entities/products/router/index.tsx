import { lazy } from 'react';
import { PRODUCT_URL } from '@entities/products/constant';

const ItemPage = lazy(() => import('@pages/item-page'));

export const PRODUCTS_ROUTES = [
  {
    path: PRODUCT_URL.PREFIX,
    element: <ItemPage />,
  },
];
