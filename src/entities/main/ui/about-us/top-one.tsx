const TopOne = () => {
  return (
    <>
      <div className='flex max-md:flex-col max-md:gap-10 items-start justify-between'>
        <div className=''>
          <h2 className='text-dark-blue md:text-[54px] text-[32px] font-bold'>3D Креативик — это:</h2>
          <p className='font-rosatom md:max-w-[700px] max-w-full pt-5.5 md:text-lg text-base leading-[130%] font-normal text-secondary-text'>
            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
            социально-демократической анафеме. Современные технологии достигли такого уровня, что
            сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
            задач.
          </p>
        </div>
        <div className='flex space-x-10'>
          <div>
            <p className='number-about-text text-dark-blue md:text-8xl text-[54px] font-bold'>
              &gt;
              <span className='text-secondary-text'>500</span>
            </p>
            <p className='md:font-semibold font-normal md:text-2xl text-base text-[#7D8891]'>Готовых моделей</p>
          </div>

          <div>
            <p className='number-about-text text-dark-blue md:text-8xl text-[54px] font-bold'>
              &gt;
              <span className='text-secondary-text'>16</span>
            </p>
            <p className='md:font-semibold font-normal md:text-2xl text-base text-[#7D8891]'>Различных серий</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopOne;
