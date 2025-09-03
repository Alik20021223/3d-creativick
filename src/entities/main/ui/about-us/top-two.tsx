// src/widgets/top-two/ui.tsx
import React from 'react';
import { topTwoMock } from '@utils/mock';
import { useInView } from '@app/hook/useInView';

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
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  // внутри компонента (до return), можно прямо рядом с JSX:
  const kitItems = topTwoMock.kit.items;
  const half = Math.ceil(kitItems.length / 2);
  const left = kitItems.slice(0, half);
  const right = kitItems.slice(half);

  return (
    <section className='relative mx-auto w-full max-w-[1540px] py-12 md:py-16'>
      <div className='flex flex-col gap-[50px]'>
        {/* A) 3D-принтер */}
        <div className='flex items-center space-x-5'>
          <article className='pink-block relative flex items-center text-white'>
            <div className='relative flex'>
              <header className='col-span-12 h-full px-8 md:col-span-6'>
                <h3 className='text-2xl font-bold md:text-3xl'>{topTwoMock.printer.title}</h3>
                <ul className='list-pill mt-3 space-y-1.5 text-sm leading-[130%] md:text-lg'>
                  {topTwoMock.printer.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>

            {/* Декор: принтер с "подъёмом" при входе в вьюпорт */}
            <div
              ref={ref}
              className={[
                'absolute -top-[85px] right-[35px] z-0 will-change-transform',
                'transition-transform duration-3000 ease-out',
                'transition-opacity', // одна строка для скорости, можно задать ту же длительность
                inView ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0',
              ].join(' ')}
            >
              {imgPrinter && (
                <img
                  src={imgPrinter}
                  alt=''
                  className='pointer-events-none h-[547px] w-[444px] select-none'
                />
              )}
            </div>
          </article>

          {/* B) Store */}
          <article className='bg-primary-active relative rounded-[20px] text-white'>
            <div className='z-10 flex h-[275px] w-[621px] items-center px-7.5 py-[36px]'>
              <header className='flex flex-col'>
                <h3 className='text-2xl font-semibold md:text-3xl'>{topTwoMock.store.title}</h3>
                <ul className='list-pill'>
                  {topTwoMock.store.items.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </header>
            </div>
            <div className='absolute -top-25 -right-13 z-10'>
              {imgPhone && (
                <img
                  src={imgPhone}
                  alt=''
                  className='pointer-events-none h-[460px] w-[429px] select-none'
                />
              )}
            </div>
          </article>
        </div>

        {/* C) Материалы */}
        <div className='flex h-[236px] space-x-4'>
          <article className='bg-primary-active relative w-[557px] rounded-[20px] text-white'>
            <div className='flex h-full items-center px-7.5 pt-5 pb-6'>
              <header className='flex w-[148px] flex-col'>
                <h3 className='text-xl font-semibold md:text-3xl'>{topTwoMock.materials.title}</h3>
                <div className='col-span-7'>
                  <ul className='list-pill'>
                    {topTwoMock.materials.items.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </div>
              </header>
            </div>
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
          </article>

          {/* D) Сервис */}
          <article className='bg-primary-active relative w-[352px] rounded-[20px] text-white'>
            <div className='flex h-full flex-col px-7.5 pt-5 pb-[58px]'>
              <h3 className='text-xl font-semibold md:text-3xl'>{topTwoMock.service.title}</h3>
              <ul className='list-pill'>
                {topTwoMock.service.items.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
            <div className='absolute top-12 right-5 z-10 h-[291px] w-[291px]'>
              {imgGear && (
                <img
                  src={imgGear}
                  alt=''
                  className='pointer-events-none h-full w-full scale-200 select-none'
                />
              )}
            </div>
          </article>

          {/* E) Комплектация */}
          <article className='bg-primary-active relative w-[470px] rounded-[20px] text-white'>
            <div className='flex h-full flex-col px-7.5 pt-5 pb-[18px]'>
              <h3 className='text-xl font-semibold md:text-3xl'>{topTwoMock.kit.title}</h3>

              {/* две колонки с промежутком */}
              <div className='flex space-x-2'>
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
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TopTwo;
