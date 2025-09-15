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
import TgIcon from '@assets/tg-icon.svg';
import VkIcon from '@assets/vk-icon.svg';

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
            className='data-[state=open]:animate-in data-[state=closed]:animate-out w-[300px] rounded-2xl border-none bg-secondary-active p-0 p-5 shadow-xl'
            onEscapeKeyDown={() => setOpen(false)}
          >
            <nav className='mb-10 flex flex-col text-end'>
              {menuItems.map((item) => (
                <Link key={item.href} to={item.href} className={cn(linkClass(item.href), 'py-2')}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 w-full mb-10">
              {isAuth && (
                <div className="flex-1">
                  <Button className="w-full h-11 relative bg-primary !p-0 text-white">
                    <ShoppingCart className="!h-8 !w-8" />
                    <div className="bg-pink-active absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full">
                      {cartCount}
                    </div>
                  </Button>
                </div>
              )}

              <div className="flex-1">
                <Button variant="pink" asChild className="w-full h-11 justify-center">
                  <Link to={isAuth ? '/profile' : '/login'}>
                    <img src={userSrc} alt="user" className="pt-[5px]" />
                  </Link>
                </Button>
              </div>
            </div>


            <div className='flex flex-col gap-3'>
              <div className="flex flex-col items-center md:items-start text-secondary-text space-y-3">
                {/* размер для мобилки */}
                <a
                  href="mailto:info@3dkreativik.ru"
                  className="text-base md:text-[22px] hover:underline"
                >
                  info@3dkreativik.ru
                </a>
                <a href="tel:+84959888282" className="text-base md:text-[22px]">
                  8 (495) 988-82-82
                </a>
              </div>

              <div className="flex justify-center md:justify-start gap-3">
                <a
                  aria-label="VK"
                  href="/"
                  className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white"
                >
                  <img src={VkIcon} alt="vk" className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a
                  aria-label="Telegram"
                  href="/"
                  className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white"
                >
                  <img src={TgIcon} alt="tg" className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </div>
            </div>


          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default MobileHeader;
