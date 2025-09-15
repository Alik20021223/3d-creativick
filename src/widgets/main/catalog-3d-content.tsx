import CatalogGrid from '@entities/main/ui/catolog-items/ui';
import { CATEGORIES } from '@utils/mock';
import { useRef, useState } from 'react';

const Catalog3dContent = () => {
  const [active, setActive] = useState<string>('Категория 3');
  const topRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={topRef} className='relative bg-white'>
      {/* градиент фона */}
      <div className='absolute inset-0 rounded-t-[80px] bg-catalog ' />
      <div className='container-custom relative z-10 w-full md:px-10 py-20 px-2.5'>
        {/* заголовок и подзаголовок */}
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Десктопный заголовок */}
          <h1 className="hidden md:block title-text text-white text-[48px] font-extrabold">
            Каталог 3D-моделей
          </h1>

          {/* Мобильный заголовок */}
          <h1 className="md:hidden text-white font-extrabold text-[32px] leading-tight">
            Каталог <br />
            <span >3D-моделей</span>
          </h1>

          <p className="max-w-[902px] text-white text-base md:text-lg leading-relaxed">
            В частности, разбавленное изрядной долей эмпатии, рациональное мышление
            предоставляет широкие возможности для экспериментов, поражающих по своей
            масштабности и грандиозности
          </p>
        </div>


        {/* чипы-категории */}
        <div
          className="
            mx-auto mt-6 
            max-w-[902px] 
            items-center justify-center 
            gap-3 md:mt-8 md:gap-4
            grid grid-cols-2
            md:flex md:flex-wrap
          "
        >
          {CATEGORIES.map((name) => {
            const isActive = name === active;
            return (
              <div className='flex justify-center'>
                <button
                  key={name}
                  onClick={() => setActive(name)}
                  className={[
                    'cursor-pointer rounded-[12px] text-sm leading-[130%] select-none px-5.5 md:py-[8.5px] md:text-lg py-[9.5px]',
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
