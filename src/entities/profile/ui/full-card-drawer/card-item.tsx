"use client";
import React from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { formatPrice } from "@utils/constant";
import type { CartItem as TCartItem } from "@entities/profile/types";

export type CardItemProps = {
    item: TCartItem;
    currency?: string;               // default: ₽
    onRemove?: (id: TCartItem["id"]) => void;
};

const CardItem: React.FC<CardItemProps> = ({ item, currency = "₽", onRemove }) => {
    const { id, title, href, imageUrl, price, oldPrice } = item;

    return (
        <li
            className="relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3"
        >
            {/* thumb */}
            <a
                href={href ?? "#"}
                className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white"
                aria-label={title}
            >
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                ) : (
                    <ImageIcon className="h-5 w-5 opacity-60" />
                )}
            </a>

            {/* title/links */}
            <div className="flex-1 min-w-0">
                <a
                    href={href ?? "#"}
                    className="block truncate text-[15px] font-medium text-secondary-text"
                    title={title}
                >
                    {title}
                </a>
                <a
                    href={href ?? "#"}
                    className="text-[13px] text-dark-blue underline-offset-4 hover:underline"
                >
                    Подробнее
                </a>
            </div>

            {/* prices */}
            <div className="text-right">
                <div className="text-[18px] font-semibold text-dark-blue">
                    {formatPrice(price)} {currency}
                </div>
                {typeof oldPrice === "number" && oldPrice > price ? (
                    <div className="text-[12px] text-secondary-gray line-through">
                        {formatPrice(oldPrice)} {currency}
                    </div>
                ) : (
                    <div className="h-[18px]" />
                )}
                {onRemove && (
                    <button
                        onClick={() => onRemove(id)}
                        aria-label="Удалить"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-secondary-gray hover:border-primary hover:text-primary"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
            </div>
        </li>
    );
};

export default CardItem;
