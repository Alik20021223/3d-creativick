import BottomContent from "@/widgets/main/bottom-content";
import MainContent from "@widgets/main/main-content";
import TopMainContent from "@widgets/main/top-main-content";

const MainPage = () => {
  return (
    <>
      <div className='w-full z-10'>
        <TopMainContent />
        <MainContent />
        <BottomContent />
        {/* <SwiperContent />
        <StatisticContent /> */}
      </div>
    </>
  );
};

export default MainPage;
