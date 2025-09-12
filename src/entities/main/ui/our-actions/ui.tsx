import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { ourActionsMock, ourActionsMockMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

const OurActionsContent = () => {

  const isMobile = useIsMobile()

  const swiperItems = isMobile ? ourActionsMockMobile : ourActionsMock

  return (
    <>
      <div className={`mt-30 max-md:my-20`}>
        <h1 className='title-text max-md:text-center'>Наши акции</h1>
        <div>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            breakpoints={{
              1024: { slidesPerView: 1 },
            }}
            speed={500}
            grabCursor
            autoHeight
            // сам Swiper — прозрачный, БЕЗ overflow-hidden
            className='md:!h-[440px] max-md:!h-auto max-md:space-y-12 !bg-transparent max-md:mt-10'
          >
            {swiperItems.map((p, i) => (
              <SwiperSlide key={i} className='md:!h-[410px] !h-auto max-md:!flex max-md:!justify-center'>
                <img src={p} alt={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default OurActionsContent;
