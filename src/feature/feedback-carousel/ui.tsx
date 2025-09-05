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

export default function FeedbackCarousel({
  items,
}: {
  items: Item[];
  className?: string;
}) {
  const isMobile = useIsMobile();
  const swiperRef = useRef<SwiperType | null>(null);

  const CARD_W = isMobile ? 355 : 420;
  const GAP = 20;
  const VISIBLE = isMobile ? 1 : 3;
  const INNER_W = VISIBLE * CARD_W + (VISIBLE - 1) * GAP;

  // const swiperModules = isMobile ? [Pagination, Autoplay] : [Navigation, Autoplay];

  return (
    <div className="relative">
      {/* стрелки скрыты на мобилке */}
      <PrevButton
        swiperRef={swiperRef}
        className="hidden md:block md:absolute md:top-1/2 md:-left-15 md:z-30 md:-translate-y-1/2"
      />
      <NextButton
        swiperRef={swiperRef}
        className="hidden md:block md:absolute md:top-1/2 md:-right-15 md:z-30 md:-translate-y-1/2"
      />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // ВСЕГДА подключены
        onSwiper={(s) => (swiperRef.current = s)}
        slidesPerView={1}
        spaceBetween={GAP}
        grabCursor
        autoHeight
        loop
        style={{ maxWidth: `${INNER_W}px` }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        // пагинация включена только на мобилке
        pagination={isMobile && { clickable: true }}
        className='max-md:!h-[280px] feedback-carousel'
      >
        {items.map((it, i) => (
          <SwiperSlide key={i} className="!h-auto md:!w-[420px] !w-[355px]">
            <FeedBackBlock
              rating={Math.round(it.rating)}
              text={it.text}
              authorName={it.authorName}
              authorRole={it.authorRole}
              avatarUrl={it.avatarUrl}
              className="h-full w-full md:w-[420px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
