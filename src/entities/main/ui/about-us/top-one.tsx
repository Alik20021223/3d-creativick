const TopOne = () => {
  return (
    <>
      <div className='flex items-start justify-between max-md:flex-col max-md:gap-10'>
        <div className=''>
          <h2 className='text-dark-blue text-[32px] font-bold md:text-[54px]'>
            3D Креативик — это:
          </h2>
          <p className='font-rosatom text-secondary-text max-w-full pt-5.5 text-base leading-[130%] font-normal md:max-w-[700px] md:text-lg'>
            Первый набор для детей с 3D-принтером, который развивает мышление и креативность через
            игру и технологии. Набор, который вдохновляет вашего ребёнка творить и открывать мир
            аддитивных технологий! Всё для увлекательной игры и обучения – в одной коробке:
            3D-принтер, пластик для печати, стартовый набор 3D-моделей, ПО, дополнительные
            аксессуары!
          </p>
        </div>
        <div className='flex space-x-10'>
          <div>
            <p className='number-about-text text-dark-blue text-[54px] font-bold md:text-8xl'>
              &gt;
              <span className='text-secondary-text'>500</span>
            </p>
            <p className='text-base font-normal text-[#7D8891] md:text-2xl md:font-semibold'>
              Готовых моделей
            </p>
          </div>

          <div>
            <p className='number-about-text text-dark-blue text-[54px] font-bold md:text-8xl'>
              &gt;
              <span className='text-secondary-text'>16</span>
            </p>
            <p className='text-base font-normal text-[#7D8891] md:text-2xl md:font-semibold'>
              Различных серий
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopOne;
