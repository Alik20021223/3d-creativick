import { Button } from '@shadcn/button';
import { Link, useLocation } from 'react-router-dom';
import logoSrc from '@assets/logo-3d.svg';
import userSrc from '@assets/user-profile.svg';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@app/hook/useMobile';
import MobileHeader from './mobileHeader';
import { useAppStore } from '@app/store';
import { useEffect } from 'react';
import { HeaderType } from '@shared/types';
import NavItem from '../navItem/ui';
import { useHideOnScroll } from '@app/hook/useHideOnScroll';

type HeaderProps = { menuItems: HeaderType[] };

export default function Header({ menuItems }: HeaderProps) {
  const { pathname, hash } = useLocation();
  const isMobile = useIsMobile();
  const { open, setOpen, isAuth } = useAppStore();

  // 👇 скрываем при скролле вниз, показываем при скролле вверх
  const { hidden, atTop, setHidden } = useHideOnScroll({
    threshold: 80,
    delta: 6,
    revealOnIdleMs: 250, // автопоказ после остановки прокрутки
    disabled: open,
  });

  const isHashHref = (href: string) => href.startsWith('#');
  const linkClass = (href: string) => {
    const active = isHashHref(href) ? hash === href : pathname === href;
    return [
      'inline-flex items-center h-full px-2 transition-colors border-b-2 hover:text-primary hover:border-primary',
      active ? 'text-primary border-primary' : 'text-gray-500 border-transparent ',
    ].join(' ');
  };

  useEffect(() => {
    const { style } = document.documentElement;
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
      {/* fixed-хедер с анимацией появления/скрытия */}
      <div
        className={[
          'fixed inset-x-0 z-50 px-[38px] max-md:px-2.5',
          'top-5 max-md:top-[56px]', // оставляем твой отступ сверху
          'transition-transform duration-300 will-change-transform',
          hidden ? '-translate-y-[120%] max-md:-translate-y-[180%]' : 'translate-y-0',
        ].join(' ')}
        onMouseEnter={() => setHidden(false)}
      >
        <div
          className={[
            'h-16 w-full rounded-4xl bg-white p-2.5 pl-[42px] max-sm:px-2.5',
            'transition-shadow duration-300',
            atTop ? 'shadow-none' : 'shadow-2xl',
          ].join(' ')}
        >
          <header className='flex justify-center'>
            <div className='flex w-full max-w-[1540px] items-center justify-between'>
              <div className='flex items-center max-md:pl-2.5'>
                <Link to='/' aria-label='На главную'>
                  <img src={logoSrc} alt='logo' />
                </Link>
              </div>

              {isMobile ? (
                <MobileHeader
                  menuItems={menuItems}
                  open={open}
                  setOpen={setOpen}
                  linkClass={linkClass}
                  cartCount={12}
                />
              ) : (
                <>
                  <nav className='hidden h-11 gap-6 md:flex'>
                    {menuItems.map((item) => (
                      <NavItem
                        pathname={pathname}
                        linkClass={linkClass}
                        key={item.href}
                        label={item.label}
                        href={item.href}
                      />
                    ))}
                  </nav>

                  <div className='flex gap-20'>

                    <div className='flex flex-col items-center'>
                      <a
                        href='mailto:info@3dkreativik.ru'
                        className='text-lg font-normal text-dark-blue leading-[130%]'
                      >
                        info@3dkreativik.ru
                      </a>
                      <a
                        href="tel:+84959888282"
                        className='text-lg font-normal text-dark-blue leading-[130%]'
                      >
                        8 (495) 988-82-82
                      </a>
                    </div>

                    <div className='flex gap-3'>
                      {isAuth && (
                        <Button className='bg-primary relative flex h-11 w-[70px] !p-0 text-white'>
                          <ShoppingCart className='!h-8 !w-8' />
                          <div className='bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full'>
                            12
                          </div>
                        </Button>
                      )}

                      <Button
                        variant='pink'
                        className='bg-pink-active flex h-11 w-[83px] justify-center'
                        asChild
                      >
                        <Link to={isAuth ? '/profile' : '/login'}>
                          <img src={userSrc} alt='user' className='pt-[5px]' />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>
        </div>
      </div>

      {open && (
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={() => setOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
        />
      )}

      {/* Прокладка под фиксированный хедер (его высота = h-16 = 64px) */}
      <div className='h-16' />
    </>
  );
}
