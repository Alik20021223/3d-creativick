'use client';

import React from 'react';
import { Button } from '@shadcn/button';
import MenuIcon from '@assets/menu-icon.svg';
import { Popover, PopoverTrigger, PopoverContent } from '@shadcn/popover';
import userSrc from '@assets/user-profile.svg';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { ShoppingCart, XIcon } from 'lucide-react';
import { HeaderType } from '@shared/types';
import { useAppStore } from '@app/store';

type MobileHeaderProps = {
  menuItems: HeaderType[]; // передаём массив напрямую
  cartCount: number; // количество в корзине
  linkClass: (href: string) => string;
  setOpen: (v: boolean) => void;
  open: boolean;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
  menuItems = [],
  linkClass,
  cartCount = 0,
  setOpen,
  open,
}) => {
  const { isAuth } = useAppStore();

  return (
    <>
      <div className='relative z-50'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              className={cn('h-11 w-11 p-0!', open ? 'bg-secondary-active' : 'bg-primary-active')}
              aria-label='Открыть меню'
            >
              {open ? (
                <XIcon className='text-primary-active h-6 w-6' />
              ) : (
                <img src={MenuIcon} alt='' className='h-6 w-6' />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side='bottom'
            align='end'
            sideOffset={20}
            className='data-[state=open]:animate-in data-[state=closed]:animate-out w-[300px] rounded-2xl border-none bg-white p-0 p-5 shadow-xl'
            onEscapeKeyDown={() => setOpen(false)}
          >
            <nav className='mb-15 flex flex-col text-end'>
              {menuItems.map((item) => (
                <Link key={item.href} to={item.href} className={cn(linkClass(item.href), 'py-2')}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-2'>
              {isAuth ? (
                <Button className='bg-primary relative flex h-11 w-[70px] !p-0 text-white'>
                  <ShoppingCart className='!h-8 !w-8' />
                  <div className='bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full'>
                    {cartCount}
                  </div>
                </Button>
              ) : (
                <Button className='flex h-11 w-[169px] text-white'>В магазин</Button>
              )}

              <Button variant="pink" className=' flex h-11 w-[83px] justify-center' asChild>
                <Link to={isAuth ? '/profile' : '/login'}>
                  <img src={userSrc} alt='user' className='pt-[5px]' />
                </Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default MobileHeader;
