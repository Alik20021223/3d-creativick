// src/shared/ui/modal-layout.tsx
'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@shadcn/dialog';
import { cn } from '@shared/lib/utils';
import SuccessImg from '@assets/mini-bear-success.webp';

export type ModalLayoutProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  successPay?: boolean;

  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;

  footer: React.ReactNode;
  closeOnOverlay?: boolean;
};

export function ModalLayout({
  open,
  onOpenChange,
  title,
  children,
  className,
  headerClassName,
  footer,
  closeOnOverlay = true,
  successPay = false,
}: ModalLayoutProps) {
  // 🔒 Локим скролл body, пока модалка открыта
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (open) {
      document.body.style.overflow = 'hidden';

      return () => {
        // Принудительно восстанавливаем overflow при закрытии
        // Используем пустую строку, чтобы вернуть исходное значение браузера
        document.body.style.overflow = '';
      };
    } else {
      // Если модалка закрывается, сразу восстанавливаем overflow
      document.body.style.overflow = '';
    }
  }, [open]);

  // единая разметка контента без внешней обёртки
  const content = (
    <>
      {title && (
        <DialogHeader>
          <DialogTitle
            className={cn('text-dark-blue text-[32px] leading-[110%] font-bold', headerClassName)}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
      )}

      {/* основной контент */}
      <div>{children}</div>

      {/* футер */}
      {footer && <DialogFooter className='min-h-14 w-full'>{footer}</DialogFooter>}
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('rounded-[40px] p-7.5 sm:max-w-2xl md:p-10', className)}
        onInteractOutside={(e) => {
          if (!closeOnOverlay) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnOverlay) e.preventDefault();
        }}
      >
        {/* если successPay === true — оборачиваем в <div>, иначе выводим как есть */}
        {successPay ? <div className='space-y-4'>{content}</div> : content}

        {successPay && (
          <div className='hidden md:block'>
            <img src={SuccessImg} alt='success-img' />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalLayout;
