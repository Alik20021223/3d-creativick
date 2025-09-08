import { useIsMobile } from '@app/hook/useMobile';
import techImg from '@assets/tech-img.png';
import MobileTechImg from '@assets/mobile-tech.png';

const TechPage = () => {
  const isMobile = useIsMobile();

  return (
    <section className='p-10 max-md:p-0 max-md:py-[60px]'>
      <div className='mx-auto rounded-[80px] bg-white p-2.5 pb-20 md:p-10'>
        <div className='grid items-center gap-10 max-md:gap-20 md:grid-cols-2'>
          {/* Левая картинка с градиентной подложкой */}
          <div className='relative w-full max-md:-top-2.5 max-md:max-h-[276px] max-md:max-w-[355px]'>
            <img
              src={isMobile ? MobileTechImg : techImg}
              alt='Технические работы'
              className='h-full w-full object-contain'
              draggable={false}
            />
          </div>

          {/* Правая колонка: заголовок, текст и кнопки */}
          <div>
            <h1 className='text-dark-blue text-[54px] leading-[110%] font-bold max-md:text-[32px] md:text-[44px]'>
              Технические работы
            </h1>

            <p className='text-secondary-text mt-[22px] text-lg leading-[130%] font-normal max-md:text-base md:text-[16px]'>
              Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
              социально-демократической анафеме. Современные технологии достигли такого уровня, что
              сплочённость команды профессионалов обеспечивает актуальность поставленных обществом
              задач.
            </p>

            <div className='mt-8 flex gap-5 max-md:flex-col max-md:items-center max-md:justify-center'>
              <a
                href='https://t.me/'
                target='_blank'
                className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'
              >
                Телеграм
              </a>
              <a
                href='https://vk.com/'
                target='_blank'
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
