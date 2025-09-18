import { lazy } from 'react';
import { PRODUCT_URL } from '@entities/products/constant';

const ItemPage = lazy(() => import('@pages/item-page'));
const PrinterPage = lazy(() => import('@pages/printer-page'));
const SpoolPage = lazy(() => import('@pages/spool-page'));

export const PRODUCTS_ROUTES = [
  {
    path: PRODUCT_URL.ITEM,
    element: <ItemPage />,
  },
  {
    path: PRODUCT_URL.PRINTER,
    element: <PrinterPage />,
  },
  {
    path: PRODUCT_URL.SPOOL,
    element: <SpoolPage />,
  },
];
