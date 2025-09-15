// PrevButton.tsx
import { ChevronLeft } from 'lucide-react';
import { SwiperButtonProps } from '@shared/types';
import { Button } from '@shadcn/button';

const PrevButton = ({ swiperRef, className = '' }: SwiperButtonProps & { className?: string }) => (
  <Button
    variant="outline"
    onClick={() => swiperRef.current?.slidePrev()}
    className={`grid h-10 w-10 place-items-center rounded-full bg-transparent text-white hover:text-primary-active hover:bg-white outline-2  ${className}`}
    aria-label='Prev'
  >
    <ChevronLeft className='h-5 w-5' />
  </Button>
);
export default PrevButton;

// NextButton.tsx — аналогично с ChevronRight
