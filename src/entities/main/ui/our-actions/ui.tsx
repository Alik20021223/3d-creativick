import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { ourActionsMock } from '@utils/mock';

const OurActionsContent = () => {
  return (
    <>
      <div className={`mt-30 px-10`}>
        <h1 className='text-dark-blue text-[54px] leading-[110%] font-bold'>Наши акции</h1>
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
            className='!h-[560px] !bg-transparent'
          >
            {ourActionsMock.map((p, i) => (
              <SwiperSlide key={i} className='!h-[410px]'>
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
