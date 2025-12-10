import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useIsMobile } from '@app/hook/useMobile';
import { useGetOurActions } from '@entities/main/hooks/getOurActions';

export interface OurActionsContentProps {
  className?: string;
}

const OurActionsContent: React.FC<OurActionsContentProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const { data } = useGetOurActions(); // data: Banner[]

  const banners = (data ?? []).filter((b) => b.active === 1);

  if (banners.length <= 0) {
    return null
  }

  return (
    <div className={className}>
      <h1 className='title-text max-md:text-center'>Наши акции</h1>

      <div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            1024: { slidesPerView: 1 },
          }}
          speed={500}
          grabCursor
          autoHeight
          className='!bg-transparent max-md:mt-10 max-md:!h-auto max-md:space-y-12 md:!h-[440px]'
        >
          {banners.map((banner) => {
            const src = isMobile ? banner.mobile_img || banner.img : banner.img;

            return (
              <SwiperSlide
                key={banner.id}
                className='!h-auto max-md:!flex max-md:!justify-center md:!h-[410px]'
              >
                <img src={src} alt={banner.translation?.title ?? `Акция #${banner.id}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default OurActionsContent;
