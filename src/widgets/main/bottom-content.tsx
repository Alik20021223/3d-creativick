import FeedbackCarousel from '@feature/feedback-carousel/ui';
import imgPlane from '@assets/rocket.png';
import buildingImg from '@assets/building.svg';
import { itemsFeedback, marketplaces, marketplacesMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

const BottomContent = () => {
  const isMobile = useIsMobile();

  const marketPlaceItems = isMobile ? marketplacesMobile : marketplaces;

  return (
    <>
      <div className='bg-feedback mt-[56px] rounded-t-[80px] md:grid md:w-screen md:place-items-center'>
        <div className='container-custom px-2.5 pt-15 pb-5 md:px-[40px] md:pt-20'>
          <div className='relative max-md:space-y-10'>
            <div className='mb-12 text-white md:w-[761px]'>
              <h1 className='text-[32px] font-bold max-md:text-center md:text-[54px]'>
                Отзывы о нас
              </h1>
              <p className='text-base font-normal md:w-[600px] md:text-lg'>
                С другой стороны, реализация намеченных плановых заданий играет важную роль в
                формировании глубокомысленных рассуждений
              </p>
            </div>

            <FeedbackCarousel items={itemsFeedback} />

            <img
              src={imgPlane}
              alt={imgPlane}
              className='float-rocket absolute -top-20 left-90 z-5 max-xl:hidden'
            />
          </div>
        </div>
        <div className='mt-10 flex items-center justify-between pb-15 max-md:flex-col max-md:space-y-10 md:mt-16 md:mb-7 md:pb-0'>
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
                className={`h-[120px] w-[172.5px] rounded-[22px] md:h-[250px] md:w-[334px]`}
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
    </>
  );
};

export default BottomContent;
