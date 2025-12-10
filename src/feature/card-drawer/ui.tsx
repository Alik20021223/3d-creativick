// feature/cart/cart-drawer.tsx
import { X } from 'lucide-react';

import { Button } from '@shadcn/button';
import { ReactNode } from 'react';

type CartDrawerProps = { open: boolean; onClose: () => void; children: ReactNode };

export default function CartDrawerLayout({ open, onClose, children }: CartDrawerProps) {
  return (
    <aside
      role='dialog'
      aria-modal='true'
      aria-hidden={!open}
      className={[
        // позиция: под шапкой, справа
        'fixed top-24 z-[60] md:top-[78px]',
        'w-full max-w-full px-2.5 max-md:pb-2.5',
        'md:right-10 md:w-[520px] md:max-w-[92vw] md:px-0',
        // карточка
        'dialog-viewport-height',
        // анимация появления/исчезновения
        'transition-all duration-250',
        open
          ? 'pointer-events-auto block translate-y-0'
          : 'pointer-events-none hidden -translate-y-2',
      ].join(' ')}
    >
      {/* Заголовок карточки */}
      <div className='bg-secondary-white flex h-full w-full flex-col rounded-[40px] relative'>
        <div className='absolute top-2.5 right-2.5 z-[100]'>
          <Button
            variant='link'
            onClick={onClose}
            aria-label='Закрыть корзину'
            className='text-primary-active rounded-full p-2 transition pointer-events-auto'
          >
            <X className='h-6 w-6' />
          </Button>
        </div>

        <div className='h-full'>{children}</div>
      </div>
    </aside>
  );
}
