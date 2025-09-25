import { DropdownMenuSeparator } from "@shadcn/dropdown-menu"
import CustomInput from "@feature/custom-input"
import { Button } from "@shared/shadcn/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import PriceList from "@shared/components/PriceList"

const ShopCardPriceBlock = () => {

    const { handleSubmit: PromocodeSubmit, control, getValues, formState } = useForm({
        defaultValues: { promocode: "" }
    })

    const onSubmitPromocode = () => {
        const value = getValues("promocode")
        console.log("Промокод:", value)
        // тут можно сделать API-запрос, валидацию и т.д.
    }

    return (
        <>
            <div className="rounded-[20px] bg-secondary-white p-2.5 w-full">
                <form
                    onSubmit={PromocodeSubmit(onSubmitPromocode)}
                    className="flex gap-2"
                >
                    <div className="flex-1 ">
                        <CustomInput
                            name="promocode"
                            placeholder="Промокод"
                            clearable
                            control={control}
                            rules={{ required: "Введите промокод" }}
                            className="h-14 rounded-[40px] text-lg! flex-1 flex"
                        />
                    </div>
                    <Button
                        disabled={!formState.isValid}
                        type="submit"
                        variant="outline"
                        className="h-[56px] w-[56px] flex justify-center items-center"
                    >
                        <ArrowRight />
                    </Button>
                </form>
                <div className="my-4 px-[21px]">
                    <div className="flex justify-between text-[22px] items-center mb-4">
                        <span className="font-bold leading-[110%]">3 товара</span>
                        <span className="leading-[130%] font-normal">543 846
                            <span className="text-sm">₽</span>
                        </span>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="mt-2">
                        <PriceList
                            items={[
                                { label: "Промокод", price: 1423 },
                                { label: "Акции", price: 1423 },
                            ]}
                            className="space-y-2"
                        />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-[10px]">
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-lg font-normal text-dark-blue">
                            <span className="">Общая цена</span>
                            <span>- 2 846 ₽</span>
                        </div>
                        <div className="flex justify-between text-[22px] font-bold leading-[110%] text-secondary-text">
                            <span className="">Итого:</span>
                            <span>412 324 ₽</span>
                        </div>
                    </div>
                    <Button className="w-full h-14 text-[22px]  text-white">
                        Перейти к оформлению <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ShopCardPriceBlock