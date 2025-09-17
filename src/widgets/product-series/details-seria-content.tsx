import { DETAILS_MOCK_10 } from '@utils/mock';
import DetailsCarousel from '@entities/products/ui/details-carousel';

const DetailsSeriesContent = () => {
    return (
        <>
            <section className="pt-20 pb-25">
                <h1 className='title-text px-10 max-md:pb-10 max-md:text-center text-white'>Детали серии</h1>
                <DetailsCarousel items={DETAILS_MOCK_10} />
            </section>
        </>
    )
}

export default DetailsSeriesContent