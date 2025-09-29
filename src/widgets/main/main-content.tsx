import TopThree from '@entities/main/ui/about-us/top-three';
import TopOne from '@entities/main/ui/about-us/top-one';
import TopTwo from '@entities/main/ui/about-us/top-two';
import PrinterImg from '@assets/3d-machine-pink.png';
import PhoneImg from '@assets/phone-purple.svg';
import ReelImg from '@assets/reels-red.svg';
import ReelImgBlue from '@assets/blue-reels.svg';
import GearImg from '@assets/gear-img.png';
import { useIsMobile } from '@app/hook/useMobile';
import topIcon from '@assets/top-main-top-icon.svg';
import mobileBearImg from '@assets/mobile-bear.png';

const MainContent = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div id='about' className='relative z-5 mt-[378px] w-full px-2.5 md:mt-[180px] md:px-10'>
        <div className='rounded-[60px] bg-white px-5 pt-20 pb-10 md:rounded-[80px] md:px-10 md:pt-[120px]'>
          <TopOne />
          <TopTwo
            imgPrinter={PrinterImg}
            imgPhone={PhoneImg}
            imgReels={ReelImg}
            imgReelsBlue={ReelImgBlue}
            imgGear={GearImg}
          />
          <TopThree />
        </div>
        {isMobile && (
          <div className='/* фикс-позиция по высоте (подбери число) */ /* центр по горизонтали */ /* чтобы не съедал клики по контенту */ pointer-events-none absolute -top-[380px] left-1/2 z-10 -translate-x-1/2'>
            {/* контейнер медведя */}
            <div className='relative h-[545px] w-[608px]'>
              <img
                src={mobileBearImg}
                alt='bear'
                className='block h-full w-full object-contain'
                draggable={false}
              />

              {/* розовая «вспышка» */}
              <img
                src={topIcon}
                alt='topIcon'
                className='absolute top-[132px] right-6 h-[127px] w-[127px] -rotate-16'
                draggable={false}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainContent;
