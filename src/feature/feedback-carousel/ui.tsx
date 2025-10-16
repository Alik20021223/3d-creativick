import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import FeedBackBlock from '@feature/feedback-block';
import PrevButton from './prevButton';
import NextButton from './nextButton';
import { useIsMobile } from '@/app/hook/useMobile';

type Item = {
  rating: number;
  text: string;
  authorName: string;
  authorRole?: string;
  avatarUrl?: string;
};

export default function FeedbackCarousel({ items }: { items: Item[]; className?: string }) {
  const isMobile = useIsMobile();
  const swiperRef = useRef<SwiperType | null>(null);

  // const CARD_W = isMobile ? 355 : 420;
  // const VISIBLE = isMobile ? 1 : 3;
  // const INNER_W = VISIBLE * CARD_W + (VISIBLE - 1) * 20;

  // const swiperModules = isMobile ? [Pagination, Autoplay] : [Navigation, Autoplay];

  return (
    <div className='relative mx-auto max-w-[calc(100%-120px)]'>
      {/* стрелки */}
      <PrevButton
        swiperRef={swiperRef}
        className='hidden md:absolute md:top-1/2 md:-left-[60px] md:z-30 md:block md:-translate-y-1/2'
      />
      <NextButton
        swiperRef={swiperRef}
        className='hidden md:absolute md:top-1/2 md:-right-[60px] md:z-30 md:block md:-translate-y-1/2'
      />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(s) => (swiperRef.current = s)}
        spaceBetween={20}
        grabCursor
        autoHeight
        loop
        speed={500}
        breakpoints={{
          768: { slidesPerView: 1, spaceBetween: 20 },
          1080: { slidesPerView: 2, spaceBetween: 20 },
          1440: { slidesPerView: 3, spaceBetween: 24 },
        }}
        pagination={isMobile ? { el: '.feedback-pagination', clickable: true } : false}
        className='feedback-carousel'
      >
        {items.map((it, i) => (
          <SwiperSlide key={i} className='max-md:!h-full max-md:max-h-[400px] md:!h-full'>
            <FeedBackBlock
              rating={Math.round(it.rating)}
              text={it.text}
              authorName={it.authorName}
              authorRole={it.authorRole}
              avatarUrl={it.avatarUrl}
              className='h-full w-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='feedback-pagination mt-3 flex justify-center md:hidden' />
    </div>
  );
}
