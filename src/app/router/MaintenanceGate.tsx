// src/app/router/MaintenanceGate.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TechPage from '@pages/tech-page';
import { cn } from '@shared/lib/utils';
import Header from '@feature/header';
import Footer from '@feature/footer';
import { headerMock } from '@utils/mock';
// (опц.) из стора
// import { useAppStore } from '@app/store';

type Props = {
  enabled?: boolean; // можно пробрасывать пропом при создании роутера
};

const MaintenanceGate: React.FC<Props> = ({ enabled }) => {
  const menuItems = headerMock['shop'];

  const envFlag = import.meta.env.VITE_MAINTENANCE === 'true';

  const isOn = enabled ?? envFlag; /* ?? storeFlag */

  if (isOn) {
    // показываем тех-страницу вместо любого контента
    return (
      <>
        <div className={cn('bg-secondary-white flex min-h-dvh flex-col overflow-x-hidden')}>
          <div className={cn('relative z-60 mx-auto flex w-full md:max-w-full')}>
            <Header menuItems={menuItems} />
          </div>

          {/* Content */}
          <div className='relative z-10 mx-auto flex w-full flex-grow flex-col md:max-w-full md:pt-15'>
            <main className='h-full w-full flex-grow'>
              <TechPage />
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </>
    );
  }
  // пропускаем к детям (Layouts/страницы)
  return <Outlet />;
};

export default MaintenanceGate;
