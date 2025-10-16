import rosAtomImg from '@assets/rosatom-img.svg';

const TopThree = () => {
  return (
    <>
      <div className='flex w-full items-center justify-between max-md:flex-col max-md:gap-8 md:gap-20'>
        <div className=''>
          <h2 className='title-text'>При поддержке РОСАТОМ</h2>
          <p className='font-rosatom pt-5.5 text-base leading-[130%] font-normal md:max-w-[700px] md:text-lg'>
            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
            социально-демократической анафеме. Современные технологии достигли такого уровня, что
            сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
            задач.
          </p>
        </div>
        <div className='md:h-[364px]'>
          <img src={rosAtomImg} alt='rosatom' />
        </div>
      </div>
    </>
  );
};

export default TopThree;
