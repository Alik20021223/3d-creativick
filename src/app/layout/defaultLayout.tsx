import { headerMock } from '@/utils/mock';
import BottomContent from '@widgets/main/bottom-content';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const { pathname } = useLocation();
  const menuItems = pathname === '/' ? headerMock.main : headerMock.shop;

  return (
    // <div className="flex flex-col">
    //   {/* Контент + хедер */}
    //   <div className="mx-auto w-full max-w-[1540px] flex flex-col flex-grow pt-5">
    //     <Header menuItems={menuItems} />
    //     <main className="flex-grow w-full">
    //       <Outlet />
    //     </main>
    //   </div>

    //   {/* Фуллскрин блок */}
    //   <BottomContent />

    //   {/* Футер всегда внизу */}
    //   <Footer />
    // </div>

    <div className='isolate flex min-h-dvh flex-col'>
      {/* Центрированный контейнер, который РАСТЁТ */}
      <div className='relative z-10 mx-auto flex w-full max-w-[1540px] grow flex-col pt-5'>
        <Header menuItems={menuItems} />
        <main className='w-full grow'>
          <Outlet />
        </main>
      </div>

      <BottomContent />

      {/* Футер просто последним — без позиционирования */}
      <Footer />
    </div>
  );
}
