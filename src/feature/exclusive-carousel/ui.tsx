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
      {/* Контейнер для стрелок и пагинации — рендерим ВСЕГДА */}
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

          {/* Можно назвать как угодно; класс swiper-pagination не обязателен */}
          <div
            ref={pagRef}
            className={cn(
              'flex items-center gap-2', // без обязательного класса
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

      <SwiperRoot
        modules={[Pagination]}
        watchOverflow
        onBeforeInit={(s) => {
          swiperRef.current = s;

          // ✅ Мерджим, не затирая дефолтные классы
          Object.assign(s.params.pagination as PaginationOptions, {
            el: pagRef.current!,
            clickable: true,
          });

          setShowControls(!s.isLocked);
          s.on('lock', () => setShowControls(false));
          s.on('unlock', () => setShowControls(true));
          s.on('breakpoint', () => setShowControls(!s.isLocked));
          s.on('update', () => setShowControls(!s.isLocked));
        }}
        onSwiper={(s) => {
          swiperRef.current = s;

          // Если ref появится после инициализации — корректно переинициализируем
          if (pagRef.current) {
            Object.assign(s.params.pagination as PaginationOptions, {
              el: pagRef.current,
              clickable: true,
            });

            // Аккуратно: destroy только если уже была пагинация
            if (s.pagination?.el) {
              s.pagination.destroy();
            }
            s.pagination.init();
            s.pagination.render();
            s.pagination.update();
          }
        }}
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
        loop
        className='!h-[650px] overflow-visible !bg-transparent'
      >
        {items.map((product) => (
          <SwiperSlide key={product.uuid} className='!h-auto !bg-transparent'>
            <div className='px-2.5 max-xl:flex max-xl:justify-center max-md:w-full md:px-3 md:py-1'>
              <CardItem
                product={product}
                className='min-w-[355px] max-md:max-w-[355px] md:min-w-[436px]'
              />
            </div>
          </SwiperSlide>
        ))}
      </SwiperRoot>
    </div>
  );
}
