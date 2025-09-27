// feature/cart/cart-drawer.tsx
import {
    X
} from 'lucide-react';

import { Button } from '@shadcn/button';
import { ReactNode } from 'react';

type CartDrawerProps = { open: boolean; onClose: () => void, children: ReactNode };

export default function CartDrawerLayout({ open, onClose, children }: CartDrawerProps) {
    return (
        <aside
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            className={[
                // позиция: под шапкой, справа
                'fixed md:top-[78px] top-24 z-[60]',
                'w-full max-w-full px-2.5',
                'md:right-10 md:w-[520px] md:max-w-[92vw] md:px-0',
                // карточка
                'h-[calc(100vh-96px)]',
                // анимация появления/исчезновения
                'transition-all duration-250',
                open ? 'block translate-y-0 pointer-events-auto'
                    : 'hidden -translate-y-2 pointer-events-none',
            ].join(' ')}
        >
            {/* Заголовок карточки */}
            <div className='bg-secondary-white w-full rounded-[40px] flex flex-col h-full'>
                <div className="absolute right-2.5 top-2.5">
                    <Button
                        variant="link"
                        onClick={onClose}
                        aria-label="Закрыть корзину"
                        className="rounded-full p-2 transition text-primary-active"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <div className='h-full'>
                    {children}
                </div>
            </div>
        </aside>
    );
}
