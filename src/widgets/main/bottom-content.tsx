import FeedbackCarousel from "@feature/feedback-carousel/ui"
import imgPlane from '@assets/rocket.png'
import buildingImg from '@assets/building.svg'
import { itemsFeedback, marketplaces } from "@utils/mock"

const BottomContent = () => {
    return (
        <>
            <div className="bg-feedback relative z-5 mt-[56px] w-screen pt-[80px] rounded-t-[80px] px-[38px] pb-10">
                <div className="grid place-items-center">
                    <div className="max-w-[1460px] space-y-12 relative">
                        <div className=" text-white w-[761px]">
                            <h1 className="font-bold text-[54px]">Отзывы о нас</h1>
                            <p className="text-lg font-normal w-[600px]">С другой стороны, реализация намеченных плановых заданий играет важную роль в формировании глубокомысленных рассуждений</p>
                        </div>

                        <FeedbackCarousel items={itemsFeedback} />

                        <img src={imgPlane} alt={imgPlane} className="absolute -top-20 left-90 z-5 float-rocket" />
                    </div>
                </div>
                <div className="flex px-30 justify-between items-center">
                    <div className="max-w-[455px]">
                        <h2 className="font-bold text-[54px] text-white leading-[110%]">
                            Где купить набор 3D-Креативик?
                        </h2>
                    </div>
                    <div className="relative grid gap-3 grid-cols-2 pr-10 z-10">
                        {marketplaces.map((m) => (
                            <a
                                key={m.name}
                                href={m.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`rounded-[22px] w-[334px] h-[250px] transition-transform hover:scale-105`}
                            >
                                <img
                                    src={m.logo}
                                    alt={m.name}
                                    className="w-full h-full object-fill"
                                />
                            </a>
                        ))}

                        <div className="absolute -bottom-150 -right-128 z-0">
                            <img
                                src={buildingImg}
                                alt={buildingImg}
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomContent