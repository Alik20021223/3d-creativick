import { headerMock } from '@/utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import {
  Outlet,
  // useLocation
} from 'react-router-dom';

export default function MainLayout() {
  // const { pathname } = useLocation();
  // const menuItems = pathname === '/' ? headerMock.main : headerMock.shop;
  const menuItems = headerMock.shop;

  return (
    <div className='flex min-h-dvh flex-col overflow-x-hidden'>
      {/* Центрированный контейнер, который РАСТЁТ */}
      <div className='md:container-custom relative z-10 mx-auto flex w-full grow flex-col md:pt-5'>
        <Header menuItems={menuItems} />
        <main className='w-full grow h-full'>
          <Outlet />
        </main>
      </div>
      {/* Футер просто последним — без позиционирования */}
      <Footer />
    </div>
  );
}
