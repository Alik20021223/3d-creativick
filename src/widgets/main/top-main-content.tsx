import { cn } from '@shared/lib/utils';
import { Button } from '@shadcn/button';
import TopMainImg from '@entities/main/ui/top-main-img';
import { useIsMobile } from '@/app/hook/useMobile';

const TopMainContent = () => {

  const isMobile = useIsMobile()

  return (
    <>
      <div className="bg-main relative w-full md:px-[83px] px-2.5 max-md:flex max-md:flex-col max-md:items-center max-md:gap-8 z-10">
        <div className='relative z-10 md:mt-[243px] mt-[80px] flex md:w-[551px] w-[355px] flex-col space-y-[47px] text-white max-md:text-center'>
          <h1 className='font-ros-bold md:text-7xl text-[46px] leading-[110%] font-bold tracking-[0px]'>
            Магазин серий
            3D-моделей
          </h1>
          <h3 className='md:text-[32px] md:max-w-[502px] text-2xl  leading-[120%] font-normal'>
            Играй, учись и создавай — вместе с Креативиком
          </h3>
          <Button variant='pink' className={cn('h-[68px] md:w-[461px] w-full md:text-[32px] text-2xl font-bold')}>
            В личный кабинет
          </Button>
        </div>
        {!isMobile && (
          <div className="absolute -top-[120px] right-0 -z-10 pointer-events-none">
            <TopMainImg />
          </div>
        )}
      </div>
    </>
  );
};

export default TopMainContent;
