import { Button } from '@shared/shadcn/button';
import { ChevronRight } from 'lucide-react';

const TopOne = () => {
  return (
    <>
      <div className='flex items-start justify-between'>
        <div className=''>
          <h2 className='text-dark-blue text-[54px] font-bold'>3D Креативик — это:</h2>
          <p className='font-rosatom max-w-[700px] pt-5.5 text-lg leading-[130%] font-normal'>
            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
            социально-демократической анафеме. Современные технологии достигли такого уровня, что
            сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
            задач.
          </p>
          <div className='flex space-x-3 pt-7.5'>
            <Button className='h-[56px] px-9! text-[22px] text-white' variant='default'>
              Подробнее
              <ChevronRight />
            </Button>
            <Button className='text-dark-blue h-[56px] px-9! text-[22px]' variant='secondary'>
              В личный кабинет
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className='flex space-x-10'>
          <div>
            <p className='number-about-text text-dark-blue text-8xl font-bold'>
              &gt;
              <span className='text-secondary-text'>500</span>
            </p>
            <p className='font-semibold text-[#7D8891]'>Готовых моделей</p>
          </div>

          <div>
            <p className='number-about-text text-dark-blue text-8xl font-bold'>
              &gt;
              <span className='text-secondary-text'>16</span>
            </p>
            <p className='font-semibold text-[#7D8891]'>Различных серий</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopOne;
