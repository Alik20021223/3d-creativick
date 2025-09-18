import { DetailCardType, ProductCardType } from '@shared/types';
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import DetailCard from '@shared/components/detail-card';
import { useRef } from 'react';
import PrevButton from '@feature/buttons-carousel/prevButton';
import NextButton from '@feature/buttons-carousel/nextButton';
import type { Swiper as SwiperType } from 'swiper';
import { PaginationOptions } from 'swiper/types';

interface DetailsCarouselProps {
  items: DetailCardType[] | ProductCardType[];
  className?: string;
}

const DetailsCarousel: React.FC<DetailsCarouselProps> = ({ items, className }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const pagRef = useRef<HTMLDivElement | null>(null);

  return (
    // ВНЕШНЯЯ ПЛИТА: белый фон + скругление
    <div className={`relative md:mt-10 md:px-10 2xl:px-0 ${className}`}>
      <div className='pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3'>
        <PrevButton
          swiperRef={swiperRef}
          className='pointer-events-auto absolute top-1/2 -left-[60px] z-30 -translate-y-1/2'
        />

        <div
          ref={pagRef}
          className='swiper-pagination pointer-events-auto !relative !static flex !w-auto items-center gap-2'
        />

        <NextButton
          swiperRef={swiperRef}
          className='pointer-events-auto absolute top-1/2 -right-[60px] z-30 -translate-y-1/2'
        />
      </div>
      <SwiperRoot
        modules={[Pagination]}
        onBeforeInit={(s) => {
          swiperRef.current = s;

          // привели к PaginationOptions, теперь TS знает про поля
          const pagination = s.params.pagination as PaginationOptions;
          pagination.el = pagRef.current!;
          pagination.clickable = true;
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        pagination={{ el: pagRef.current, clickable: true }}
        slidesPerView={1} // базово 1; при брейкпоинтах больше
        spaceBetween={16}
        breakpoints={{
          1080: { slidesPerView: 2, spaceBetween: 20 },
          1440: { slidesPerView: 3, spaceBetween: 20 },
          1540: { slidesPerView: 3, spaceBetween: 24 },
        }}
        speed={500}
        grabCursor
        autoHeight
        className='overflow-visible !bg-transparent max-md:!h-[560px] md:!h-[600px]'
      >
        {items.map((p, i) => (
          <SwiperSlide key={i} className='!h-auto !bg-transparent'>
            <div className='px-2.5 max-xl:flex max-xl:justify-center max-md:w-full md:px-3 md:py-1'>
              <DetailCard data={p} />
            </div>
          </SwiperSlide>
        ))}
      </SwiperRoot>
    </div>
  );
};

export default DetailsCarousel;
