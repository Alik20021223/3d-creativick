import { ProductModelType } from '@shared/types';
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import DetailCard from '@shared/components/detail-card';
import { useRef, useState, useEffect } from 'react';
import PrevButton from '@feature/buttons-carousel/prevButton';
import NextButton from '@feature/buttons-carousel/nextButton';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/shared/lib/utils';

interface DetailsCarouselProps {
  items: ProductModelType[];
  className?: string;
  buttonShow?: boolean;
}

const DetailsCarousel: React.FC<DetailsCarouselProps> = ({ items, className = '', buttonShow }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const pagRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // 🟢 Когда pagination DOM появился — активируем Swiper перерендер
  useEffect(() => {
    if (pagRef.current) {
      setReady(true);
    }
  }, [pagRef.current]);

  return (
    <div className={`relative md:mt-10 md:px-10 2xl:px-0 ${className}`}>
      <div className='pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2'>
        <div className='pointer-events-auto flex items-center gap-3'>
          <PrevButton
            swiperRef={swiperRef}
            className={cn(
              'absolute top-1/2 -left-[60px] z-30 -translate-y-1/2',
              buttonShow && 'text-primary-active',
              !showControls && 'invisible',
            )}
          />

          <div
            ref={pagRef}
            className={cn(
              'flex items-center gap-2',
              !showControls && 'invisible',
            )}
          />

          <NextButton
            swiperRef={swiperRef}
            className={cn(
              'absolute top-1/2 -right-[60px] z-30 -translate-y-1/2',
              buttonShow && 'text-primary-active',
              !showControls && 'invisible',
            )}
          />
        </div>
      </div>

      {ready && (
        <SwiperRoot
          modules={[Pagination]}
          onSwiper={(s) => {
            swiperRef.current = s;
            setShowControls(!s.isLocked);
          }}
          loop
          onLock={() => setShowControls(false)}
          onUnlock={() => setShowControls(true)}
          pagination={{
            el: pagRef.current!,
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          // watchOverflow
          slidesPerView={1}
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
      )}
    </div>
  );
};

export default DetailsCarousel