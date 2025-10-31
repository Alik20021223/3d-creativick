// src/widgets/product/VerticalThumbGallerySwiper.tsx
import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import 'swiper/swiper-bundle.css';
import type { NavigationOptions } from 'swiper/types';
import type { GalleriesType } from '@shared/types';

type Props = {
  images: GalleriesType[];
  visible?: number; // сколько миниатюр видно по вертикали (desktop)
  thumbW?: number; // ширина превью
  thumbH?: number; // высота превью
  gap?: number; // отступ между превью
  className?: string;
};

// Собираем полный URL картинки
function buildSrc(base_path?: string, path?: string): string {
  const p = (path ?? '').trim();
  const b = (base_path ?? '').trim();
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  if (/^https?:\/\//i.test(b)) {
    // нормализуем слэш
    const slash = b.endsWith('/') || p.startsWith('/') ? '' : '/';
    return `${b.replace(/\/+$/, '')}${slash}${p.replace(/^\/+/, '')}`;
  }
  // если нет base_path — вернём как есть (вдруг это относительный путь, который резолвится по <base> или CDN middleware)
  return p;
}

const VerticalThumbGallerySwiper: React.FC<Props> = ({
  images,
  visible = 4,
  thumbW = 103,
  thumbH = 141,
  gap = 12,
  className = '',
}) => {
  // Нормализуем входные изображения в { src, alt }
  const normalized = useMemo(
    () =>
      (Array.isArray(images) ? images : []).map((g) => ({
        key: `${g.id}-${g.path}`,
        src: buildSrc(g.base_path, g.path),
        alt: g.title || '',
      })),
    [images],
  );

  // thumbs (превью) инстанс
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const safeThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  // главный (большой) слайдер
  const mainRef = useRef<SwiperType | null>(null);

  const prevDesktopRef = useRef<HTMLButtonElement | null>(null);
  const nextDesktopRef = useRef<HTMLButtonElement | null>(null);

  // кнопки навигации (общие, но отображаются по брейкпоинтам)
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesPerView = useMemo(
    () => Math.min(visible, normalized.length || 1),
    [visible, normalized.length],
  );
  const thumbBoxH = slidesPerView * thumbH + (slidesPerView - 1) * gap;

  return (
    <div className={`flex gap-4 max-md:flex-col-reverse md:gap-5 ${className}`}>
      {/* -------- Desktop: вертикальные превью слева -------- */}
      <aside className='relative h-[620px] select-none max-md:hidden'>
        <div className='flex h-full flex-col'>
          <div className='relative overflow-hidden' style={{ height: thumbBoxH }}>
            <Swiper
              direction='vertical'
              modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
              onSwiper={setThumbsSwiper}
              slidesPerView={slidesPerView}
              spaceBetween={gap}
              freeMode
              mousewheel={{ forceToAxis: true }}
              watchSlidesProgress
              navigation={{ prevEl: prevDesktopRef.current, nextEl: nextDesktopRef.current }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation === 'boolean') {
                  swiper.params.navigation = {};
                }
                (swiper.params.navigation as NavigationOptions).prevEl = prevDesktopRef.current;
                (swiper.params.navigation as NavigationOptions).nextEl = nextDesktopRef.current;
              }}
              className='desktop-thumbs h-full'
            >
              {normalized.map((img, i) => (
                <SwiperSlide key={`d-${img.key}`} className='!h-auto'>
                  <button
                    type='button'
                    className='thumb relative grid place-items-center overflow-hidden rounded-[14px] border border-slate-200 transition hover:border-slate-300'
                    style={{ width: thumbW, height: thumbH }}
                    aria-label={img.alt || `Превью ${i + 1}`}
                    onClick={() => {
                      safeThumbs?.slideTo(i);
                      mainRef.current?.slideTo(i);
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className='h-full w-full object-cover'
                      draggable={false}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Кнопки пролистать вверх/вниз (desktop) */}
          <div className='absolute bottom-0 z-10 mt-auto flex w-[103px] items-center justify-between'>
            <button
              ref={prevDesktopRef}
              type='button'
              title='Вверх'
              className='grid size-10 place-items-center rounded-full border-2 border-slate-300 bg-white text-slate-600'
            >
              <ArrowUp className='h-5 w-5' />
            </button>
            <button
              ref={nextDesktopRef}
              type='button'
              title='Вниз'
              className='grid size-10 place-items-center rounded-full border-2 border-slate-300 bg-white text-slate-600'
            >
              <ArrowDown className='h-5 w-5' />
            </button>
          </div>
        </div>
      </aside>

      {/* -------- Mobile: горизонтальная лента снизу -------- */}
      <aside className='flex flex-col md:hidden'>
        <div className='order-2 mt-3 flex items-center justify-center gap-4'>
          <button
            ref={prevRef}
            type='button'
            className='grid size-10 place-items-center rounded-full border-2 border-slate-300 bg-white text-slate-600'
            aria-label='Назад'
          >
            <ArrowLeft className='h-5 w-5' />
          </button>
          <button
            ref={nextRef}
            type='button'
            className='grid size-10 place-items-center rounded-full border-2 border-slate-300 bg-white text-slate-600'
            aria-label='Вперёд'
          >
            <ArrowRight className='h-5 w-5' />
          </button>
        </div>

        <div className='order-1 w-full min-w-0'>
          <Swiper
            modules={[FreeMode, Thumbs, Navigation]}
            slidesPerView='auto'
            spaceBetween={12}
            freeMode
            watchSlidesProgress
            onBeforeInit={(sw) => {
              if (typeof sw.params.navigation === 'boolean') {
                sw.params.navigation = {};
              }
              (sw.params.navigation as NavigationOptions).prevEl = prevRef.current;
              (sw.params.navigation as NavigationOptions).nextEl = nextRef.current;
            }}
            onSwiper={(sw) => {
              setThumbsSwiper(sw);
              sw.navigation.init();
              sw.navigation.update();
            }}
            className='mobile-thumbs'
          >
            {normalized.map((img, i) => (
              <SwiperSlide key={`m-${img.key}`} className='!w-[140px]'>
                <button
                  type='button'
                  className='thumb grid place-items-center overflow-hidden rounded-[14px] border border-slate-200 transition'
                  style={{ width: 140, height: 103 }}
                  aria-label={img.alt || `Превью ${i + 1}`}
                  onClick={() => {
                    safeThumbs?.slideTo(i);
                    mainRef.current?.slideTo(i);
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='h-full w-full object-cover'
                    draggable={false}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </aside>

      {/* -------- Правая колонка: большая картинка -------- */}
      <div className='relative h-[310px] w-full overflow-hidden rounded-[28px] shadow-md md:h-[620px]'>
        <Swiper
          modules={[Thumbs]}
          onSwiper={(sw) => (mainRef.current = sw)}
          thumbs={{ swiper: safeThumbs as SwiperType | null }}
          slidesPerView={1}
          speed={500}
          className='relative z-10 h-full'
        >
          {normalized.map((img) => (
            <SwiperSlide key={`big-${img.key}`} className='!h-full'>
              <img
                src={img.src}
                alt={img.alt}
                className='h-full w-full object-cover'
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
