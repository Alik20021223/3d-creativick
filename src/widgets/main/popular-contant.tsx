import { exclusiveProductsMock } from "@utils/mock"
import ProductCarousel from "@feature/exclusive-carousel"


const PopularContent = () => {
    return (
        <>
            <section className="relative z-[60] md:mt-[241px] rounded-t-[80px] md:pb-15 bg-white">
                <div className="pt-20">
                    <h1 className="title-text px-10">Популярно сейчас</h1>
                    <ProductCarousel items={exclusiveProductsMock} />
                </div>
            </section>
        </>
    )
}

export default PopularContent