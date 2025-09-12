import { cn } from '@shared/lib/utils';
import { Button } from '@shadcn/button';
import TopMainImg from '@entities/main/ui/top-main-img';
import { useIsMobile } from '@/app/hook/useMobile';

const TopMainContent = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className='bg-main relative z-10 w-full px-2.5 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8 md:px-[83px]'>
        <div className='relative z-10 mt-[80px] flex w-[355px] flex-col space-y-[47px] text-white max-md:text-center md:mt-[243px] md:w-[551px]'>
          <h1 className='font-ros-bold text-[46px] leading-[110%] font-bold tracking-[0px] md:text-7xl'>
            Магазин серий 3D-моделей
          </h1>
          <h3 className='text-2xl leading-[120%] font-normal md:max-w-[502px] md:text-[32px]'>
            Играй, учись и создавай — вместе с Креативиком
          </h3>
          <Button
            variant='pink'
            className={cn('h-[68px] w-full text-2xl font-bold md:w-[461px] md:text-[32px]')}
          >
            В личный кабинет
          </Button>
        </div>
        {!isMobile && (
          <div className='pointer-events-none absolute -top-[120px] right-0 -z-10'>
            <TopMainImg />
          </div>
        )}
      </div>
    </>
  );
};

export default TopMainContent;
