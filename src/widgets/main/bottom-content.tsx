import FeedbackCarousel from '@feature/feedback-carousel/ui';
import imgPlane from '@assets/rocket.png';
import buildingImg from '@assets/building.svg';
import { itemsFeedback, marketplaces, marketplacesMobile } from '@utils/mock';
import { useIsMobile } from '@app/hook/useMobile';

const BottomContent = () => {

  const isMobile = useIsMobile()

  const marketPlaceItems = isMobile ? marketplacesMobile : marketplaces

  return (
    <>
      <div className='bg-feedback mt-[56px] md:grid md:w-screen md:place-items-center rounded-t-[80px]'>
        <div className='container-custom md:px-[40px] px-2.5 md:pt-20 pt-15 pb-5'>
          <div className='relative max-md:space-y-10'>
            <div className='md:w-[761px] mb-12 text-white'>
              <h1 className='md:text-[54px] font-bold text-[32px] max-md:text-center'>Отзывы о нас</h1>
              <p className='md:w-[600px] md:text-lg text-base font-normal'>
                С другой стороны, реализация намеченных плановых заданий играет важную роль в
                формировании глубокомысленных рассуждений
              </p>
            </div>

            <FeedbackCarousel items={itemsFeedback} />

            <img
              src={imgPlane}
              alt={imgPlane}
              className='max-xl:hidden float-rocket absolute -top-20 left-90 z-5'
            />
          </div>
        </div>
        <div className='flex max-md:flex-col items-center justify-between max-md:space-y-10 md:mt-16 md:mb-7 pb-15 md:pb-0 mt-10'>
          <div className='md:max-w-[455px]'>
            <h2 className='md:text-[54px] text-[32px] leading-[110%] font-bold text-white max-md:text-center'>
              Где ещё купить набор 3D-Креативик?
            </h2>
          </div>
          <div className='relative grid grid-cols-2 md:gap-3 gap-2.5  md:pr-10'>
            {marketPlaceItems.map((m) => (
              <a
                key={m.name}
                href={m.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`md:h-[250px] md:w-[334px] w-[172.5px] h-[120px] rounded-[22px]`}
              >
                <img src={m.logo} alt={m.name} className='h-full w-full md:object-cover rounded-[22px]' />
              </a>
            ))}

            {!isMobile && <div className='pointer-events-none absolute -right-90 -bottom-40 z-0 h-[780px] w-[780px]'>
              <img src={buildingImg} alt={buildingImg} />
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomContent;
