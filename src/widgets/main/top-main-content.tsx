import { cn } from '@shared/lib/utils';
import { Button } from '@shadcn/button';
import bottomIcon from '@assets/main-top-bottom-icon.svg';
import topIcon from '@assets/top-main-top-icon.svg';
import TopMainImg from '@entities/main/ui/top-main-img';
import { useIsMobile } from '@/app/hook/useMobile';

const TopMainContent = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className='bg-main relative w-full px-2.5 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8 md:px-[83px]'>
        <div className='relative z-10 mt-[80px] flex w-[355px] flex-col space-y-[47px] text-white max-md:text-center md:mt-[245px] md:w-[551px]'>
          <h1 className='font-ros-bold text-[46px] leading-[110%] font-bold tracking-[0px] md:text-7xl'>
            Сделай первый шаг в мир 3D!
          </h1>
          <h3 className='text-2xl leading-[120%] font-normal md:text-[32px]'>
            Играй, учись и создавай — вместе с Креативиком
          </h3>
          <Button
            variant='pink'
            className={cn('h-[68px] w-full text-2xl font-bold md:w-[461px] md:text-[32px]')}
          >
            Начать моделировать
          </Button>

          <img
            src={bottomIcon}
            alt='bottomIcon'
            className='absolute -bottom-8 -left-2 mb-0 -rotate-[26deg] opacity-50 md:bottom-0 md:-left-[46.05px] md:rotate-0'
          />
          {!isMobile && (
            <img
              src={topIcon}
              alt='topIcon'
              className='absolute -top-[92.1px] -right-[104.84px] mb-0'
            />
          )}
        </div>
        {!isMobile && (
          <div className='absolute -top-[120px] right-0'>
            <TopMainImg />
          </div>
        )}
      </div>
    </>
  );
};

export default TopMainContent;
