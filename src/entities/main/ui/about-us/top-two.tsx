// src/widgets/top-two/ui.tsx
import React from 'react';
import { topTwoMock } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

import imgPhoneMobile from '@assets/mobile-phone.svg'

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

  const isMobile = useIsMobile()

  // внутри компонента (до return), можно прямо рядом с JSX:
  const kitItems = topTwoMock.kit.items;
  const half = Math.ceil(kitItems.length / 2);
  const left = kitItems.slice(0, half);
  const right = kitItems.slice(half);

  return (
    <section className='relative mx-auto w-full container-custom py-12 md:py-16'>
      <div className='flex flex-col md:gap-[50px] gap-5'>
        {/* A) 3D-принтер */}
        <div className='flex max-md:flex-col items-center gap-5'>
          <article className='pink-block max-md:w-[315px] relative flex items-center text-white'>
            <div className='relative flex'>
              <header className='col-span-12 h-full md:px-8 md:col-span-6'>
                <h3 className='text-2xl font-bold md:text-3xl'>{topTwoMock.printer.title}</h3>
                <ul className='list-pill'>
                  {topTwoMock.printer.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>

            {/* Декор: принтер с "подъёмом" при входе в вьюпорт */}
            <div
              className={[
                'absolute md:-top-[85px] top-[35px] -right-2.5 z-0',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {imgPrinter && (
                <img
                  src={imgPrinter}
                  alt=''
                  className='pointer-events-none md:h-[547px] md:w-[444px] w-[144px] h-[178px] select-none'
                />
              )}
            </div>

          </article>

          {/* B) Store */}
          <article className='bg-primary-active max-md:w-full relative rounded-[20px] p-5 text-white md:p-0'>
            <div className='z-10 flex md:h-[275px] md:w-[621px] w-full items-center md:px-7.5 md:py-[36px]'>
              <header className='flex flex-col'>
                <h3 className='text-2xl font-semibold md:text-3xl'>{topTwoMock.store.title}</h3>
                <ul className='list-pill'>
                  {topTwoMock.store.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>
            <div className='absolute md:-top-25 md:-right-13 -bottom-12.5 -right-7.5 z-10'>
              {imgPhone && (
                <img
                  src={isMobile ? imgPhoneMobile : imgPhone}
                  alt=''
                  className='pointer-events-none md:h-[460px] md:w-[429px] w-[167px] h-[183px] select-none'
                />
              )}
            </div>
          </article>
        </div>

        {/* C) Материалы */}
        <div className='flex md:h-[236px] max-md:flex-col md:space-x-4 space-y-5'>
          <article className='bg-primary-active relative md:w-[557px] md:h-full rounded-[20px] text-white'>
            <div className='flex h-full items-center md:px-7.5 px-5 pt-5 pb-6'>
              <header className='flex md:w-[148px] flex-col'>
                <h3 className='text-[24px] font-bold md:font-semibold md:text-3xl'>{topTwoMock.materials.title}</h3>
                <div className='col-span-7'>
                  <ul className='list-pill'>
                    {topTwoMock.materials.items.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </div>
              </header>
            </div>
            {!isMobile && <div className='absolute w-full'>
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
            }
          </article>

          {/* D) Сервис */}
          <article className='bg-primary-active relative md:w-[352px] md:h-full rounded-[20px] text-white'>
            <div className='flex h-full flex-col md:px-7.5 p-5 md:pt-5 md:pb-[58px]'>
              <h3 className='text-[24px] font-bold md:font-semibold md:text-3xl'>{topTwoMock.service.title}</h3>
              <ul className='list-pill'>
                {topTwoMock.service.items.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
            {!isMobile &&
              <div className='absolute top-12 right-5 z-10 h-[291px] w-[291px]'>
                {imgGear && (
                  <img
                    src={imgGear}
                    alt=''
                    className='pointer-events-none h-full w-full scale-200 select-none'
                  />
                )}
              </div>
            }
          </article>

          {/* E) Комплектация */}
          <article className='bg-primary-active relative md:w-[470px] md:h-full rounded-[20px] text-white'>
            <div className='flex h-full flex-col md:px-7.5 p-5 md:pt-5 md:pb-[18px]'>
              <h3 className='text-[24px] font-bold md:font-semibold md:text-3xl'>{topTwoMock.kit.title}</h3>

              {/* две колонки с промежутком */}
              {!isMobile && <div className='md:flex space-x-2 hidden'>
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
              </div>}

              {isMobile && <div className='flex space-x-2'>
                <ul className='list-pill'>
                  {topTwoMock.kit.items.map((text, i) => (
                    <li key={`${i}`}>{text}</li>
                  ))}
                </ul>
              </div>}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TopTwo;
