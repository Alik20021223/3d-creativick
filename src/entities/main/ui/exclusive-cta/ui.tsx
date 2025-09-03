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
    <section className={`w-full px-10 ${className}`}>
      <div className='relative rounded-[40px] bg-[#EEF5FB] px-6 py-6 md:px-10 md:py-8'>
        <div className='flex items-center justify-between gap-6'>
          {/* Левый заголовок */}
          <div className=''>
            <h3 className='text-dark-blue text-[32px] leading-[110%] font-bold whitespace-pre-line'>
              {title}
            </h3>
          </div>

          {/* Текст */}
          <div className='w-[488px]'>
            <p className='text-secondary-text leading-[130%] md:text-lg'>{description}</p>
          </div>

          {/* Кнопка */}
          <div className='flex md:justify-end'>
            <div className='relative'>
              <Button
                variant='default'
                onClick={() => navigate(href)}
                className='h-[56px] text-[22px] text-white'
              >
                {buttonText}
              </Button>
              {/* мягкое свечение под кнопкой */}
              <span className='pointer-events-none absolute inset-x-3 -bottom-3 h-6 rounded-full bg-[#1177CF]/25 blur-2xl' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveCta;
