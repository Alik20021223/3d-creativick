// src/widgets/product-carousel/ProductCarousel.tsx
import { useRef, useState } from 'react';
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import type { PaginationOptions } from 'swiper/types';
import 'swiper/swiper-bundle.css';

import CardItem from '@shared/components/card-item';
import { ProductCardType } from '@shared/types';
import PrevButton from '@feature/buttons-carousel/prevButton';
import NextButton from '@feature/buttons-carousel/nextButton';
import { cn } from '@/shared/lib/utils';

export default function ProductCarousel({
  items,
  className = '',
  buttonShow = false,
}: {
  items: ProductCardType[];
  className?: string;
  buttonShow?: boolean;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const pagRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className={`relative md:mt-10 md:px-10 2xl:px-0 ${className}`}>
      {/* Навигация и пагинация (вынесены наружу, как в DetailsCarousel) */}
      {showControls && (
        <div className='pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3'>
          <PrevButton
            swiperRef={swiperRef}
            className={cn(
              'pointer-events-auto absolute top-1/2 -left-[60px] z-30 -translate-y-1/2',
              buttonShow && 'text-primary-active',
            )}
          />

          <div
            ref={pagRef}
            className='swiper-pagination pointer-events-auto !relative !static flex !w-auto items-center gap-2'
          />

          <NextButton
            swiperRef={swiperRef}
            className={cn(
              'pointer-events-auto absolute top-1/2 -right-[60px] z-30 -translate-y-1/2',
              buttonShow && 'text-primary-active',
            )}
          />
        </div>
      )}

      <SwiperRoot
        modules={[Pagination]}
        watchOverflow
        onBeforeInit={(s) => {
          swiperRef.current = s;

          // Привязка кастомной пагинации
          const pagination = s.params.pagination as PaginationOptions;
          pagination.el = pagRef.current!;
          pagination.clickable = true;

          // На старте узнаем, «залочен» ли слайдер (т.е. слайдов мало)
          // isLocked=true, если slides <= slidesPerView на текущем брейкпоинте
          setShowControls(!s.isLocked);

          // Реакция на изменения брейкпоинтов/контента
          s.on('lock', () => setShowControls(false));
          s.on('unlock', () => setShowControls(true));
          s.on('breakpoint', () => setShowControls(!s.isLocked));
          s.on('update', () => setShowControls(!s.isLocked));
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        pagination={{ el: pagRef.current, clickable: true }}
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
        className='!h-[600px] overflow-visible !bg-transparent'
      >
        {items.map((product) => (
          <SwiperSlide key={product.uuid} className='!h-auto !bg-transparent'>
            <div className='px-2.5 max-xl:flex max-xl:justify-center max-md:w-full md:px-3 md:py-1'>
              <CardItem
                product={product}
                className='min-w-[355px] max-md:w-full md:min-w-[436px]'
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperRoot>
    </div>
  );
}
