import { Button } from "@shared/shadcn/button"
import { ChevronRight } from 'lucide-react';
import rosAtomImg from '@assets/rosatom-img.svg'




const MainContent = () => {
    return (
        <>
            <div className="main-block relative z-5 mt-[180px] bg-white pt-[120px] pb-10 rounded-[80px] px-10 pb-10 mx-[38px] w-full">
                <div className="flex justify-between items-start">
                    <div className="w-[780px]">
                        <h2 className="text-dark-blue font-bold text-[54px]">3D Креативик — это:</h2>
                        <p className="font-normal font-rosatom max-w-[700px] pt-5.5 leading-[130%] text-lg">Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.</p>
                        <div className="flex space-x-3 pt-7.5">
                            <Button className="h-[56px] px-9! text-[22px] text-white" variant="default">
                                Подробнее
                                <ChevronRight />
                            </Button>
                            <Button className="h-[56px] px-9! text-[22px] text-dark-blue" variant="secondary">
                                В личный кабинет
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                    <div className="space-x-10 flex">
                        <div>
                            <p className="number-about-text text-8xl font-bold text-dark-blue">&gt;
                                <span
                                    className="text-[#333333]"
                                >
                                    500
                                </span>
                            </p>
                            <p className="font-semibold text-[#7D8891]">Готовых моделей</p>
                        </div>

                        <div>
                            <p className="number-about-text text-8xl font-bold text-dark-blue">&gt;
                                <span
                                    className="text-[#333333]"
                                >
                                    16
                                </span>
                            </p>
                            <p className="font-semibold text-[#7D8891]">Различных серий</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full items-center space-x-[86px]">
                    <div className="w-[693px]">
                        <h2 className="text-dark-blue font-bold text-[54px]">При поддержке РОСАТОМ</h2>
                        <p className="font-normal font-rosatom max-w-[700px] pt-5.5 leading-[130%] text-lg">Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.</p>
                        <div className="flex space-x-3 pt-7.5">
                            <Button className="h-[56px] px-9! text-[22px] text-white" variant="default">
                                Где купить
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                    <div className="w-[600px] h-[364px]">
                        <img src={rosAtomImg} alt="rosatom" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent