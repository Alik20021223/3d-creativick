import { cn } from '@shared/lib/utils';
import { Button } from '@shadcn/button';
import bottomIcon from '@assets/main-top-bottom-icon.svg';
import topIcon from '@assets/top-main-top-icon.svg';
import TopMainImg from '@entities/main/ui/top-main-img';
import { useIsMobile } from '@/app/hook/useMobile';

const TopMainContent = () => {

  const isMobile = useIsMobile()

  return (
    <>
      <div className='bg-main relative w-full md:px-[83px] px-2.5 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8'>
        <div className='relative z-10 md:mt-[245px] mt-[200px] flex md:w-[551px] w-[355px] flex-col space-y-[47px] text-white max-md:text-center'>
          <h1 className='font-ros-bold md:text-7xl text-[46px] leading-[110%] font-bold tracking-[0px]'>
            Сделай первый шаг в мир 3D!
          </h1>
          <h3 className='md:text-[32px] text-2xl  leading-[120%] font-normal'>
            Играй, учись и создавай — вместе с Креативиком
          </h3>
          <Button variant='pink' className={cn('h-[68px] md:w-[461px] w-full md:text-[32px] text-2xl font-bold')}>
            Начать моделировать
          </Button>

          <img
            src={bottomIcon}
            alt='bottomIcon'
            className='absolute md:bottom-0 md:-left-[46.05px] md:rotate-0 -bottom-8 -left-2 -rotate-[26deg]  mb-0 opacity-50'
          />
          {!isMobile &&
            <img
              src={topIcon}
              alt='topIcon'
              className='absolute -top-[92.1px] -right-[104.84px] mb-0'
            />
          }
        </div>
        {!isMobile &&
          <div className='absolute -top-[120px] right-0'>
            <TopMainImg />
          </div>
        }
      </div>
    </>
  );
};

export default TopMainContent;
