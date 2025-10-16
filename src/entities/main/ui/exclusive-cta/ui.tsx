// src/widgets/exclusive-cta/ui.tsx
import { Button } from '@/shared/shadcn/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type ExclusiveCtaProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  href: string;
  className?: string;
};

const ExclusiveCta: React.FC<ExclusiveCtaProps> = ({
  title = 'Выбирайте\nэксклюзивы',
  description = 'С другой стороны, реализация намеченных плановых заданий играет важную роль в формировании глубокомысленных рассуждений.',
  buttonText = 'Посмотреть эксклюзивные серии  ›',
  href,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <section className={`w-full ${className}`}>
      <div className='relative rounded-[40px] bg-[#EEF5FB] p-5 md:px-10 md:py-8'>
        <div className='flex items-center justify-between gap-6 max-md:flex-col'>
          {/* Левый заголовок */}

          <h3 className='text-dark-blue text-[32px] leading-[110%] font-bold md:whitespace-pre-line'>
            {title}
          </h3>

          {/* Текст */}
          <div className='md:w-[488px]'>
            <p className='text-secondary-text leading-[130%] md:text-lg'>{description}</p>
          </div>

          {/* Кнопка */}
          <div className='flex max-md:w-full md:justify-end'>
            <Button
              variant='default'
              onClick={() => navigate(href)}
              className='h-[56px] text-base text-white max-md:w-full md:text-[22px]'
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCta;
