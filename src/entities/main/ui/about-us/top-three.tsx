import { Button } from '@shared/shadcn/button';
import { ChevronRight } from 'lucide-react';
import rosAtomImg from '@assets/rosatom-img.svg';

const TopThree = () => {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <div className=''>
          <h2 className='text-dark-blue text-[54px] leading-[110%] font-bold'>
            При поддержке РОСАТОМ
          </h2>
          <p className='font-rosatom max-w-[700px] pt-5.5 text-lg leading-[130%] font-normal'>
            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
            социально-демократической анафеме. Современные технологии достигли такого уровня, что
            сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
            задач.
          </p>
          <div className='flex space-x-3 pt-7.5'>
            <Button className='h-[56px] px-9! text-[22px] text-white' variant='default'>
              Где купить
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className='h-[364px]'>
          <img src={rosAtomImg} alt='rosatom' />
        </div>
      </div>
    </>
  );
};

export default TopThree;
