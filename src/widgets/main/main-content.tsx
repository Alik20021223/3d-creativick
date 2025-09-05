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
import mobileBearImg from '@assets/top-mobile-bear.png'

const MainContent = () => {

  const isMobile = useIsMobile()

  return (
    <>
      <div className='relative z-5 md:mt-[180px] mt-[378px] w-full md:px-10 px-2.5'>
        <div className='md:rounded-[80px] rounded-[60px] bg-white md:px-10 px-5 pt-[120px] pb-10'>
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
          <div className="absolute -top-99 -left-52">
            <img
              src={mobileBearImg}
              alt="bear"
              className="relative z-10 block max-w-[613px] max-h-[651px]"
            />


            <img
              src={topIcon}
              alt='topIcon'
              className='absolute top-33 -right-8 mb-0 w-[127px] h-[127px] -rotate-16'
            />
          </div>
        )}

      </div>
    </>
  );
};

export default MainContent;
