// src/widgets/benefit-card/ui.tsx
import React from 'react';
import PaperClipImg from '@assets/paperclip-img.svg';
import { useInView } from '@app/hook/useInView';
import { useIsMobile } from '@app/hook/useMobile';

type BenefitCardProps = {
  title: string[];
  lines: string;               // <-- строка вместо string[]
  buttonText?: string;
  image?: string;
  className?: string;
  accentClassName?: string;
  staggerIndex?: number;
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
  const isMobile = useIsMobile();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const containerClass = `group relative ${isMobile ? '' : className}`;
  const enterAnimClass = !isMobile ? (inView ? 'animate-fade-up' : 'translate-y-3 opacity-0') : '';
  const floatAnimClass = !isMobile ? 'animate-float-y' : '';
  const delayedStyle = !isMobile ? { animationDelay: `${staggerIndex * 120}ms` } : undefined;

  return (
    <div className={containerClass}>
      <div className="pointer-events-none absolute -top-[46px] right-3 z-20 h-[110.49px] w-[80.28px] origin-top-right rotate-12 max-md:hidden">
        <img src={PaperClipImg} alt="" className="h-full w-full origin-top-right will-change-transform animate-clip-wiggle" />
      </div>

      <div
        ref={ref}
        style={delayedStyle}
        className={[
          'relative 2xl:h-[430px] xl:h-[539px] 2xl:w-[353px] xl:w-[288px] rounded-[24px] bg-[#F3F7FB] md:pt-10.5 md:pr-2.5 md:pb-5.5 md:pl-5 p-5',
          'flex flex-col justify-between overflow-hidden',
          enterAnimClass,
        ].join(' ')}
      >
        <div>
          <div className="text-dark-blue text-[32px] leading-tight font-bold">
            {title.map((t, i) => (
              <span key={i} className="block">{t}</span>
            ))}
          </div>

          {/* одна строка с \n — переносим через whitespace-pre-line */}
          <p className="text-secondary-text mt-4 text-lg leading-[130%] font-normal whitespace-pre-line max-xl:mb-4 max-md:mb-0">
            {lines}
          </p>
        </div>

        {buttonText && !isMobile && (
          <div className="text-secondary-text z-15 w-fit rounded-[22px] bg-white px-4.5 py-2 text-sm font-normal">
            {buttonText}
          </div>
        )}

        {image && !isMobile && (
          <img
            src={image}
            alt=""
            className={[
              'pointer-events-none absolute z-5 2xl:h-[330px] 2xl:w-[343px] xl:h-[300px] xl:w-[310px] max-md:w-[160px] max-md:h-[160px] max-xl:hidden max-md:block select-none',
              accentClassName,
            ].join(' ')}
          />
        )}
      </div>

      {image && isMobile && (
        <img
          src={image}
          alt=""
          className={[
            'pointer-events-none absolute z-5 md:h-[355px] md:w-[368px] w-[160px] h-[160px] select-none',
            accentClassName,
            floatAnimClass,
          ].join(' ')}
        />
      )}
    </div>
  );
};

export default BenefitCard;
