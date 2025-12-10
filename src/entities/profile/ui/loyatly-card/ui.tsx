import * as React from 'react';
import { cn } from '@shared/lib/utils';
import { ChevronDown } from 'lucide-react';
import { formatPrice } from '@utils/constant';
import { LoyaltyCardProps } from '@entities/profile/types';

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
    'Уровень повышается автоматически при достижении условий.',
    'Скидки не суммируются с другими акциями и промокодами, если не указано иное.',
    'Магазин оставляет за собой право изменять условия лояльности.',
  ],
  className,
}: LoyaltyCardProps) {
  const percent = React.useMemo(() => {
    if (maxReached) return 100;
    const done = Math.max(0, Math.min(nextThreshold - toNext, nextThreshold));
    return Math.round((done / nextThreshold) * 100);
  }, [maxReached, nextThreshold, toNext]);

  const [open, setOpen] = React.useState(false);

  return (
    <article className={cn('bg-secondary-white layotly-shadow rounded-[20px] p-2.5', className)}>
      {/* Header */}
      <div className='bg-gradient relative h-40 rounded-[10px] p-5 pr-0 text-white'>
        <div className='relative flex h-full items-stretch justify-between gap-4'>
          <div className='flex flex-col justify-between self-stretch'>
            <div className='flex flex-col'>
              <div className='text-[22px] leading-[110%] font-bold'>{badgeTitle}</div>
              <h3 className='text-2xl font-bold text-[#FFD300] md:text-[32px]'>{title}</h3>
            </div>

            <ul className='space-y-1.5 text-[15px] font-semibold'>
              {perks.map((p, i) => (
                <li key={i} className='flex items-start gap-2'>
                  <span className='leading-snug'>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Декоративная картинка */}
          {art && (
            <div className='pointer-events-none absolute -top-13 right-5 select-none max-md:scale-90 max-md:-right-2 md:scale-100'>
              <img 
                src={typeof art === 'string' ? art : ''} 
                alt={title}
                className='h-auto w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px]'
              />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className='mt-6'>
        {/* Прогресс */}
        <div className='mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-300'>
          <div
            className={cn('h-full rounded-full transition-[width]')}
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #6E53FF 0%, #B149F6 100%)',
            }}
          />
        </div>

        {!maxReached && (
          <div className='mb-4 flex items-center justify-between text-sm font-normal'>
            <span className='flex items-baseline gap-1'>
              <>
                <span className='text-dark-blue text-lg md:text-xl'>{f(toNext)} ₽</span>
                <span className='font-normal text-slate-400'>до следующего уровня</span>
              </>
            </span>
            <span className='text-dark-blue text-lg md:text-xl'>{f(nextThreshold)} ₽</span>
          </div>
        )}

        {/* Текст под прогрессом */}
        {maxReached ? (
          <div className='text-dark-blue mb-4 text-center font-semibold'>
            Вы достигли максимального уровня!
          </div>
        ) : (
          <div className='mb-4 space-y-2 px-3 text-[15px] text-slate-700'>
            <p>
              Для перехода на следующий уровень <b>3D {nextLevelName}</b> необходимо потратить ещё{' '}
              <b>{f(toNext)} ₽</b>.
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
          type='button'
          onClick={() => setOpen((o) => !o)}
          className='text-primary flex w-full items-center justify-between rounded-[12px] bg-slate-100 px-4 py-2 text-left font-semibold'
        >
          <span>Дополнительные правила</span>
          <ChevronDown className={cn('h-5 w-5 transition-transform', open && 'rotate-180')} />
        </button>

        <div
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows]',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className='min-h-0'>
            <ul className='text-secondary-text mt-2 list-disc space-y-2 pl-5 text-sm'>
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

export default LoyaltyLevelCard;
