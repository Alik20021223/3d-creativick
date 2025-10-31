// EmptyState.tsx
import React from 'react';
import { Button } from '@shared/shadcn/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type EmptyStateProps = {
  // контент
  title: string;
  description?: string;

  // картинка
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;

  // кнопка действия
  ctaText?: string;
  onCtaClick?: () => void;
  // либо ссылка, если нужно перейти
  to?: string; // если используешь react-router-dom

  // иконка справа у кнопки
  ctaIcon?: React.ReactNode;

  // оформление/верстка
  align?: 'left' | 'center'; // расположение контента
  wrapperClassName?: string; // кастомизация внешнего контейнера
  cardClassName?: string; // кастомизация белой карточки

  // дополнительный слот (например, вторые кнопки/подсказки)
  children?: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = 'empty-state',
  imageClassName = 'w-[252px] h-[378px]',
  ctaText,
  onCtaClick,
  to,
  ctaIcon = <ChevronRight />,
  align = 'left',
  wrapperClassName = '',
  cardClassName = '',
  children,
}) => {
  const isCentered = align === 'center';

  const Content = (
    <div
      className={`bg-secondary-white w-full space-y-[22px] rounded-[20px] p-5 md:p-10 ${cardClassName}`}
    >
      <h1 className={`title-text ${isCentered ? 'text-center' : ''}`}>{title}</h1>
      {description && (
        <p className={`description-text max-w-[700px] ${isCentered ? 'mx-auto text-center' : ''}`}>
          {description}
        </p>
      )}

      {(ctaText || children) && (
        <div className={`${isCentered ? 'mx-auto' : ''} flex w-full flex-col gap-3 md:w-[157px]`}>
          {ctaText && (
            <>
              {to ? (
                // вариант: кнопка-ссылка через переданный Link
                <Button className='h-12 w-full text-base text-white' asChild>
                  <Link to={to}>
                    {ctaText} {ctaIcon}
                  </Link>
                </Button>
              ) : (
                // вариант: обычная кнопка с onClick
                <Button className='h-12 w-full text-base text-white' onClick={onCtaClick}>
                  {ctaText} {ctaIcon}
                </Button>
              )}
            </>
          )}
          {children /* любые дополнительные экшены/подсказки */}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={
        `flex w-full items-center gap-10 px-2.5 py-15 max-md:flex-col max-md:py-5 md:px-36 ` +
        (isCentered ? 'justify-center' : '') +
        ` ${wrapperClassName}`
      }
    >
      {imageSrc && (
        <div
          className={`flex ${isCentered ? 'w-full justify-center' : 'max-md:w-full max-md:justify-center'}`}
        >
          <img src={imageSrc} alt={imageAlt} className={imageClassName} />
        </div>
      )}

      <div className={imageSrc ? 'w-full md:w-[calc(100%-252px)]' : 'w-full'}>{Content}</div>
    </div>
  );
};

export default EmptyState;
