// src/widgets/top-two/ui.tsx
import React from 'react';
import { topTwoMock } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

import imgPhoneMobile from '@assets/mobile-phone.svg';

type TopTwoProps = {
  imgPrinter?: string;
  imgPhone?: string;
  imgReels?: string;
  imgGear?: string;
  imgReelsBlue?: string;
};

const TopTwo: React.FC<TopTwoProps> = ({
  imgPrinter,
  imgPhone,
  imgReels,
  imgReelsBlue,
  imgGear,
}) => {
  const isMobile = useIsMobile();

  // внутри компонента (до return), можно прямо рядом с JSX:
  const kitItems = topTwoMock.kit.items;
  const half = Math.ceil(kitItems.length / 2);
  const left = kitItems.slice(0, half);
  const right = kitItems.slice(half);

  return (
    <section className='container-custom relative mx-auto w-full py-12 md:py-16'>
      <div className='flex flex-col gap-5 md:gap-[50px]'>
        {/* A) 3D-принтер */}
        <div className='flex items-center gap-5 max-md:flex-col'>
          <article className='pink-block relative flex items-center text-white max-md:w-[315px]'>
            <div className='relative flex'>
              <header className='col-span-12 h-full md:col-span-6 md:px-8'>
                <h3 className='text-2xl font-bold md:text-3xl'>{topTwoMock.printer.title}</h3>
                <ul className='list-pill list-pill--narrow-last-two'>
                  {topTwoMock.printer.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>

            {/* Декор: принтер с "подъёмом" при входе в вьюпорт */}
            <div
              className={['absolute top-[75px] -right-2.5 z-0 md:-top-[85px]']
                .filter(Boolean)
                .join(' ')}
            >
              {imgPrinter && (
                <img
                  src={imgPrinter}
                  alt=''
                  className='pointer-events-none h-[178px] w-[144px] select-none md:h-[547px] md:w-[444px]'
                />
              )}
            </div>
          </article>

          {/* B) Store */}
          <article className='bg-primary-active relative rounded-[20px] p-5 text-white max-md:w-full md:p-0'>
            <div className='z-10 flex w-full items-center md:h-[275px] md:w-[621px] md:px-7.5 md:py-[36px]'>
              <header className='flex flex-col'>
                <h3 className='text-2xl font-semibold md:text-3xl'>{topTwoMock.store.title}</h3>
                <ul className='list-pill'>
                  {topTwoMock.store.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>
            <div className='absolute -right-7.5 -bottom-12.5 z-10 md:-top-25 md:-right-13'>
              {imgPhone && (
                <img
                  src={isMobile ? imgPhoneMobile : imgPhone}
                  alt=''
                  className='pointer-events-none h-[183px] w-[167px] select-none md:h-[460px] md:w-[429px]'
                />
              )}
            </div>
          </article>
        </div>

        {/* C) Материалы */}
        <div className='flex space-y-5 max-md:flex-col md:h-[236px] md:space-x-4'>
          <article className='bg-primary-active relative rounded-[20px] text-white md:h-full md:w-[557px]'>
            <div className='flex h-full items-center px-5 pt-5 pb-6 md:px-7.5'>
              <header className='flex flex-col md:w-[148px]'>
                <h3 className='text-[24px] font-bold md:text-3xl md:font-semibold'>
                  {topTwoMock.materials.title}
                </h3>
                <div className='col-span-7'>
                  <ul className='list-pill'>
                    {topTwoMock.materials.items.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </div>
              </header>
            </div>
            {!isMobile && (
              <div className='absolute w-full'>
                <div className='relative w-full'>
                  {imgReelsBlue && (
                    <img
                      src={imgReelsBlue}
                      alt=''
                      className='pointer-events-none absolute right-40 -bottom-8 h-[161px] w-[163px] select-none'
                    />
                  )}
                  {imgReels && (
                    <img
                      src={imgReels}
                      alt=''
                      className='pointer-events-none absolute -right-2.5 -bottom-2 h-[225px] w-[214px] select-none'
                    />
                  )}
                </div>
              </div>
            )}
          </article>

          {/* D) Сервис */}
          <article className='bg-primary-active relative rounded-[20px] text-white md:h-full md:w-[352px]'>
            <div className='flex h-full flex-col p-5 md:px-7.5 md:pt-5 md:pb-[58px]'>
              <h3 className='text-[24px] font-bold md:text-3xl md:font-semibold'>
                {topTwoMock.service.title}
              </h3>
              <ul className='list-pill'>
                {topTwoMock.service.items.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
            {!isMobile && (
              <div className='absolute top-12 right-5 z-10 h-[291px] w-[291px]'>
                {imgGear && (
                  <img
                    src={imgGear}
                    alt=''
                    className='pointer-events-none h-full w-full scale-200 select-none'
                  />
                )}
              </div>
            )}
          </article>

          {/* E) Комплектация */}
          <article className='bg-primary-active relative rounded-[20px] text-white md:h-full md:w-[470px]'>
            <div className='flex h-full flex-col p-5 md:px-7.5 md:pt-5 md:pb-[18px]'>
              <h3 className='text-[24px] font-bold md:text-3xl md:font-semibold'>
                {topTwoMock.kit.title}
              </h3>

              {/* две колонки с промежутком */}
              {!isMobile && (
                <div className='hidden space-x-2 md:flex'>
                  <ul className='list-pill'>
                    {left.map((text, i) => (
                      <li key={`left-${i}`}>{text}</li>
                    ))}
                  </ul>

                  <ul className='list-pill'>
                    {right.map((text, i) => (
                      <li key={`right-${i}`}>{text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isMobile && (
                <div className='flex space-x-2'>
                  <ul className='list-pill'>
                    {topTwoMock.kit.items.map((text, i) => (
                      <li key={`${i}`}>{text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TopTwo;
