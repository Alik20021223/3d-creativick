import { cn } from "@shared/lib/utils"
import { Button } from "@shadcn/button"
import bottomIcon from '@assets/main-top-bottom-icon.svg'
import topIcon from '@assets/top-main-top-icon.svg'
import bearImg from '@assets/bear-top-main.png'
import horseImg from '@assets/main-top-horse.png'
import dinoImg from '@assets/top-main-dinosaur.png'
import machineImg from '@assets/main-top-3d-machine.svg'


const TopMainContent = () => {
    return (
        <>
            <div className="bg-main relative mx-[38px] w-full">
                <div className="mt-[245px] z-10 w-[551px] flex flex-col text-white space-y-[47px] relative">
                    <h1 className="text-7xl font-bold leading-[110%] tracking-[0px] font-ros-bold">Сделай первый шаг в мир 3D!</h1>
                    <h3 className="text-[32px] font-normal leading-[120%] ">Играй, учись и создавай — вместе с Креативиком</h3>
                    <Button
                        variant="pink"
                        className={cn('font-bold text-[32px] w-[461px] h-[68px] ')}>
                        Начать моделировать
                    </Button>
                    <img src={bottomIcon} alt="bottomIcon" className="absolute bottom-0 mb-0 -left-[46.05px] opacity-50" />
                    <img src={topIcon} alt="topIcon" className="absolute -top-[92.1px]  mb-0 -right-[104.84px]" />
                </div>
                <div className="absolute -top-[120px] right-0">
                    <div className="relative">
                        <img src={bearImg} alt="bear" className="relative z-10 block" />

                        {/* Лошадь: плавает вверх-вниз (вверх к середине цикла) */}
                        <img
                            src={horseImg}
                            alt="horse"
                            className="absolute -top-[50px] -right-[430px] z-0 float"
                        />

                        {/* Дино: в противофазе (вниз к середине цикла) */}
                        <img
                            src={dinoImg}
                            alt="dino"
                            className="absolute z-0 -top-[415px] -left-[200px] float-rev"
                        />

                        <img
                            src={machineImg}
                            alt="machine"
                            className="absolute z-0 top-70 -left-[320px] "
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopMainContent