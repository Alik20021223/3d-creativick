// import { productCardsMock } from '@/utils/mock';
import Catalog3dContent from '@widgets/main/catalog-3d-content';
import PopularContent from '@widgets/main/popular-contant';
// import ProductCard from '@shared/components/product-card/ui';
import TopMainContent from '@widgets/main/top-main-content';

const MainPage = () => {
  return (
    <>
      <div className='z-10 h-full w-full'>
        <TopMainContent />
        <div className='relative z-[20] rounded-t-[80px] bg-white md:mt-[241px]'>
          <PopularContent />
          <Catalog3dContent />
        </div>
        {/* <MainContent /> */}

        {/* <SwiperContent />
        <StatisticContent /> */}
      </div>
    </>
  );
};

export default MainPage;
