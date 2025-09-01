import { Button } from '@shadcn/button';
import { SwiperButtonProps } from '@shared/types';
import { ChevronRight } from 'lucide-react';

const NextButton = ({ swiperRef, className = '' }: SwiperButtonProps & { className?: string }) => {
  return (
    <Button
      variant='outline'
      onClick={() => swiperRef.current?.slideNext()}
      className={`grid h-10 w-10 place-items-center rounded-full ${className}`}
      aria-label='Next'
    >
      <ChevronRight className='h-5 w-5' />
    </Button>
  );
};

export default NextButton;
