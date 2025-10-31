// src/widgets/product/TextInstructionBlock.tsx
import { Button } from '@shadcn/button';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type Props = {
  ctaText?: string;
  onOpen?: () => void;
};

const TextInstructionBlock: React.FC<Props> = ({ ctaText = 'Скачать инструкцию', onOpen }) => {
  return (
    <section className='mt-10'>
      <div className='mt-5.5'>
        <Button
          onClick={onOpen}
          className='inline-flex h-[56px] w-[300px] items-center gap-2 rounded-full text-white max-md:w-full'
        >
          <span className='text-lage leading-[130%] md:text-[22px]'>{ctaText}</span>
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default TextInstructionBlock;
