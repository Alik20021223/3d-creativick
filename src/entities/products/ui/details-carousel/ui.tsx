import { DetailCardType } from "@shared/types"
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import DetailCard from "@shared/components/detail-card";
import { useRef } from "react";
import PrevButton from "@feature/buttons-carousel/prevButton";
import NextButton from "@feature/buttons-carousel/nextButton";
import type { Swiper as SwiperType } from 'swiper';

interface DetailsCarouselProps {
    items: DetailCardType[],
    className?: string,
}

const DetailsCarousel: React.FC<DetailsCarouselProps> = ({ items, className }) => {

    const swiperRef = useRef<SwiperType | null>(null);
    const pagRef = useRef<HTMLDivElement | null>(null);

    return (
        // ВНЕШНЯЯ ПЛИТА: белый фон + скругление
        <div className={`relative md:mt-10 md:px-10 ${className}`}>
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-3">
                <PrevButton
                    swiperRef={swiperRef}
                    className="hidden pointer-events-auto md:block md:absolute md:top-1/2 md:-left-[60px] md:z-30 md:-translate-y-1/2"
                />

                <div
                    ref={pagRef}
                    className="pointer-events-auto swiper-pagination !static !w-auto !relative flex items-center gap-2"
                />


                <NextButton
                    swiperRef={swiperRef}
                    className="hidden pointer-events-auto md:block md:absolute md:top-1/2 md:-right-[60px] md:z-30 md:-translate-y-1/2"
                />
            </div>
            <SwiperRoot
                modules={[Pagination]}
                onBeforeInit={(s) => {
                    swiperRef.current = s;
                    // прокидываем внешний контейнер для пагинации ДО инициализации
                    // @ts-expect-error — расширяем параметры
                    s.params.pagination.el = pagRef.current;
                    // @ts-expect-error
                    s.params.pagination.clickable = true;
                }}
                onSwiper={(s) => (swiperRef.current = s)}
                pagination={{ el: pagRef.current as any, clickable: true }}
                slidesPerView={1}               // базово 1; при брейкпоинтах больше
                spaceBetween={16}
                breakpoints={{
                    1080: { slidesPerView: 2, spaceBetween: 20 },
                    1440: { slidesPerView: 3, spaceBetween: 20 },
                    1540: { slidesPerView: 3, spaceBetween: 24 },
                }}
                speed={500}
                grabCursor
                autoHeight
                className="!h-[600px] overflow-visible !bg-transparent"
            >
                {items.map((p, i) => (
                    <SwiperSlide key={i} className="!h-auto !bg-transparent">
                        <div className="md:px-3 px-2.5 md:py-1 max-md:w-full max-xl:flex max-xl:justify-center">
                            <DetailCard data={p} />
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperRoot>

        </div>
    )
}

export default DetailsCarousel