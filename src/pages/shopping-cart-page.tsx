import EmptyState from "@feature/empty-content"
import ShoppingCartContent from "@widgets/profile/shopping-cart/shopping-cart-content"
import { Link } from "react-router-dom"
import miniBearCard from '@assets/bear-card-store.png'


const ShoppingCartPage = () => {

    const isEmpty = true

    return (
        <>
            <section className='bg-white rounded-t-[80px] md:py-20 mt-15'>
                {isEmpty ? <ShoppingCartContent /> :
                    <EmptyState
                        title="Здесь пока ещё ничего нет"
                        description="В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности."
                        imageSrc={miniBearCard}
                        imageAlt="mini-bear-store"
                        ctaText="В каталог"
                        to="/catalog"
                        LinkComponent={Link}
                        align="left"
                    />}
            </section>
        </>
    )
}

export default ShoppingCartPage