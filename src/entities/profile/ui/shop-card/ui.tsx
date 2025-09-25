import { Button } from "@shadcn/button";
import { formatPrice } from "@/utils/constant";
import { Trash2 } from "lucide-react";


export type ShopCardProps = {
    title: string;
    description?: string;
    href?: string;
    imageUrl?: string;
    price: number;
    oldPrice?: number | null;
    currency?: string; // default: ₽
    onRemove?: () => void;
    className?: string;
};

/**
 * Responsive, accessible card inspired by the screenshot.
 * TailwindCSS required.
 */
export default function ShopCard({
    title,
    description,
    href = "#",
    imageUrl,
    price,
    oldPrice,
    currency = "₽",
    onRemove,
    className = "",
}: ShopCardProps) {

    return (
        <article
            className={
                "group relative flex w-full items-stretch gap-6 rounded-3xl bg-secondary-white p-5 " +
                className
            }
            role="article"
        >
            {/* Image */}
            <a
                href={href}
                className="md:block hidden relative aspect-[16/10] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white outline-none ring-offset-2 transition group-hover:border-slate-300 focus:ring-2 focus:ring-indigo-500"
                aria-label={title}
            >
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full  w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        {/* image placeholder */}
                        <svg
                            width="56"
                            height="56"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="opacity-50"
                        >
                            <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7 13l3-3 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="9" cy="8" r="1.5" fill="currentColor" />
                        </svg>
                    </div>
                )}
            </a>

            {/* Text / Prices */}
            <div className="flex flex-1 justify-between gap-6">
                <div className="md:w-[70%] max-md:w-[50%] md:py-[14.5px] py-[9.5px] space-y-4.5 h-full flex flex-col">
                    <h3 className="truncate text-[22px] font-semibold leading-tight text-secondary-text">
                        {title}
                    </h3>
                    {description ? (
                        <p className="line-clamp-2 max-w-prose text-sm leading-relaxed text-slate-600">
                            {description}
                        </p>
                    ) : null}
                    <div className="flex-grow items-end flex">
                        <a
                            href={href}
                            className="inline-block text-sm font-medium text-dark-blue underline-offset-4 hover:underline"
                        >
                            Подробнее
                        </a>
                    </div>
                </div>

                {/* Prices */}
                <div className="flex flex-col h-full justify-end items-end">
                    {typeof oldPrice === "number" && oldPrice > price ? (
                        <div className="mb-5 text-right text-[18px] leading-[130%] text-secondary-gray line-through">
                            {formatPrice(oldPrice)} {currency}
                        </div>
                    ) : (
                        <div className="h-[26px]" />
                    )}
                    <div className="text-right text-[32px] font-bold leading-[110%] text-dark-blue">
                        {formatPrice(price)} {currency}
                        <span className="align-super text-[14px] text-blue-700/70"> </span>
                    </div>
                </div>
            </div>

            {/* Remove button */}
            <Button
                variant="outline"
                type="button"
                onClick={onRemove}
                className="absolute right-4 top-4 inline-flex h-10 w-10 border-secondary-gray bg-transparent text-secondary-gray hover:text-primary hover:border-primary shadow-button"
                aria-label="Удалить"
            >
                <Trash2 />
            </Button>
        </article>
    );
}


