import { useTocObserver } from '@app/hook/useTockObserver';
import { Section } from '@entities/support/types';
import React from 'react';

type Props = {
  sections: Section[];
};

const ArticleContent: React.FC<Props> = ({ sections }) => {
  const ids = sections.map((s) => s.id);
  const { activeId, handleClick } = useTocObserver(ids);

  return (
    <div className='mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>
      {/* LEFT */}
      <article className='space-y-8'>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className='scroll-mt-28'>
            {s.title && <h2 className='mb-3 text-2xl font-bold text-[#0B60C2]'>{s.title}</h2>}

            <div className='space-y-4'>
              {s.type === 'text' && <p className='paragraph'>{s.content}</p>}

              {s.type === 'image' && (
                <figure className='overflow-hidden rounded-3xl'>
                  <img src={s.src} alt='' className='h-[185px] w-full object-cover md:h-[500px]' />
                </figure>
              )}

              {s.type === 'quote' && <blockquote className='text-gray-700'>{s.content}</blockquote>}

              {s.type === 'callout' && <div className='text-[#0B60C2]'>{s.content}</div>}

              {s.type === 'list' && (
                <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                  {s.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </article>

      {/* RIGHT TOC */}
      <aside className='hidden md:block lg:pl-4'>
        <div className='border-l border-[#B4B7C280] p-4 lg:sticky lg:top-6'>
          <h4 className='text-secondary-text mb-2 font-semibold'>Содержание</h4>
          <nav className='flex flex-col gap-2'>
            {sections.map((s) => {
              const active = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleClick(s.id)}
                  className={[
                    'rounded-full px-4 py-2 text-left transition',
                    active
                      ? 'bg-secondary-white border-dark-blue text-dark-blue border shadow-[0_8px_24px_rgba(16,24,40,0.06)]'
                      : 'text-[#6b7280] hover:bg-[#f5f9ff]',
                  ].join(' ')}
                >
                  {s.title}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default ArticleContent;
