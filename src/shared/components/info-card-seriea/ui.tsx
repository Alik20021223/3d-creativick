import ButtonSave from "@feature/button-save";
import { Button } from "@shared/shadcn/button";
import { SeriesCardData } from "@entities/products/types";

type SeriesSummaryCardProps = {
    data: SeriesCardData;
    onAdd: () => void;
    onToggleSave: () => void;
    isSaved: boolean;
};

export default function SeriesSummaryCard({ data, onAdd, onToggleSave, isSaved }: SeriesSummaryCardProps) {
    const {
        title,
        description,
        prices: {
            current,
            old = null,
            currencySymbol = '₽',
            locale = 'ru-RU',
        },
        labels = {},
    } = data;

    const addLabel = labels.addToCart ?? 'В корзину';
    const ariaOn = labels.savedAriaOn ?? 'Удалить из сохранённых';
    const ariaOff = labels.savedAriaOff ?? 'Сохранить товар';

    const fmt = (n: number) => n.toLocaleString(locale);

    return (
        <div className="bg-white container-custom md:w-full rounded-[28px] px-5 py-8 flex justify-between max-md:flex-col max-md:gap-8">
            <div className="flex justify-between md:w-[70%] w-full max-md:flex-col items-center md:space-x-[124px] text-black gap-5">
                <h1 className="font-bold md:text-[32px] text-[24px] whitespace-nowrap">{title}</h1>
                {description && (
                    <p className="opacity-80 max-w-[600px] text-lg">{description}</p>
                )}
            </div>


            <div className="flex flex-col gap-[18px]">
                <div className="flex max-md:flex-row-reverse items-end justify-center gap-5">
                    {old != null && (
                        <div className="mb-1 text-slate-400 italic line-through text-base">
                            {fmt(old)}{currencySymbol}
                        </div>
                    )}

                    <div className="text-dark-blue text-3xl leading-none font-extrabold">
                        {fmt(current)} <span className="text-[22px] font-bold">{currencySymbol}</span>
                    </div>
                </div>

                <div className="flex md:h-[56px] h-[46px] w-full items-center">
                    <Button onClick={onAdd} className="h-full w-full flex-1 rounded-full text-white">
                        {addLabel}
                    </Button>

                    <ButtonSave
                        onSave={(e) => {
                            e.stopPropagation?.();
                            onToggleSave();
                        }}
                        status={isSaved}
                        aria-label={isSaved ? ariaOn : ariaOff}
                    />
                </div>
            </div>
        </div>
    );
}