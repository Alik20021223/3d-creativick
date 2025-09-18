// src/widgets/product/TextInstructionBlock.tsx
import { Button } from '@shadcn/button';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type Props = {
  title?: string;
  items?: string[];
  ctaText?: string;
  onOpen?: () => void;
  href?: string; // если нужно как ссылка
};

const TextInstructionBlock: React.FC<Props> = ({
  title = 'Текстовая инструкция',
  items = [
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
    'Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.',
  ],
  ctaText = 'Читать инструкцию',
  onOpen,
}) => {
  return (
    <section className='mt-10'>
      <h3 className='text-secondary-text text-xl leading-tight font-bold md:text-[22px]'>
        {title}
      </h3>

      <ol className='text-secondary-text mt-4 list-decimal space-y-5.5 pl-6 text-sm leading-relaxed'>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>

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
