import { cn } from '@shared/lib/utils';
import { Button } from '@shadcn/button';
import bottomIcon from '@assets/main-top-bottom-icon.svg';
import topIcon from '@assets/top-main-top-icon.svg';
import TopMainImg from '@entities/main/ui/top-main-img';

const TopMainContent = () => {
  return (
    <>
      <div className='bg-main relative w-full px-[83px]'>
        <div className='relative z-10 mt-[245px] flex w-[551px] flex-col space-y-[47px] text-white'>
          <h1 className='font-ros-bold text-7xl leading-[110%] font-bold tracking-[0px]'>
            Сделай первый шаг в мир 3D!
          </h1>
          <h3 className='text-[32px] leading-[120%] font-normal'>
            Играй, учись и создавай — вместе с Креативиком
          </h3>
          <Button variant='pink' className={cn('h-[68px] w-[461px] text-[32px] font-bold')}>
            Начать моделировать
          </Button>
          <img
            src={bottomIcon}
            alt='bottomIcon'
            className='absolute bottom-0 -left-[46.05px] mb-0 opacity-50'
          />
          <img
            src={topIcon}
            alt='topIcon'
            className='absolute -top-[92.1px] -right-[104.84px] mb-0'
          />
        </div>
        <div className='absolute -top-[120px] right-0'>
          <TopMainImg />
        </div>
      </div>
    </>
  );
};

export default TopMainContent;
