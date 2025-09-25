import { formatPrice } from "@utils/constant";

type Row = {
    label: string;
    price: number;
};

export type PriceListProps = {
    items: Row[];
    currency?: string;
    className?: string;
};

export default function PriceList({
    items,
    currency = "₽",
    className = "",
}: PriceListProps) {
    return (
        <div className={"flex w-full flex-col " + className}>
            {items.map((row, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between text-[18px] text-secondary-text"
                >
                    <span>{row.label}</span>
                    <span className="font-medium text-slate-700">
                        - {formatPrice(row.price)} {currency}
                    </span>
                </div>
            ))}
        </div>
    );
}