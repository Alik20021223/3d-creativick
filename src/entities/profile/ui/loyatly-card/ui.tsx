import * as React from "react";
import { cn } from "@shared/lib/utils";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "@utils/constant";
import { LoyaltyCardProps } from "@entities/profile/types";

// Утилита форматирования
const f = (n: number) => formatPrice(n);


function LoyaltyLevelCard({
    badgeTitle,
    title,
    perks,
    art,
    toNext,
    nextThreshold,
    maxReached = false,
    nextLevelName,
    nextLevelDiscount,
    rules = [
        "Уровень повышается автоматически при достижении условий.",
        "Скидки не суммируются с другими акциями и промокодами, если не указано иное.",
        "Магазин оставляет за собой право изменять условия лояльности.",
    ],
    className,
}: LoyaltyCardProps) {
    const percent = React.useMemo(() => {
        if (maxReached) return 100;
        const done = Math.max(0, Math.min(nextThreshold - toNext, nextThreshold));
        return Math.round((done / nextThreshold) * 100);
    }, [maxReached, nextThreshold, toNext]);

    const [open, setOpen] = React.useState(false);

    console.log(nextLevelDiscount);


    return (
        <article
            className={cn(
                "rounded-[20px] bg-secondary-white layotly-shadow p-2.5",
                className
            )}
        >
            {/* Header */}
            <div
                className="relative p-5 pr-0 text-white bg-gradient rounded-[10px] h-40"
            >
                <div className="flex items-stretch justify-between gap-4 h-full relative">
                    <div className="flex flex-col justify-between self-stretch">
                        <div className="flex flex-col">
                            <div className="text-[22px] font-bold leading-[110%]">{badgeTitle}</div>
                            <h3 className="text-2xl md:text-[32px] font-bold text-[#FFD300]">{title}</h3>
                        </div>

                        <ul className="space-y-1.5 text-[15px] font-semibold">
                            {perks.map((p, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="leading-snug">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Декоративная картинка */}
                    {art && (
                        <div className="pointer-events-none select-none absolute right-5 -top-13">
                            <img src={typeof art === "string" ? art : ""} alt={title} />
                        </div>
                    )}

                </div>
            </div>

            {/* Body */}
            <div className="mt-6">
                {/* Прогресс */}
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-300">
                    <div
                        className={cn("h-full rounded-full transition-[width]")}
                        style={{
                            width: `${percent}%`,
                            background:
                                "linear-gradient(90deg, #6E53FF 0%, #B149F6 100%)",
                        }}
                    />
                </div>

                {!maxReached && <div className="mb-4 flex items-center justify-between text-sm font-normal">
                    <span className="flex items-baseline gap-1">
                        (
                        <>
                            <span className="text-dark-blue text-lg md:text-xl">
                                {f(toNext)} ₽
                            </span>
                            <span className="text-slate-400 font-normal">
                                до следующего уровня
                            </span>
                        </>
                        )
                    </span>

                    (
                    <span className="text-dark-blue text-lg md:text-xl">
                        {f(nextThreshold)} ₽
                    </span>
                    )
                </div>}


                {/* Текст под прогрессом */}
                {maxReached ? (
                    <div className="mb-4 text-dark-blue font-semibold text-center">
                        Вы достигли максимального уровня!
                    </div>
                ) : (
                    <div className="mb-4 space-y-2 text-[15px] text-slate-700 px-3">
                        <p>
                            Для перехода на следующий уровень <b>3D {nextLevelName}</b>{" "}
                            необходимо потратить ещё <b>{f(toNext)} ₽</b>.
                        </p>
                        {nextLevelDiscount && (
                            <p>
                                Скидка на следующем уровне составит <b>{nextLevelDiscount}</b>.
                            </p>
                        )}
                    </div>
                )}

                {/* Аккордеон «Дополнительные правила» */}
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="flex w-full items-center justify-between rounded-[12px] bg-slate-100 px-4 py-2 text-left font-semibold text-primary"
                >
                    <span>Дополнительные правила</span>
                    <ChevronDown
                        className={cn(
                            "h-5 w-5 transition-transform",
                            open && "rotate-180"
                        )}
                    />
                </button>

                <div
                    className={cn(
                        "overflow-hidden transition-[grid-template-rows] grid",
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                >
                    <div className="min-h-0">
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-secondary-text">
                            {rules.map((r, i) => (
                                <li key={i}>{r}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default LoyaltyLevelCard
