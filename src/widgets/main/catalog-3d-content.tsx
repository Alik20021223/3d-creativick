import CatalogGrid from '@entities/main/ui/catolog-items/ui';
import { CATEGORIES } from '@utils/mock';
import { useRef, useState } from 'react';

const Catalog3dContent = () => {
  const [active, setActive] = useState<string>('Категория 3');
  const topRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={topRef} className='relative'>
      {/* градиент фона */}
      <div className='bg-catalog absolute inset-0 rounded-t-[80px]' />
      <div className='container-custom relative z-10 w-full px-2.5 py-20 md:px-10 2xl:px-0'>
        {/* заголовок и подзаголовок */}
        <div className='flex flex-col items-center space-y-4 text-center'>
          {/* Десктопный заголовок */}
          <h1 className='title-text hidden text-[48px] font-extrabold text-white md:block'>
            Каталог 3D-моделей
          </h1>

          {/* Мобильный заголовок */}
          <h1 className='text-[32px] leading-tight font-extrabold text-white md:hidden'>
            Каталог <br />
            <span>3D-моделей</span>
          </h1>

          <p className='max-w-[902px] description-text leading-relaxed text-white '>
            В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет
            широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности
          </p>
        </div>

        {/* чипы-категории */}
        <div className='mx-auto mt-6 grid max-w-[902px] grid-cols-2 items-center justify-center gap-3 md:mt-8 md:flex md:flex-wrap md:gap-4'>
          {CATEGORIES.map((name) => {
            const isActive = name === active;
            return (
              <div className='flex justify-center'>
                <button
                  key={name}
                  onClick={() => setActive(name)}
                  className={[
                    'cursor-pointer rounded-[12px] px-5.5 py-[9.5px] text-sm leading-[130%] select-none md:py-[8.5px] md:text-lg',
                    'transition-colors duration-200',
                    isActive ? 'bg-primary-active text-white' : 'text-secondary-text bg-white',
                  ].join(' ')}
                >
                  {name}
                </button>
              </div>
            );
          })}
        </div>

        <CatalogGrid topRef={topRef} />
      </div>
    </section>
  );
};

export default Catalog3dContent;
