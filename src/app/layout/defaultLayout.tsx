import { headerMock } from '@/utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import {
  Outlet,
  ScrollRestoration,
  // useLocation
} from 'react-router-dom';

export default function DefaultLayout() {
  // const { pathname } = useLocation();
  // const menuItems = pathname === '/' ? headerMock.main : headerMock.shop;
  const menuItems = headerMock.shop;

  return (
    <>
      <div className='flex min-h-dvh flex-col overflow-x-hidden bg-white'>
        {/* Центрированный контейнер, который РАСТЁТ */}
        <div className='relative z-10 mx-auto flex w-full grow flex-col md:max-w-full md:pt-5'>
          <Header menuItems={menuItems} />
          <main className='h-full w-full grow'>
            <Outlet />
          </main>
        </div>
        {/* Футер просто последним — без позиционирования */}
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  );
}
