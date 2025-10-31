// import ProductCarousel from '@feature/exclusive-carousel';
import OurActionsContent from '@entities/main/ui/our-actions';
import buildingImg from '@assets/building.svg';
import { marketplaces, marketplacesMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';
import ProductCarousel from '@feature/exclusive-carousel';
import { ProductCardType } from '@shared/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

interface BottomContentProps {
  interesringBlock?: boolean;
  items?: ProductCardType[];
}

const BottomContent: React.FC<BottomContentProps> = ({ interesringBlock = true, items = [] }) => {
  const isMobile = useIsMobile();

  const marketPlaceItems = isMobile ? marketplacesMobile : marketplaces;

  return (
    <>
      <section className={`${interesringBlock ? 'md:pt-20' : 'md:pt-1'} pt-15`}>
        {interesringBlock && items && (
          <div className='container-custom'>
            <h1 className='title-text px-10 max-md:pb-10 max-md:text-center 2xl:px-0'>
              Может быть интересно
            </h1>
            <ProductCarousel buttonShow={interesringBlock} items={items} />
          </div>
        )}
        <div className='container-custom px-2.5 md:px-10 2xl:px-0'>
          <OurActionsContent />
        </div>
        <div className='bg-feedback z-0 mt-[56px] rounded-t-[80px] px-2.5 py-15 md:px-10 md:pb-5 2xl:px-0'>
          <div className='container-custom mt-10 flex items-center justify-between px-2.5 pb-15 max-2xl:max-w-[calc(100vw-40px)] max-xl:flex-col max-xl:space-y-10 md:mt-16 md:mb-7 md:pb-0 xl:px-10 2xl:px-20'>
            <div className='xl:max-w-[455px]'>
              <h2 className='text-[32px] leading-[110%] font-bold text-white max-xl:text-center md:text-[54px]'>
                Где ещё купить набор 3D Креативик?
              </h2>
            </div>
            {isMobile ? (
              <>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  grabCursor
                  slidesPerView={1}
                  spaceBetween={20}
                  height={250}
                  loop
                  speed={500}
                  className='w-full'
                  pagination={{ el: '.feedback-pagination', clickable: true }}
                >
                  {marketPlaceItems.map((it) => (
                    <SwiperSlide key={it.name} className='!w-full'>
                      <a
                        href={it.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block h-[250px] w-full overflow-hidden rounded-[22px]'
                      >
                        <img
                          src={it.logo}
                          alt={it.name}
                          className='h-full w-full rounded-[22px] object-cover'
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className='feedback-pagination mt-3 flex justify-center md:hidden' />
              </>
            ) : (
              <div className='relative grid grid-cols-2 gap-2.5 md:gap-3 md:pr-10'>
                {marketPlaceItems.map((m) => (
                  <a
                    key={m.name}
                    href={m.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`h-[120px] w-[172.5px] rounded-[22px] md:h-[250px] md:w-[334px]`}
                  >
                    <img
                      src={m.logo}
                      alt={m.name}
                      className='h-full w-full rounded-[22px] md:object-cover'
                    />
                  </a>
                ))}
                <div className='pointer-events-none absolute -right-90 -bottom-40 z-0 h-[780px] w-[780px] max-xl:hidden'>
                  <img src={buildingImg} alt={buildingImg} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomContent;
