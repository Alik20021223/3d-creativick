// PrevButton.tsx
import { ChevronLeft } from 'lucide-react';
import { SwiperButtonProps } from '@shared/types';
import { Button } from '@shadcn/button';

const PrevButton = ({ swiperRef, className = '' }: SwiperButtonProps & { className?: string }) => (
  <Button
    variant='outline'
    onClick={() => swiperRef.current?.slidePrev()}
    className={`hover:text-primary-active grid h-10 w-10 place-items-center rounded-full bg-transparent text-white outline-2 hover:bg-white ${className}`}
    aria-label='Prev'
  >
    <ChevronLeft className='h-5 w-5' />
  </Button>
);
export default PrevButton;

// NextButton.tsx — аналогично с ChevronRight
