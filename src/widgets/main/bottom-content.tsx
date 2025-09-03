import FeedbackCarousel from '@feature/feedback-carousel/ui';
import imgPlane from '@assets/rocket.png';
import buildingImg from '@assets/building.svg';
import { itemsFeedback, marketplaces } from '@utils/mock';

const BottomContent = () => {
  return (
    <>
      <div className='bg-feedback mt-[56px] grid w-screen place-items-center rounded-t-[80px]'>
        <div className='max-w-[1540px] px-[40px] pt-[80px] pb-10'>
          <div className='grid place-items-center'>
            <div className='relative space-y-12'>
              <div className='w-[761px] text-white'>
                <h1 className='text-[54px] font-bold'>Отзывы о нас</h1>
                <p className='w-[600px] text-lg font-normal'>
                  С другой стороны, реализация намеченных плановых заданий играет важную роль в
                  формировании глубокомысленных рассуждений
                </p>
              </div>

              <FeedbackCarousel items={itemsFeedback} />

              <img
                src={imgPlane}
                alt={imgPlane}
                className='float-rocket absolute -top-20 left-90 z-5'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='max-w-[455px]'>
              <h2 className='text-[54px] leading-[110%] font-bold text-white'>
                Где купить набор 3D-Креативик?
              </h2>
            </div>
            <div className='relative grid grid-cols-2 gap-3 pr-10'>
              {marketplaces.map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`h-[250px] w-[334px] rounded-[22px]`}
                >
                  <img src={m.logo} alt={m.name} className='h-full w-full object-fill' />
                </a>
              ))}

              <div className='pointer-events-none absolute -right-90 -bottom-40 z-0 h-[780px] w-[780px]'>
                <img src={buildingImg} alt={buildingImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomContent;
