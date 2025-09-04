import FloatingButtons from '@feature/floatingButton';
import { headerMock } from '@utils/mock';
import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='flex min-h-dvh flex-col overflow-x-hidden'>
      {/* Центрированный контейнер, который РАСТЁТ */}
      <div className='relative z-10 mx-auto flex w-full max-w-[1540px] grow flex-col pt-5 max-md:pt-[56px]'>
        <Header menuItems={headerMock} />
        <main className='w-full grow'>
          <Outlet />
        </main>
      </div>

      <FloatingButtons
        chatHref="https://t.me/your_support_bot"  // замени на нужную ссылку
        showAt={200}                               // когда показывать кнопку «вверх»
      />

      {/* Футер просто последним — без позиционирования */}
      <Footer />
    </div>
  );
}
