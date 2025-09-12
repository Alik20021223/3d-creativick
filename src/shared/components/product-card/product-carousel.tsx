import { ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from 'swiper';

interface ProductCarouselImageProps {
    images: string[],
    category: string[]
}

const ProductCarouselImage: React.FC<ProductCarouselImageProps> = ({ images, category }) => {

    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <>
            {/* ВЕРХНИЙ БЛОК С КАРУСЕЛЬЮ */}
            <div className="relative p-2.5">
                {/* Кастомные стрелки */}
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="p-2 bg-secondary-white rounded-md shadow-md absolute left-4 top-1/2 -translate-y-1/2 z-10"
                    aria-label="Назад"
                >
                    <ChevronLeft className="w-4 h-4 text-[#034AA6]"/>
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="p-2 bg-secondary-white rounded-md shadow-md absolute right-4 top-1/2 -translate-y-1/2 z-10"
                    aria-label="Вперёд"
                >
                    <ChevronRight className="w-4 h-4 text-[#034AA6]"/>
                </button>

                {/* Теги справа сверху */}
                <div className="flex flex-col gap-2 absolute top-9 right-9 z-10">
                    {category.map((item) => (
                        <span className="bg-secondary-white px-3 py-1 rounded-full text-sm text-center shadow">{item}</span>
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
                    className="rounded-[60px]"
                >
                    {images.map((src: string, i: number) => (
                        <SwiperSlide key={i}>
                            <img
                                src={src}
                                alt={src ?? `Фото ${i + 1}`}
                                className="mx-auto md:w-[455px] md:h-[310px] rounded-[60px] object-fit select-none bg-white"
                                loading="lazy"
                                draggable={false}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </>
    )
}

export default ProductCarouselImage