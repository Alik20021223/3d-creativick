import { Button } from "@shadcn/button";
import { formatPrice } from "@/utils/constant";
import { Image, } from "lucide-react";
import { CartItem } from "@entities/profile/types";
import { cn } from "@shared/lib/utils";
import ButtonSave from "@feature/button-save";
import { useState } from "react";

type FavoriteItemProps = {
    data: CartItem;
    currency?: string; // default: ₽
    onAddToCart?: () => void; // добавить в корзину
    className?: string;
};

export default function FavoriteItem({
    data,
    currency = "₽",
    onAddToCart,
    className = "",
}: FavoriteItemProps) {
    const { href, title, imageUrl, description, oldPrice, price } = data;

    const [isSave, setSave] = useState(true)

    return (
        <article
            className={cn(
                "group relative flex max-md:flex-col w-full items-stretch md:gap-6 gap-5 rounded-[28px] bg-secondary-white md:p-5 p-2.5 md:h-[190px] h-[310px]",
                className
            )}
            role="article"
        >
            {/* Изображение */}
            <a
                href={href}
                className="relative aspect-square md:w-[200px] w-full h-37.5 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white outline-none ring-offset-2 transition group-hover:border-slate-300 focus:ring-2 focus:ring-indigo-500"
                aria-label={title}
            >
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Image className="h-10 w-10 text-slate-400" />
                    </div>
                )}
            </a>

            {/* Контент */}
            <div className="flex flex-1 justify-between max-md:items-center gap-6">
                {/* Текст */}
                <div className="flex flex-col justify-center md:space-y-3">
                    <h3 className="truncate text-[22px] font-semibold leading-tight text-secondary-text">
                        {title}
                    </h3>
                    {description ? (
                        <p className="line-clamp-2 max-w-prose text-sm leading-relaxed text-slate-600 max-md:hidden">
                            {description}
                        </p>
                    ) : null}
                    <a
                        href={href}
                        className="inline-block text-sm font-medium text-dark-blue underline-offset-4 hover:underline max-md:hidden"
                    >
                        Подробнее
                    </a>


                </div>
                <ButtonSave className="h-10 w-10 md:hidden" active={true} onSave={() => setSave(!isSave)} status={isSave} />

            </div>

            <div className="flex max-md:hidden flex-col justify-end items-end gap-3 min-w-[220px]">
                {typeof oldPrice === "number" && oldPrice > price ? (
                    <div className="text-right text-[18px] leading-[130%] text-secondary-gray line-through">
                        {formatPrice(oldPrice)} {currency}
                    </div>
                ) : (
                    <div className="h-[26px]" />
                )}
                <div className="text-right text-[32px] font-bold leading-[110%] text-dark-blue">
                    {formatPrice(price)} {currency}
                </div>

            </div>

            <div className="flex md:flex-col justify-between items-end">
                <ButtonSave className="md:w-12.5 md:h-12.5 max-md:hidden" active={true} onSave={() => setSave(!isSave)} status={isSave} />
                <div className="flex md:hidden flex-col justify-start items-start min-w-[220px]">
                    {typeof oldPrice === "number" && oldPrice > price ? (
                        <div className="text-left text-[18px] leading-[130%] text-secondary-gray line-through">
                            {formatPrice(oldPrice)} {currency}
                        </div>
                    ) : (
                        <div className="h-[26px]" />
                    )}
                    <div className="text-left text-[24px] font-bold leading-[110%] text-dark-blue">
                        {formatPrice(price)} {currency}
                    </div>

                </div>
                <Button
                    type="button"
                    onClick={onAddToCart}
                    className="h-11 rounded-full px-14 bg-[#0B82E5] hover:bg-[#0B74CF] text-white text-base font-medium"
                >
                    В корзину
                </Button>
            </div>

            {/* Кнопка убрать из избранного */}

        </article>
    );
}
