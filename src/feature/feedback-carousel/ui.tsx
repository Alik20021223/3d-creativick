import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import FeedBackBlock from "@feature/feedback-block";
import PrevButton from "./prevButton";
import NextButton from "./nextButton";

type Item = {
    rating: number;
    text: string;
    authorName: string;
    authorRole?: string;
    avatarUrl?: string;
};

export default function FeedbackCarousel({
    items,
    className = "",
}: { items: Item[]; className?: string }) {
    const swiperRef = useRef<SwiperType | null>(null);

    // Константы под твой дизайн
    const CARD_W = 420;          // ширина карточки
    const GAP = 20;              // spaceBetween
    const VISIBLE = 3;           // хотим видеть 3
    const INNER_W = VISIBLE * CARD_W + (VISIBLE - 1) * GAP; // ширина области со слайдами

    return (
        <div className={`relative ${className}`}>
            {/* Внешний контейнер с отступами по краям страницы */}
            <div className="relative">
                {/* Стрелки — поверх слайдера и «чуть снаружи» */}
                <PrevButton
                    swiperRef={swiperRef}
                    className="absolute -left-20 top-1/2 -translate-y-1/2 z-30"
                />
                <NextButton
                    swiperRef={swiperRef}
                    className="absolute -right-20 top-1/2 -translate-y-1/2 z-30"
                />

                <Swiper
                    modules={[Navigation, Autoplay]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    slidesPerView="auto"                // авто-ширина слайдов
                    spaceBetween={GAP}                  // расстояние между карточками
                    loop                                // бесконечный цикл (опц.)
                    autoplay={{ delay: 2500, disableOnInteraction: false }} // опц.
                    style={{ maxWidth: `${INNER_W}px` }}
                >
                    {items.map((it, i) => (
                        <SwiperSlide
                            key={i}
                            className="!h-auto !w-[420px] !inline-flex" // фикс 420px и ширина по контенту
                        >
                            <FeedBackBlock
                                rating={Math.round(it.rating)}
                                text={it.text}
                                authorName={it.authorName}
                                authorRole={it.authorRole}
                                avatarUrl={it.avatarUrl}
                                className="h-full w-[420px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
