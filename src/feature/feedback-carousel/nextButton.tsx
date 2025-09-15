import { Button } from '@shadcn/button';
import { SwiperButtonProps } from '@shared/types';
import { ChevronRight } from 'lucide-react';

const NextButton = ({ swiperRef, className = '' }: SwiperButtonProps & { className?: string }) => {
  return (
    <Button
      variant='outline'
      onClick={() => swiperRef.current?.slideNext()}
      className={`grid h-10 w-10 place-items-center rounded-full bg-transparent outline-2 border-none text-white hover:text-primary-active hover:bg-white ${className}`}
      aria-label='Next'
    >
      <ChevronRight className='h-5 w-5' />
    </Button>
  );
};

export default NextButton;
