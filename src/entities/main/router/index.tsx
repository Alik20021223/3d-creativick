import { lazy, Suspense } from 'react';
import { MAIN_URL } from '@entities/main/constant';
import { LoadingSpinner } from '@shared/components/loading-spinner';

const MainPage = lazy(() => import('@pages/main-page'));

export const MAIN_ROUTES = [
  {
    path: MAIN_URL.PREFIX,
    element: (
      <Suspense fallback={<LoadingSpinner fullScreen size='lg' />}>
        <MainPage />
      </Suspense>
    ),
  },
];
