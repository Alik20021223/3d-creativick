import { DialogHeader, DialogTitle, DialogClose } from '@shadcn/dialog';
import { XIcon } from 'lucide-react';
import { ReactNode } from 'react';

type StepLayoutProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

const StepLayout: React.FC<StepLayoutProps> = ({ title, children, footer }) => {
  return (
    <div className='relative'>
      <DialogHeader className='relative mb-3 text-left'>
        <DialogTitle className='pr-12 text-[32px] leading-[38px] font-bold'>{title}</DialogTitle>

        {/* ЕДИНСТВЕННАЯ кнопка закрытия, позиционируем абсолютно */}
        <DialogClose className='absolute top-0 right-0 grid h-[41px] w-[41px] place-items-center rounded-full bg-[rgb(153,61,225)]'>
          <XIcon className='h-4 w-4' />
        </DialogClose>
      </DialogHeader>

      {/* контент шага */}
      <div className='space-y-5'>{children}</div>

      {/* опциональный футер шага (кнопки “Далее/Назад” и т.п.) */}
      {footer ? <footer className='rbxsell-purchase-footer mt-5'>{footer}</footer> : null}
    </div>
  );
};

export default StepLayout;
