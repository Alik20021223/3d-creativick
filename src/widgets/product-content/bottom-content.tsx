import { useMemo } from 'react';
import buildingImg from '@assets/building.png';
import { useIsMobile } from '@app/hook/useMobile';
import ProductCarousel from '@feature/exclusive-carousel';
import { ProductCardType } from '@shared/types';
import OurActionsContent from '@/entities/products/ui/our-actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetAllMarkets } from '@entities/main/hooks/getAllMarket';
import { useGetOurActions } from '@entities/main/hooks/getOurActions';
import { ExternalStore } from '@/entities/products/types';
import { hasAvailableStock } from '@utils/product-variants';
import { getCategoryIds, pickRandom } from '@shared/lib/product-related';

interface BottomContentProps {
  interesringBlock?: boolean;
  items?: ProductCardType[];
  currentProduct?: ProductCardType | null; // текущий товар, который нужно исключить
}

const BottomContent: React.FC<BottomContentProps> = ({
  interesringBlock = true,
  items = [],
  currentProduct,
}) => {
  const isMobile = useIsMobile();

  const { data } = useGetAllMarkets();
  const { data: actionsData } = useGetOurActions();

  const marketPlaceItems: ExternalStore[] = (data ?? [])
    .filter((m) => m.active)
    .sort((a, b) => a.sort - b.sort);

  // Проверяем, есть ли активные акции
  const hasActiveActions = useMemo(() => {
    const banners = (actionsData ?? []).filter((b) => b.active === 1);
    return banners.length > 0;
  }, [actionsData]);

  const activeItems = useMemo(() => {
    if (!currentProduct || !items.length) return [];

    // Получаем категории текущего товара
    const currentCategoryIds = new Set(getCategoryIds(currentProduct));
    if (!currentCategoryIds.size) return [];

    // Фильтруем товары
    const filtered = items.filter((item) => {
      // ❌ исключаем текущий товар
      if (item.uuid === currentProduct.uuid) return false;

      // ❌ показываем только активные товары
      if (item.active !== true) return false;

      // ❌ показываем только товары с доступными вариантами
      if (!hasAvailableStock({ uuid: item.uuid, stock_balances: item.stock_balances })) {
        return false;
      }

      // ✅ показываем только товары из той же категории
      const itemCategoryIds = getCategoryIds(item);
      return itemCategoryIds.some((id) => currentCategoryIds.has(id));
    });

    if (!filtered.length) return [];

    // Выбираем 9 случайных элементов
    return pickRandom(filtered, 9);
  }, [items, currentProduct]);


  
  return (
    <section className={`${interesringBlock ? 'md:pt-20' : 'md:pt-1'} pt-15`}>
      {interesringBlock && activeItems.length > 0 && (
        <div className='container-custom'>
          <h1 className='title-text px-10 max-md:pb-10 max-md:text-center 2xl:px-0'>
            Может быть интересно
          </h1>
          <ProductCarousel buttonShow={interesringBlock} items={activeItems} />
        </div>
      )}

      {hasActiveActions && (
        <div className='container-custom px-2.5 md:px-10 2xl:px-0'>
          <OurActionsContent className='mt-30 max-md:mt-0 max-md:mb-15' />
        </div>
      )}

      <div
        className={
          hasActiveActions
            ? 'bg-feedback z-0 mt-[56px] rounded-t-[80px] px-2.5 py-15 md:px-10 md:pb-5 2xl:px-0'
            : 'px-2.5 py-15 md:px-10 md:pb-5 2xl:px-0'
        }
      >
        <div className='container-custom mt-10 flex items-center justify-between px-2.5 pb-15 max-2xl:max-w-[calc(100vw-40px)] max-xl:flex-col max-xl:space-y-10 md:mt-16 md:mb-7 md:pb-0 xl:px-10 2xl:px-20'>
          <div className='xl:max-w-[455px]'>
            <h2 className='text-[32px] leading-[110%] font-bold text-white max-xl:text-center md:text-[54px]'>
              Где ещё купить набор <br /> 3D Креативик?
            </h2>
          </div>

          {isMobile ? (
            <>
              <Swiper
                modules={[Pagination, Autoplay]}
                grabCursor
                slidesPerView={1}
                spaceBetween={20}
                height={250}
                loop
                speed={500}
                className='w-full'
                pagination={{ el: '.feedback-pagination', clickable: true }}
              >
                {marketPlaceItems.map((it) => (
                  <SwiperSlide key={it.id} className='!w-full'>
                    <a
                      href={it.url}
                      rel='noopener noreferrer'
                      target='_blank'
                      className='block h-[250px] w-full overflow-hidden rounded-[22px]'
                    >
                      <img
                        src={it.logo}
                        alt={it.name}
                        className='h-full w-full rounded-[22px] object-cover'
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='feedback-pagination mt-3 flex justify-center md:hidden' />
            </>
          ) : (
            <div className='relative grid grid-cols-2 gap-2.5 md:gap-3 md:pr-10'>
              {marketPlaceItems.map((m) => (
                <a
                  key={m.id}
                  href={m.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[120px] w-[172.5px] rounded-[22px] md:h-[250px] md:w-[334px]'
                >
                  <img
                    src={m.logo}
                    alt={m.name}
                    className='h-full w-full rounded-[22px] md:object-cover'
                  />
                </a>
              ))}

              <div className='pointer-events-none absolute -bottom-40 z-0 h-[780px] w-[780px] max-2xl:-right-90 max-xl:hidden 2xl:-right-100'>
                <img src={buildingImg} alt='3D Kreativik building' />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BottomContent;
