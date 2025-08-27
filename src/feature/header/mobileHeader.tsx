'use client';

import React from 'react';
import { Button } from '@shadcn/button';
import MenuIcon from '@assets/menu-icon.svg'
import { Popover, PopoverTrigger, PopoverContent } from '@shadcn/popover';

import userSrc from '@assets/user-profile.svg'
import { headerMock } from '@utils/mock';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { ShoppingCart, XIcon } from 'lucide-react';

type MobileHeaderProps = {
    isAuth?: boolean;       // прокидывай из сессии/стора
    cartCount: number;     // количество в корзине
    linkClass: (href: string) => string;
    setOpen: (v: boolean) => void;
    open: boolean
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
    isAuth = false,
    linkClass,
    cartCount = 0,
    setOpen,
    open
    // onMenuClick,
}) => {

    const menuItems = isAuth ? headerMock.auth : headerMock.guest;

    return (
        <>
            <div className="relative z-50">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn('h-11 w-11 p-0!', open ? 'bg-[#F1F5F9]' : 'bg-primary-active')}
                            aria-label="Открыть меню"
                        >
                            {open ? <XIcon className='w-6 h-6 text-primary-active' /> : <img src={MenuIcon} alt="" className="w-6 h-6" />}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        // якорим под кнопку, но растягиваем почти на ширину экрана
                        side="bottom"
                        align="end"
                        sideOffset={20}
                        className="
            w-[300px] border-none bg-white rounded-2xl p-0 shadow-xl
            data-[state=open]:animate-in data-[state=closed]:animate-out p-5
          "
                        onEscapeKeyDown={() => setOpen(false)}
                    >
                        <nav className="flex flex-col text-end mb-15">
                            {menuItems.map((item) => (
                                <Link key={item.href} to={item.href} className={cn(linkClass(item.href), 'py-2')}>
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className='flex gap-2 items-center'>
                            {isAuth ? (
                                <Button className="relative flex h-11 w-[70px] !p-0 text-white bg-primary">
                                    <ShoppingCart className="!w-8 !h-8" />
                                    <div className="absolute -top-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-pink-active">
                                        {cartCount}
                                    </div>
                                </Button>
                            ) : (

                                <Button className="flex h-11 text-white w-[169px]">В магазин</Button>
                            )}

                            <Button
                                className="flex h-11 w-[83px] justify-center bg-pink-active"
                                asChild
                            >
                                <Link to={isAuth ? '/profile' : '/login'}>
                                    <img src={userSrc} alt="user" className="pt-[5px]" />
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
