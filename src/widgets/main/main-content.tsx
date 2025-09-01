import TopThree from '@entities/main/ui/about-us/top-three';
import TopOne from '@entities/main/ui/about-us/top-one';
// import TopTwo from "@entities/main/ui/about-us/top-two";

const MainContent = () => {
  return (
    <>
      <div className='relative z-5 mt-[180px] w-full px-10'>
        <div className='rounded-[80px] bg-white px-10 pt-[120px] pb-10'>
          <TopOne />
          <TopThree />

          {/* <TopTwo
                        imgPrinter={printer}
                        imgPhone={phone}
                        imgReels={reels}
                        imgGear={gear}
                    /> */}
        </div>
      </div>
    </>
  );
};

export default MainContent;
