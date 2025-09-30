
import OrderCard from "@entities/profile/ui/order-card"
import { ordersMock } from "@entities/profile/mock"
import { Button } from "@shared/shadcn/button"
import { ArrowDown } from "lucide-react"

const OrderContent = () => {
    return (
        <>
            <section className="space-y-10">
                <div className="space-y-5 ">
                    {ordersMock.map((order, i) => (
                        <OrderCard key={i} data={order} />
                    ))}
                </div>

                <div className="flex justify-center w-full">
                    <Button variant="link" className="border-secondary-text text-[22px] leading-[130%] max-md:w-fit text-secondary-text bg-white border h-14  button-shadow-blue hover:text-primary hover:border-primary">
                        Показать еще
                        <ArrowDown />
                    </Button></div>
            </section>
        </>
    )
}

export default OrderContent