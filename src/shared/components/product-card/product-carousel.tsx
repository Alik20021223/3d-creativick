import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { GalleriesType } from '@shared/types';

interface ProductCarouselImageProps {
  images: GalleriesType[];
  category?: string[];
}

const ProductCarouselImage: React.FC<ProductCarouselImageProps> = ({ images, category }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      {/* ВЕРХНИЙ БЛОК С КАРУСЕЛЬЮ */}
      <div className='relative p-2.5'>
        {/* Кастомные стрелки */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            swiperRef.current?.slidePrev();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          className='bg-secondary-white absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-md p-2 shadow-md'
          aria-label='Назад'
        >
          <ChevronLeft className='h-4 w-4 text-[#034AA6]' />
        </button>

        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            swiperRef.current?.slideNext();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          className='bg-secondary-white absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-md p-2 shadow-md'
          aria-label='Вперёд'
        >
          <ChevronRight className='h-4 w-4 text-[#034AA6]' />
        </button>

        {/* Теги справа сверху */}
        <div className='absolute top-9 right-9 z-10 flex flex-col gap-2'>
          {category?.map((item) => (
            <span
              key={item}
              className='bg-secondary-white rounded-full px-3 py-1 text-center text-sm shadow'
            >
              {item}
            </span>
          ))}
        </div>

        {/* Свайпер */}
        <Swiper
          modules={[A11y]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          slidesPerView={1}
          loop={true}
          a11y={{ enabled: true }}
          // плавность
          speed={500}
          className='rounded-[60px]'
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img.path}
                alt={img.title ?? `Фото ${i + 1}`}
                className='h-[260px] w-full bg-white object-contain select-none md:h-[310px]'
                loading='lazy'
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarouselImage;
