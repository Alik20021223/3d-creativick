import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { ourActionsMock, ourActionsMockMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

const OurActionsContent = () => {
  const isMobile = useIsMobile();

  const swiperItems = isMobile ? ourActionsMockMobile : ourActionsMock;

  return (
    <>
      <div className={`my-20`}>
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
            className='space-y-10 !bg-transparent max-md:mt-10 max-md:!h-auto max-md:space-y-12 md:!h-[calc(100%+100px)]'
          >
            {swiperItems.map((p, i) => (
              <SwiperSlide
                key={i}
                className='!h-auto max-md:!flex max-md:!justify-center md:!h-fit'
              >
                <img src={p} alt={p} className='w-full' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default OurActionsContent;
