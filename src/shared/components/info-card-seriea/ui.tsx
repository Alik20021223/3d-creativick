import ButtonSave from '@feature/button-save';
import { Button } from '@shared/shadcn/button';
import { SeriesCardData } from '@entities/products/types';

type SeriesSummaryCardProps = {
  data: SeriesCardData;
  onAdd: () => void;
  onToggleSave: () => void;
  isSaved: boolean;
};

export default function SeriesSummaryCard({
  data,
  onAdd,
  onToggleSave,
  isSaved,
}: SeriesSummaryCardProps) {
  const {
    title,
    prices: { current, old = null, currencySymbol = '₽', locale = 'ru-RU' },
    labels = {},
  } = data;

  const addLabel = labels.addToCart ?? 'В корзину';
  const ariaOn = labels.savedAriaOn ?? 'Удалить из сохранённых';
  const ariaOff = labels.savedAriaOff ?? 'Сохранить товар';

  const fmt = (n: number) => n.toLocaleString(locale);

  return (
    <div className='container-custom flex justify-between rounded-[28px] bg-white px-5 py-8 max-md:flex-col max-md:gap-8 md:w-full'>
      <div className='flex w-full items-center justify-between gap-5 text-black max-md:flex-col md:w-[70%] md:space-x-[124px]'>
        <h1 className='text-[24px] font-bold whitespace-nowrap md:text-[32px]'>{title}</h1>
      </div>

      <div className='flex flex-col gap-[18px]'>
        <div className='flex items-end justify-center gap-5 max-md:flex-row-reverse'>
          {old != null && (
            <div className='mb-1 text-base text-slate-400 italic line-through'>
              {fmt(old)}
              {currencySymbol}
            </div>
          )}

          <div className='text-dark-blue text-3xl leading-none font-extrabold'>
            {fmt(current)} <span className='text-[22px] font-bold'>{currencySymbol}</span>
          </div>
        </div>

        <div className='flex h-[46px] w-full items-center md:h-[56px]'>
          <Button onClick={onAdd} className='h-full w-full flex-1 rounded-full text-white'>
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
