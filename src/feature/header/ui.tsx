import { Button } from '@shadcn/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoSrc from '@assets/logo-3d.svg';
import userSrc from '@assets/user-profile.svg';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@app/hook/useMobile';
import MobileHeader from './mobileHeader';
import { useAppStore } from '@app/store';
import { useEffect } from 'react';
import { HeaderType } from '@shared/types';
import NavItem from '../navItem/ui';

type HeaderProps = {
  menuItems: HeaderType[];
};

export default function Header({ menuItems }: HeaderProps) {
  const { pathname, hash } = useLocation();
  const isMobile = useIsMobile();
  const { open, setOpen, isAuth } = useAppStore();

  const navigate = useNavigate()

  const isHashHref = (href: string) => href.startsWith('#');

  const linkClass = (href: string) => {
    const active = isHashHref(href) ? hash === href : pathname === href;
    return [
      'inline-flex items-center h-full px-2 transition-colors border-b-2',
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
      <div className='fixed inset-x-0 top-5 z-50'>
        <div className='w-[1460px] w-full px-[38px] max-sm:px-2.5'>
          <header className='header-shadow flex h-16 items-center justify-between rounded-4xl bg-white p-2.5'>
            <div className='flex items-center'>
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

                <div className='flex gap-2'>
                  {isAuth ? (
                    <Button className='bg-primary relative flex h-11 w-[70px] !p-0 text-white'>
                      <ShoppingCart className='!h-8 !w-8' />
                      <div className='bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full'>
                        12
                      </div>
                    </Button>
                  ) : (
                    <Button onClick={() => navigate('/shop')} className='flex h-11 w-[189px] text-white'>В магазин</Button>
                  )}

                  <Button variant="pink" className='bg-pink-active  flex h-11 w-[83px] justify-center' asChild>
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

      {open && (
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={() => setOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
        />
      )}

      <div className='h-16' />
    </>
  );
}
