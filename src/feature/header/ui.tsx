'use client';

import { Button } from '@shadcn/button';
import { Link, useLocation } from 'react-router-dom';
import logoSrc from '@assets/logo-3d.svg';
import userSrc from '@assets/user-profile.svg';
import { headerMock } from '@utils/mock';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@app/hook/useMobile';
import MobileHeader from './mobileHeader';
import { useAppStore } from '@app/store';
import { useEffect } from 'react';

type HeaderProps = {
  isAuth?: boolean; // прокидывай из сессии/стора
};

export default function Header({ isAuth = false }: HeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const menuItems = isAuth ? headerMock.auth : headerMock.guest;

  const isMobile = useIsMobile();

  const { open, setOpen } = useAppStore();

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      'inline-flex items-center h-full px-2 transition-colors border-b-2',
      isActive ? 'text-primary border-primary' : 'text-gray-500 border-transparent ',
    ].join(' ');
  };

  useEffect(() => {
    const { style } = document.documentElement; // или document.body
    if (open) {
      const prev = style.overflow;
      style.overflow = 'hidden';
      return () => {
        style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {/* Фиксированный wrapper на ширину экрана */}
      <div className='fixed inset-x-0 top-5 z-50'>
        {/* Контейнер ограничивает ширину */}
        <div className='mx-auto max-w-[1456px] px-[38px] max-sm:px-2.5'>
          <header className='header-shadow flex h-16 items-center justify-between rounded-4xl bg-white p-2.5'>
            {/* Лого */}
            <div className='flex items-center'>
              <Link to='/' aria-label='На главную'>
                <img src={logoSrc} alt='logo' />
              </Link>
            </div>

            {isMobile ? (
              <MobileHeader
                isAuth={isAuth}
                open={open}
                setOpen={setOpen}
                linkClass={linkClass}
                cartCount={12}
              />
            ) : (
              <>
                <nav className='hidden h-11 gap-6 md:flex'>
                  {menuItems.map((item) => (
                    <Link key={item.href} to={item.href} className={linkClass(item.href)}>
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Правый блок */}
                <div className='flex gap-2'>
                  {isAuth ? (
                    <Button className='bg-primary relative flex h-11 w-[70px] !p-0 text-white'>
                      <ShoppingCart className='!h-8 !w-8' />
                      <div className='bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full'>
                        12
                      </div>
                    </Button>
                  ) : (
                    <Button className='flex h-11 w-[189px] text-white'>В магазин</Button>
                  )}

                  <Button className='bg-pink-active flex h-11 w-[83px] justify-center' asChild>
                    <Link to={isAuth ? '/profile' : '/login'}>
                      <img src={userSrc} alt='user' className='pt-[5px]' />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </header>
        </div>
      </div>

      {/* Глобальный блюр-вейл под хедером, поверх контента */}
      {open && (
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={() => setOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
        />
      )}

      {/* Спейсер под фиксированным хедером */}
      <div className='h-20' />
    </>
  );
}
