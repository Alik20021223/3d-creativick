import FavoriteItem from "@/entities/profile/ui/favorite-card"
import { Button } from "@/shared/shadcn/button"
import { cards } from "@entities/profile/mock"
import { ArrowDown } from "lucide-react"

const FavoriteContent = () => {
    return (
        <>
            <section className="space-y-10">
                <div className="space-y-5">
                    {cards.map((favorite, i) => (
                        <FavoriteItem key={i} data={favorite} />
                    ))}
                </div>

                <div className="flex justify-center w-full">
                    <Button variant="link" className="border-secondary-text text-[22px] leading-[130%] max-md:w-full text-secondary-text bg-white border h-14  button-shadow-blue hover:text-primary hover:border-primary">
                        Показать еще
                        <ArrowDown />
                    </Button></div>
            </section>
        </>
    )
}

export default FavoriteContent