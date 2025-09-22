import { lazy } from 'react';
import { SUPPORT_URL } from '@entities/support/constant';

const SupportPage = lazy(() => import('@pages/support-page'));
const ItemSupportPage = lazy(() => import('@pages/item-support-page'));

export const SUPPORT_ROUTES = [
  {
    path: SUPPORT_URL.PREFIX,
    element: <SupportPage />,
  },
  {
    path: SUPPORT_URL.ITEM,
    element: <ItemSupportPage />,
  },
];
