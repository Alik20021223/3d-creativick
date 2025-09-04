import { useIsMobile } from '@app/hook/useMobile';
import techImg from '@assets/tech-img.png';
import MobileTechImg from '@assets/mobile-tech.png';

const TechPage = () => {

    const isMobile = useIsMobile()

    return (
        <section className="p-10 max-md:p-0 max-md:py-[60px]">
            <div className="mx-auto rounded-[80px] bg-white p-2.5 pb-20 md:p-10 ">
                <div className="grid items-center gap-10 max-md:gap-20 md:grid-cols-2">
                    {/* Левая картинка с градиентной подложкой */}
                    <div className="relative w-full max-md:-top-2.5 max-md:max-w-[355px] max-md:max-h-[276px]">
                        <img
                            src={isMobile ? MobileTechImg : techImg}
                            alt="Технические работы"
                            className="h-full w-full object-contain"
                            draggable={false}
                        />
                    </div>

                    {/* Правая колонка: заголовок, текст и кнопки */}
                    <div>
                        <h1 className="text-[54px] max-md:text-[32px] leading-[110%] font-bold text-dark-blue md:text-[44px]">
                            Технические работы
                        </h1>

                        <p className="mt-[22px] text-lg max-md:text-base leading-[130%] text-secondary-text font-normal md:text-[16px]">
                            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы
                            социально-демократической анафеме. Современные технологии достигли такого уровня,
                            что сплочённость команды профессионалов обеспечивает актуальность поставленных
                            обществом задач.
                        </p>

                        <div className="mt-8 flex max-md:flex-col max-md:justify-center max-md:items-center gap-5">
                            <a
                                href="https://t.me/"
                                target="_blank"
                                className="inline-flex items-center justify-center rounded-full bg-primary-active w-[195px] h-[56px] max-md:w-full text-white text-[22px] max-md:text-lg font-normal"
                            >
                                Телеграм
                            </a>
                            <a
                                href="https://vk.com/"
                                target="_blank"
                                className="inline-flex items-center justify-center rounded-full bg-primary-active w-[195px] h-[56px] max-md:w-full text-white text-[22px] max-md:text-lg font-normal"
                            >
                                ВКонтакте
                            </a>
                            <a
                                href="mailto:support@example.com"
                                className="inline-flex items-center justify-center rounded-full bg-primary-active w-[195px] h-[56px] max-md:w-full text-white text-[22px] max-md:text-lg font-normal"
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
