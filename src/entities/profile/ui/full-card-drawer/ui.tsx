"use client";
import { Button } from '@shadcn/button';
import { useEffect, useMemo, } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { formatPrice, plural } from "@utils/constant";
import { CartItem } from '@entities/profile/types';
import { useForm } from 'react-hook-form';
import CustomInput from '@feature/custom-input';
import CardItem from './card-item';



type CartDrawerProps = {
    open: boolean;
    onClose: () => void;

    items: CartItem[];
    currency?: string; // default: ₽

    onRemove?: (id: CartItem["id"]) => void;
    onCheckout?: () => void;
    onGoToCart?: () => void;

    onApplyPromo: (promocode: string) => void;
};

export default function CartDrawer({
    open,
    onClose,
    items,
    currency = "₽",
    onRemove,
    onCheckout,
    onGoToCart,
    onApplyPromo,
}: CartDrawerProps) {
    // esc to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const { handleSubmit: PromocodeSubmit, control, getValues, formState } = useForm({
        defaultValues: { promocode: "" }
    })

    const total = useMemo(
        () => items.reduce((s, it) => s + it.price, 0),
        [items]
    );
    const oldTotal = useMemo(
        () =>
            items.reduce(
                (s, it) => s + (typeof it.oldPrice === "number" ? it.oldPrice : it.price),
                0
            ),
        [items]
    );

    const onSubmitPromocode = () => {
        const value = getValues("promocode")
        onApplyPromo(value)
        // тут можно сделать API-запрос, валидацию и т.д.
    }

    return (

        <>
            <div className="px-6 md:px-8 py-5 h-full flex flex-col overflow-hidden">
                {/* Header */}
                <h2 className="mb-4 text-[18px] font-semibold text-dark-blue">
                    В корзине {items.length} товар{plural(items.length, ["", "а", "ов"])}
                </h2>

                {/* Items — занимает всё оставшееся место */}
                <ul className="flex-grow min-h-0 overflow-y-auto space-y-3 pr-1">
                    {items.map((item) => (
                        <CardItem
                            key={item.id}
                            item={item}
                            currency={currency}
                            onRemove={onRemove}
                        />
                    ))}
                </ul>

                {/* Footer — не скроллится */}
                <div className="pt-4 shrink-0">
                    <form
                        onSubmit={PromocodeSubmit(onSubmitPromocode)}
                        className="flex gap-2"
                    >
                        <div className="flex-1">
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

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-[22px] font-semibold text-secondary-text">Итого:</div>
                        <div className="text-right flex items-center gap-4">
                            {oldTotal > total ? (
                                <div className="text-[14px] text-secondary-gray line-through">
                                    {formatPrice(oldTotal)} {currency}
                                </div>
                            ) : (
                                <div className="h-[20px]" />
                            )}
                            <div className="text-[22px] font-bold text-secondary-text">
                                {formatPrice(total)} {currency}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <Button onClick={onCheckout} className="h-14 w-full rounded-full text-white">
                            Оформить заказ
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onGoToCart}
                            className="h-14 w-full rounded-full border-2"
                        >
                            <span className="flex items-center gap-1">
                                Перейти в корзину <ChevronRight className="h-5 w-5" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
}

