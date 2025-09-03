// src/widgets/product-carousel/ProductCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import CardItem from '@shared/components/card-item';
import { ProductCardMock } from '@shared/types';

export default function ProductCarousel({
  items,
  className = '',
}: {
  items: ProductCardMock[];
  className?: string;
}) {
  return (
    // ВНЕШНЯЯ ПЛИТА: белый фон + скругление
    <div className={`rounded-[60px] bg-white ${className}`}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        // slidesPerView={1.1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        speed={500}
        grabCursor
        autoHeight
        // сам Swiper — прозрачный, БЕЗ overflow-hidden
        className='!h-[600px] overflow-visible !bg-transparent'
      >
        {items.map((p, i) => (
          <SwiperSlide key={i} className='!h-auto !bg-transparent'>
            <div className='px-3 py-1'>
              <CardItem
                image={p.image}
                title={p.title}
                rating={p.rating}
                bought={p.bought}
                href={p.href}
                className='w-[476px] max-w-full'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
