import { Star } from 'lucide-react';
import * as React from 'react';

type FeedBackBlockProps = {
  rating: number; // теперь ожидаем 1..5
  text: string;
  authorName: string;
  authorRole?: string;
  avatarUrl?: string;
  size?: 'base' | 'compact';
  className?: string;
};

export default function FeedBackBlock({
  rating,
  text,
  authorName,
  authorRole = '',
  avatarUrl,
  size = 'base',
  className = '',
}: FeedBackBlockProps) {
  const stars = 5;

  // Кладём целое значение (1..5)
  const value = Math.max(1, Math.min(5, Math.round(rating)));

  const initials = React.useMemo(() => {
    const parts = authorName.trim().split(/\s+/);
    return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
  }, [authorName]);

  const isCompact = size === 'compact';

  return (
    <div
      className={[
        'relative rounded-4xl',
        'p-5 md:p-8',
        'flex flex-col h-full',
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:content-['']",
        'bg-white',
        className,
      ].join(' ')}
      aria-label={`Отзыв: ${authorName}, рейтинг ${value} из 5`}
    >
      {/* Рейтинг */}
      <div className='flex items-center gap-1.5'>
        {Array.from({ length: stars }).map((_, i) => {
          const filled = i < value;
          return (
            <span key={i} className='inline-block'>
              <Star
                className={['h-5 w-5', filled ? 'fill-current text-sky-400' : 'text-sky-300'].join(
                  ' ',
                )}
              />
            </span>
          );
        })}
      </div>

      {/* Текст отзыва */}
      <p
        className={[
          'mt-3 text-slate-800 sm:mt-4',
          isCompact ? 'text-sm leading-[1.45]' : 'text-base leading-[1.45]',
          'text-pretty',
        ].join(' ')}
      >
        {text}
      </p>

      {/* Автор */}
      <div className='mt-4 flex items-center gap-3 sm:mt-8'>
        {avatarUrl ? (
          <img src={avatarUrl} alt={authorName} className='h-10 w-10 rounded-full object-cover' />
        ) : (
          <div
            className='grid h-10 w-10 place-items-center rounded-full bg-slate-900 font-medium text-white'
            aria-hidden
          >
            {initials.toUpperCase()}
          </div>
        )}
        <div className='min-w-0'>
          <div className='truncate font-medium text-slate-900'>{authorName}</div>
          {authorRole && <div className='truncate text-sm text-slate-500'>{authorRole}</div>}
        </div>
      </div>
    </div>
  );
}
