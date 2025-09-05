import { headerMock } from '@/utils/mock';
import BottomContent from '@widgets/main/bottom-content';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet, useLocation } from 'react-router-dom';
import ExclusiveContent from '@widgets/main/exclusive-content';

export default function MainLayout() {
  const { pathname } = useLocation();
  const menuItems = pathname === '/' ? headerMock.main : headerMock.shop;

  return (
    <div className='flex min-h-dvh flex-col overflow-x-hidden'>
      {/* Центрированный контейнер, который РАСТЁТ */}
      <div className='relative z-10 mx-auto flex w-full md:max-w-[1540px] grow flex-col md:pt-5'>
        <Header menuItems={menuItems} />
        <main className='w-full grow'>
          <Outlet />
        </main>
      </div>
      <div className='mt-[90px] rounded-t-[80px] bg-white'>
        <ExclusiveContent />
        <BottomContent />
      </div>

      {/* Футер просто последним — без позиционирования */}
      <Footer />
    </div>
  );
}
