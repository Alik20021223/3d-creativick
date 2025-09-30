

import { cards } from "@entities/profile/mock"
import ShopCard from "@entities/profile/ui/shop-card"
import ShopCardPriceBlock from "@entities/profile/ui/shop-card-price-block"
import { Button } from "@shared/shadcn/button"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

const ShoppingCartContent = () => {




    return (
        <>
            <article className="flex flex-col md:px-10 px-2.5 py-15">
                <div className="flex max-md:flex-col justify-between w-full">
                    <div className="md:w-[70%] max-md:mb-10">
                        <h1 className="title-text max-md:text-center">В корзине 3 товара</h1>
                        <p className="description-text mt-[22px]">В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности.</p>
                    </div>
                    <Button variant="link" className="border-secondary-text text-[22px] leading-[130%] max-md:w-full text-secondary-text bg-white border h-14 w-[298px] button-shadow-blue hover:text-primary hover:border-primary">
                        Очистить корзину
                        <Trash2 />
                    </Button>
                </div>
                <div className="flex max-md:flex-col gap-5 w-full mt-10">
                    <div className="md:w-[70%] max-md:mb-10">
                        <div className="flex flex-col gap-4">
                            {cards.map((item, idx) => (
                                <ShopCard
                                    key={idx}
                                    data={item}
                                    onRemove={() => alert(`remove ${item.title}`)}
                                />
                            ))}
                        </div>
                        <div className="w-full flex justify-center md:justify-end py-3.5 mt-6">
                            <Link to="/" className="text-[22px] leading-[130%] underline text-primary">
                                В магазин
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-[calc(100%-70%)]">
                        <ShopCardPriceBlock />
                    </div>
                </div >
            </article >
        </>
    )
}

export default ShoppingCartContent