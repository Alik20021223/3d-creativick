// Header.tsx
import { Button } from '@shadcn/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoSrc from '@assets/logo-3d.svg';
import userSrc from '@assets/user-profile.svg';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@app/hook/useMobile';
import MobileHeader from './mobileHeader';
import { useAppStore } from '@app/store';
import { HeaderType } from '@shared/types';
import NavItem from '../navItem/ui';
import { useHideOnScroll } from '@app/hook/useHideOnScroll';

import { useCartBadgeCount } from '@entities/profile/utils/guest-cart/useCartBadgeCount';
import { useSharedStore } from '@/shared/store';

type HeaderProps = { menuItems: HeaderType[] };

export default function Header({ menuItems }: HeaderProps) {
  const { pathname, hash } = useLocation();
  const isMobile = useIsMobile();
  const { openMenu, setExclusive, isAuth, openShoppingCart } = useAppStore();

  const cartCount = useCartBadgeCount();

  const navigate = useNavigate();

  const { appSettings } = useSharedStore();

  const phoneNumber = appSettings.find((s) => s.key === 'phone')?.value;

  const { hidden, atTop, setHidden } = useHideOnScroll({
    threshold: 80,
    delta: 6,
    revealOnIdleMs: 250,
    disabled: openMenu,
  });

  const isHash = (href: string) => href.startsWith('#');
  const linkClass = (href: string) => {
    const hasHashNow = !!hash;
    const active = isHash(href) ? hash === href : hasHashNow ? false : pathname === href;
    return [
      'inline-flex items-center h-full px-2 transition-colors border-b-2 hover:text-primary hover:border-primary max-md:py-2',
      active ? 'text-primary border-primary' : 'text-gray-500 border-transparent',
    ].join(' ');
  };

  const handleClickProfile = () => {
    if (isAuth) navigate('/profile');
    else setExclusive('lk');
  };

  return (
    <>
      <div
        className={[
          'fixed inset-x-0 z-[60] px-10 max-md:px-2.5',
          openShoppingCart ? 'max-md:top-5 md:top-0' : 'top-5',
          'transition-transform duration-300 will-change-transform',
          hidden ? '-translate-y-[120%] max-md:-translate-y-[180%]' : 'translate-y-0',
        ].join(' ')}
        onMouseEnter={() => setHidden(false)}
      >
        <div
          className={[
            'h-16 w-full bg-white p-2.5 pl-[42px] max-sm:px-2.5',
            openShoppingCart ? 'max-md:rounded-4xl md:rounded-b-4xl' : 'rounded-4xl',
            'transition-shadow duration-300',
            atTop ? 'shadow-xl' : 'header-shadow',
          ].join(' ')}
        >
          <header className='flex justify-center'>
            <div className='container-custom flex w-full items-center justify-between'>
              <div className='flex items-center max-md:pl-2.5'>
                <Link to='/' aria-label='На главную'>
                  <img src={logoSrc} alt='logo' />
                </Link>
              </div>

              {isMobile ? (
                <MobileHeader
                  pathname={pathname}
                  menuItems={menuItems}
                  open={openMenu}
                  setOpen={setExclusive}
                  linkClass={linkClass}
                  cartCount={cartCount}
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
                    <div className='flex flex-col items-center justify-center'>
                      <a
                        href='mailto:info@3dkreativik.ru'
                        className='text-dark-blue text-lg leading-[130%] font-normal'
                      >
                        info@3dkreativik.ru
                      </a>
                      {phoneNumber && <a
                        href={`tel:${phoneNumber.replace(/\s/g, '').replace(/[()+-]/g, '')}`}
                        className="text-dark-blue text-lg leading-[130%] font-normal"
                      >
                        {phoneNumber}
                      </a>}
                    </div>

                    <div className='flex gap-3'>
                      <Button
                        onClick={() => setExclusive('cart', true)}
                        className='bg-primary button-shadow-blue-sm relative flex h-11 w-[70px] !p-0 text-white'
                      >
                        <ShoppingCart className='!h-8 !w-8' />
                        {cartCount > 0 && (
                          <div className='bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full text-sm'>
                            {cartCount}
                          </div>
                        )}
                      </Button>

                      <Button
                        onClick={handleClickProfile}
                        variant='pink'
                        className='bg-pink-active flex h-11 w-[83px] justify-center'
                        asChild
                      >
                        <img src={userSrc} alt='user' className='pt-[5px]' />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>
        </div>
      </div>

      {/* затемнение при открытом меню */}
      {openMenu && (
        <button
          type='button'
          aria-label='Закрыть меню'
          onClick={() => setExclusive('menu', false)}
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-md'
        />
      )}
    </>
  );
}
