import { cn } from "@/shared/lib/utils";
import { Button } from "@shared/shadcn/button";
import * as React from "react";
import { OrderCardItem } from "@entities/profile/types";
import BadgeInfo from "@feature/badge-info";
import { statusConfig } from "@entities/profile/mock";
import { splitDateTime } from "@utils/constant";

export type OrderCardProps = {
    data: OrderCardItem
    className?: string;
};

const formatPrice = (n: number) =>
    new Intl.NumberFormat("ru-RU").format(n);

const OrderCard: React.FC<OrderCardProps> = ({
    data,
    className,
}) => {

    const {
        orderNumber,
        status,
        createdAt,
        paidAt,
        price,
        currency = "₽",
        facts = [],
        onDownload,
        onReorder,
        onPay
    } = data

    const cfg = statusConfig[status];
    const ctaHandler =
        (cfg.ctaHandlerKey === "onDownload" && onDownload) ||
        (cfg.ctaHandlerKey === "onReorder" && onReorder) ||
        (cfg.ctaHandlerKey === "onPay" && onPay) ||
        undefined;

    return (
        <section
            className={cn(
                "rounded-3xl bg-[#EFF4F8] px-3 md:h-45 h-[261px] md:px-10 md:py-8 py-5",
                "flex flex-col space-y-6 justify-center",
                className
            )}
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Левый блок: название + даты */}
                <div className="flex-1 flex gap-6 min-w-0 max-md:justify-between">
                    <div className="flex flex-col max-md:flex-col-reverse md:items-center gap-2.5">
                        <h3 className="text-2xl font-bold text-slate-900">Заказ #{orderNumber}</h3>

                        <span className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-full md:h-9 h-6.5 w-40 text-sm font-medium",
                            cfg.leftPillClass
                        )}>
                            <cfg.LeftIcon className="h-4 w-4" />
                            {cfg.label}
                        </span>
                    </div>

                    <div className="md:flex hidden gap-6 text-secondary-gray text-sm max-w-xl">
                        <div>
                            <div className="font-semibold mb-2.5">Дата создания</div>
                            {createdAt ? (
                                <div>
                                    <div>{splitDateTime(createdAt).date}</div>
                                    <div>в {splitDateTime(createdAt).time}</div>
                                </div>
                            ) : (
                                <div className="opacity-60">—</div>
                            )}
                        </div>

                        <div>
                            <div className="font-semibold mb-2.5">Дата оплаты</div>
                            {paidAt ? (
                                <div >
                                    <div>{splitDateTime(paidAt).date}</div>
                                    <div>в {splitDateTime(paidAt).time}</div>
                                </div>
                            ) : (
                                <div className="opacity-60">—</div>
                            )}
                        </div>
                    </div>

                    <div className="text-3xl md:text-4xl font-extrabold text-[#0B4CA1] whitespace-nowrap md:hidden">
                        {formatPrice(price)} <span className="text-sm align-bottom font-normal">{currency}</span>
                    </div>
                </div>

                {/* Центр: сумма + CTA */}
                <div className="flex max-md:flex-col items-center md:gap-10 gap-6">
                    <div className="text-3xl md:text-4xl font-extrabold text-[#0B4CA1] whitespace-nowrap max-md:hidden">
                        {formatPrice(price)} <span className="text-sm align-bottom font-normal">{currency}</span>
                    </div>

                    <div className="max-md:flex hidden gap-6 text-secondary-gray w-full text-sm md:max-w-xl">
                        <div className="max-md:w-1/2">
                            <div className="font-semibold mb-2.5">Дата создания</div>
                            {createdAt ? (
                                <div>
                                    <div>{splitDateTime(createdAt).date}</div>
                                    <div>в {splitDateTime(createdAt).time}</div>
                                </div>
                            ) : (
                                <div className="opacity-60">—</div>
                            )}
                        </div>

                        <div className="max-md:w-1/2">
                            <div className="font-semibold mb-2.5">Дата оплаты</div>
                            {paidAt ? (
                                <div >
                                    <div>{splitDateTime(paidAt).date}</div>
                                    <div>в {splitDateTime(paidAt).time}</div>
                                </div>
                            ) : (
                                <div className="opacity-60">—</div>
                            )}
                        </div>
                    </div>

                    <Button
                        disabled={!ctaHandler}
                        onClick={ctaHandler}
                        className={cn(
                            "h-11.5 rounded-full md:w-50 w-full text-base font-normal shadow-sm",
                            "text-white",
                        )}
                    >
                        {cfg.ctaText}
                        {cfg.CtaIcon && <cfg.CtaIcon className="mr-2 h-5 w-5" />}
                    </Button>
                </div>


                <div className="md:basis-[280px] md:shrink-0 md:block hidden w-full md:w-auto">
                    <ul
                        className={cn(
                            "flex flex-col gap-2 transition-opacity",
                            facts.length ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                        )}
                    >
                        {facts.map((f, i) => (
                            <BadgeInfo data={f} key={i} />
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default OrderCard