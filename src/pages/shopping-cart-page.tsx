import EmptyCartContent from "@widgets/profile/shopping-cart/empty-cart-content"
import ShoppingCartContent from "@widgets/profile/shopping-cart/shopping-cart-content"


const ShoppingCartPage = () => {

    const isEmpty = false

    return (
        <>
            <section className='bg-white rounded-t-[80px] md:py-20 mt-15'>
                {isEmpty ? <ShoppingCartContent /> : <EmptyCartContent />}
            </section>
        </>
    )
}

export default ShoppingCartPage