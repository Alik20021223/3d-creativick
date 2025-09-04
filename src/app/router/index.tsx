import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@app/layout/defaultLayout';
import TechPage from '@pages/tech-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <TechPage />
      }
    ],
  },
]);
