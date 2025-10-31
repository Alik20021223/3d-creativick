// src/shared/ui/modal-layout.tsx
'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@shadcn/dialog';
import { cn } from '@shared/lib/utils'; // опционально

export type ModalLayoutProps = {
  /** Управляемое состояние модалки */
  open: boolean;
  onOpenChange: (v: boolean) => void;

  /** Контент */
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;

  headerClassName?: string;

  /** Кастомный футер (если передан, авто-кнопки не рисуются) */
  footer: React.ReactNode;

  /** Поведение */
  closeOnOverlay?: boolean; // по умолчанию true
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
}: ModalLayoutProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Можно оставить возможность внешнего Trigger при желании:
          <DialogTrigger asChild>...</DialogTrigger>
        */}

      <DialogContent
        className={cn('rounded-[40px] p-10 sm:max-w-2xl', className)}
        onInteractOutside={(e) => {
          if (!closeOnOverlay) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnOverlay) e.preventDefault();
        }}
      >
        {title && (
          <DialogHeader>
            {title && (
              <DialogTitle
                className={cn(
                  'text-dark-blue text-[32px] leading-[110%] font-bold',
                  headerClassName,
                )}
              >
                {title}
              </DialogTitle>
            )}
          </DialogHeader>
        )}

        {/* основной контент */}
        <div>{children}</div>

        {/* футер */}
        {footer && <DialogFooter className='min-h-14 w-full'>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export default ModalLayout;
