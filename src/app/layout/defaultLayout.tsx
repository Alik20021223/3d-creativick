import Footer from '@feature/footer/ui';
import Header from '@feature/header';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='mx-auto my-0 flex h-full w-full max-w-[1456px] flex-col px-[38px] pt-5'>
      <Header isAuth={true} />
      <main className='gap w-full flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
