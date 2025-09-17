import { exclusiveProductsMock } from "@utils/mock"
import ProductCarousel from "@feature/exclusive-carousel"
import OurActionsContent from "@entities/main/ui/our-actions"
import buildingImg from '@assets/building.svg';
import { marketplaces, marketplacesMobile } from '@utils/mock';
import { useIsMobile } from "@app/hook/useMobile";

const BottomContent = () => {

    const isMobile = useIsMobile()

    const marketPlaceItems = isMobile ? marketplacesMobile : marketplaces

    return (
        <>
            <section className='md:pt-20 pt-15'>
                <div className="">
                    <h1 className='title-text px-10 max-md:pb-10 max-md:text-center'>Может быть интересно</h1>
                    <ProductCarousel items={exclusiveProductsMock} />
                </div>
                <div className="px-10">
                    <OurActionsContent />
                </div>
                <div className="mt-[56px] bg-feedback rounded-t-[80px] pb-5 pt-15 px-10 z-0">
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
            </section>
        </>
    )
}

export default BottomContent