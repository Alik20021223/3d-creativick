import rosAtomImg from '@assets/rosatom-img.svg';

const TopThree = () => {
  return (
    <>
      <div className='flex w-full max-md:flex-col max-md:gap-8 items-center justify-between'>
        <div className=''>
          <h2 className='title-text'>
            При поддержке РОСАТОМ
          </h2>
          <p className='font-rosatom md:max-w-[700px] pt-5.5 md:text-lg text-base leading-[130%] font-normal'>
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
