// src/widgets/product/VerticalThumbGallerySwiper.tsx
import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';
import { ArrowDown, ArrowUp } from 'lucide-react';
import 'swiper/swiper-bundle.css';

type Img = { src: string; alt?: string };

type Props = {
    images: Img[];
    visible?: number;     // сколько миниатюр видно по вертикали
    height?: number;      // высота правого блока, px
    thumbW?: number;      // ширина превью
    thumbH?: number;      // высота превью
    gap?: number;         // отступ между превью
    className?: string;
};

const VerticalThumbGallerySwiper: React.FC<Props> = ({
    images,
    visible = 4,
    height = 620,
    thumbW = 103,
    thumbH = 141,
    gap = 12,
    className = '',
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const slidesPerView = useMemo(
        () => Math.min(visible, images.length || 1),
        [visible, images.length],
    );
    const thumbBoxH = slidesPerView * thumbH + (slidesPerView - 1) * gap;

    const safeThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

    return (
        <div className={`flex gap-4 md:gap-5 ${className}`}>
            {/* Левая колонка — вертикальные превью */}
            <aside className="relative select-none" style={{ height }}>
                <div className="h-full flex flex-col">
                    <div className="relative overflow-hidden" style={{ height: thumbBoxH }}>
                        <Swiper
                            direction="vertical"
                            modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                            onSwiper={setThumbsSwiper}
                            slidesPerView={slidesPerView}
                            spaceBetween={gap}
                            freeMode
                            mousewheel={{ forceToAxis: true }}
                            watchSlidesProgress
                            // кастомные кнопки
                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                            onBeforeInit={(swiper) => {
                                // привязываем кнопки до инициализации
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (swiper.params.navigation as any).prevEl = prevRef.current;
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (swiper.params.navigation as any).nextEl = nextRef.current;
                            }}
                            className="h-full"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={`${i}-${img.src}`} className="!h-auto">
                                    <button
                                        type="button"
                                        className="relative grid place-items-center rounded-[14px] overflow-hidden border border-slate-200 hover:border-slate-300 transition"
                                        style={{ width: thumbW, height: thumbH }}
                                        aria-label={img.alt || `Превью ${i + 1}`}
                                        // клик по превью выбирает соответствующий слайд справа
                                        onClick={() => safeThumbs?.slideTo(i)}
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt || ''}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Кнопки пролистать вверх/вниз */}
                    <div className="mt-auto flex items-center justify-between absolute bottom-0 w-[103px] z-10">
                        <button
                            ref={prevRef}
                            type="button"
                            title="Вверх"
                            className="grid place-items-center size-10 rounded-full border-2 border-slate-300 text-slate-600 bg-white"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </button>
                        <button
                            ref={nextRef}
                            type="button"
                            title="Вниз"
                            className="grid place-items-center size-10 rounded-full border-2 border-slate-300 text-slate-600 bg-white"
                        >
                            <ArrowDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Правая колонка — большая картинка */}
            <div className="relative rounded-[28px] overflow-hidden shadow-md" style={{ height }}>
                {/* фон-градиент под макет (опционально) */}
                <div className="absolute inset-0 " />
                <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: safeThumbs }}
                    slidesPerView={1}
                    speed={500}
                    className="relative z-10 h-full"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={`big-${i}-${img.src}`} className="!h-full">
                            <img
                                src={img.src}
                                alt={img.alt || ''}
                                className="w-full h-full object-contain"
                                draggable={false}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default VerticalThumbGallerySwiper;
