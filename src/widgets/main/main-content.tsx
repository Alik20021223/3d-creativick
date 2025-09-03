import TopThree from '@entities/main/ui/about-us/top-three';
import TopOne from '@entities/main/ui/about-us/top-one';
import TopTwo from '@entities/main/ui/about-us/top-two';
import PrinterImg from '@assets/3d-machine-pink.png';
import PhoneImg from '@assets/phone-purple.svg';
import ReelImg from '@assets/reels-red.svg';
import ReelImgBlue from '@assets/blue-reels.svg';
import GearImg from '@assets/gear-img.svg';

const MainContent = () => {
  return (
    <>
      <div className='relative z-5 mt-[180px] w-full px-10'>
        <div className='rounded-[80px] bg-white px-10 pt-[120px] pb-10'>
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
      </div>
    </>
  );
};

export default MainContent;
