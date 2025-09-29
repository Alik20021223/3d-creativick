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
import mobileBearImg from '@assets/mobile-bear.png'

const MainContent = () => {

  const isMobile = useIsMobile()

  return (
    <>
      <div id='about' className='relative z-5 md:mt-[180px] mt-[378px] w-full md:px-10 px-2.5'>
        <div className='md:rounded-[80px] rounded-[60px] bg-white md:px-10 px-5 md:pt-[120px] pt-20 pb-10'>
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
          <div
            className="
      absolute
      -top-[380px]           /* фикс-позиция по высоте (подбери число) */
      left-1/2 -translate-x-1/2   /* центр по горизонтали */
      pointer-events-none    /* чтобы не съедал клики по контенту */
      z-10
    "
          >
            {/* контейнер медведя */}
            <div className="relative w-[608px] h-[545px]">
              <img
                src={mobileBearImg}
                alt="bear"
                className="block w-full h-full object-contain"
                draggable={false}
              />

              {/* розовая «вспышка» */}
              <img
                src={topIcon}
                alt="topIcon"
                className="absolute top-[132px] right-6 w-[127px] h-[127px] -rotate-16"
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
