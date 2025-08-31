import { headerMock } from '@/utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const { pathname } = useLocation();

  const menuItems = pathname === '/' ? headerMock.main : headerMock.shop;

  return (
    <div className=' my-0 flex h-full w-full max-w-[1540px] flex-col pt-5'>
      <Header menuItems={menuItems} />
      <main className='gap w-full flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
