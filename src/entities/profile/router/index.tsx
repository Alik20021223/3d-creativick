import { lazy } from 'react';
import { PROFILE_URL } from '@entities/profile/constant';

const ProfilePage = lazy(() => import('@pages/profile-page'));


export const PROFILE_ROUTES = [
  {
    path: PROFILE_URL.BASE,
    element: <ProfilePage />,
  },
];
