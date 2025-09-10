import { useIsMobile } from '@app/hook/useMobile';
import techImg from '@assets/tech-img.png';
import MobileTechImg from '@assets/mobile-tech.png';

const TechPage = () => {
  const isMobile = useIsMobile();

  return (
    <section className='px-6 py-10 max-md:px-0 max-md:py-[60px]'>
      <div className='mx-auto max-w-[1540px] rounded-[80px] bg-white p-2.5 pb-20 md:p-10'>
        <div className='grid w-full items-center gap-10 max-md:gap-20 md:grid-cols-2'>
          {/* Левая картинка */}
          <div className='flex h-full w-full justify-center'>
            <div className='pointer-events-none relative w-full select-none max-md:-top-2.5 max-md:max-h-[276px] max-md:max-w-[355px]'>
              <img
                src={isMobile ? MobileTechImg : techImg}
                alt='Технические работы'
                className='w-full object-contain'
                draggable={false}
              />
            </div>
          </div>

          {/* Правая колонка */}
          <div>
            <h1 className='text-dark-blue text-[32px] leading-[110%] font-bold md:text-[44px] xl:text-[54px]'>
              Технические работы
            </h1>

            <p className='text-secondary-text mt-[22px] text-base leading-[130%] font-normal md:text-[16px]'>
              Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
              социально-демократической анафеме. Современные технологии достигли такого уровня, что
              сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
              задач.
            </p>

            <div className='relative z-10 mt-8 flex gap-5 max-md:flex-col max-md:items-center max-md:justify-center'>
              <a
                href='https://t.me/'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'
              >
                Телеграм
              </a>
              <a
                href='https://vk.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'
              >
                ВКонтакте
              </a>
              <a
                href='mailto:info@3dkreativik.ru'
                className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechPage;
