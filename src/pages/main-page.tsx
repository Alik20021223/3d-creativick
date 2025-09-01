import MainContent from '@widgets/main/main-content';
import TopMainContent from '@widgets/main/top-main-content';

const MainPage = () => {
  return (
    <>
      <div className='z-10 w-full'>
        <TopMainContent />
        <MainContent />
        {/* <SwiperContent />
        <StatisticContent /> */}
      </div>
    </>
  );
};

export default MainPage;
