import { exclusiveProductsMock } from '@utils/mock';
import ProductCarousel from '@feature/exclusive-carousel';
import OurActionsContent from '@entities/main/ui/our-actions';
import buildingImg from '@assets/building.svg';
import { marketplaces, marketplacesMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

interface BottomContentProps {
  interesringBlock?: boolean;
}

const BottomContent: React.FC<BottomContentProps> = ({ interesringBlock = true }) => {
  const isMobile = useIsMobile();

  const marketPlaceItems = isMobile ? marketplacesMobile : marketplaces;

  return (
    <>
      <section className={`${interesringBlock ? 'md:pt-20' : 'md:pt-1'} pt-15`}>
        {interesringBlock && (
          <div className='container-custom'>
            <h1 className='title-text px-10 max-md:pb-10 max-md:text-center 2xl:px-0'>
              Может быть интересно
            </h1>
            <ProductCarousel items={exclusiveProductsMock} />
          </div>
        )}
        <div className='container-custom px-2.5 md:px-10 2xl:px-0'>
          <OurActionsContent />
        </div>
        <div className='bg-feedback z-0 mt-[56px] rounded-t-[80px] px-2.5 py-15 md:px-10 md:pb-5 2xl:px-0'>
          <div className='container-custom mt-10 flex items-center justify-between pb-15 max-md:flex-col max-md:space-y-10 md:mt-16 md:mb-7 md:pb-0'>
            <div className='md:max-w-[455px]'>
              <h2 className='text-[32px] leading-[110%] font-bold text-white max-md:text-center md:text-[54px]'>
                Где ещё купить набор 3D-Креативик?
              </h2>
            </div>
            <div className='relative grid grid-cols-2 gap-2.5 md:gap-3 md:pr-10'>
              {marketPlaceItems.map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`h-full w-full rounded-[22px] md:h-[250px] md:w-[334px]`}
                >
                  <img
                    src={m.logo}
                    alt={m.name}
                    className='h-full w-full rounded-[22px] md:object-cover'
                  />
                </a>
              ))}

              {!isMobile && (
                <div className='pointer-events-none absolute -right-90 -bottom-40 z-0 h-[780px] w-[780px]'>
                  <img src={buildingImg} alt={buildingImg} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomContent;
