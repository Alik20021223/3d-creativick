// src/widgets/benefit-card/ui.tsx
import React from 'react';
import PaperClipImg from '@assets/paperclip-img.svg';
import { useInView } from '@app/hook/useInView';

type BenefitCardProps = {
  title: string[];
  lines: string[];
  buttonText?: string;
  image?: string;
  className?: string;
  accentClassName?: string;
  staggerIndex?: number; // <- добавим для задержки анимации
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  lines,
  buttonText,
  image,
  className = '',
  accentClassName = '',
  staggerIndex = 0,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className={`group relative ${className}`}>
      {/* Скрепка: внешний слой задаёт базовый поворот, внутренний — лёгкую раскачку */}
      <div className='pointer-events-none absolute -top-[46px] right-3 z-20 h-[110.49px] w-[80.28px] origin-top-right rotate-12'>
        <img
          src={PaperClipImg}
          alt=''
          className='animate-clip-wiggle h-full w-full origin-top-right will-change-transform'
        />
      </div>

      <div
        ref={ref}
        style={{ animationDelay: `${staggerIndex * 120}ms` }}
        className={[
          'relative h-[430px] w-[353px] rounded-[24px] bg-[#F3F7FB] pt-10.5 pr-2.5 pb-5.5 pl-5',
          'flex flex-col justify-between overflow-hidden',
          // входная анимация
          inView ? 'animate-fade-up' : 'translate-y-3 opacity-0',
        ].join(' ')}
      >
        <div>
          <div className='text-dark-blue text-[32px] leading-tight font-bold'>
            {title.map((t, i) => (
              <span key={i} className='block'>
                {t}
              </span>
            ))}
          </div>

          <div className='text-secondary-text mt-4 text-lg leading-[130%] font-normal'>
            {lines.map((t, i) => (
              <span key={i} className='block'>
                {t}
              </span>
            ))}
          </div>
        </div>

        {buttonText && (
          <div className='text-secondary-text z-10 w-fit rounded-[22px] bg-white px-4.5 py-2 text-sm font-normal'>
            {buttonText}
          </div>
        )}

        {image && (
          <img
            src={image}
            alt=''
            className={`pointer-events-none absolute z-5 h-[355px] w-[368px] select-none ${accentClassName} animate-float-y`}
          />
        )}
      </div>
    </div>
  );
};

export default BenefitCard;
