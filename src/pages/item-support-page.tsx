// pages/ItemSupportPage.tsx
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import { SameArticle } from '@widgets/support-content/item/same-article';
import ArticleContent from '@widgets/support-content/item/article-content';
import type { BreadCrumpType } from '@shared/types';

import { SupportTabs } from '@utils/mock';
import { useGetByFaqId } from '@entities/support/hooks/getFaqById';

export default function ItemSupportPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const numericId = Number(id ?? 0);

  const { data: faq, isLoading, error } = useGetByFaqId(numericId);

  // таб из query ?tab=...
  const tabId = searchParams.get('tab');

  // считаем всё, что нужно, но защищаемся от отсутствия faq
  const { heroTitle, tabLabel, htmlContent, pathMap } = useMemo(() => {
    if (!faq) {
      return {
        heroTitle: 'Статья поддержки',
        tabLabel: 'Поддержка',
        htmlContent: '',
        pathMap: { support: [] as BreadCrumpType[] },
      };
    }

    const heroTitleLocal = faq.translation?.title ?? 'Статья поддержки';

    const categoryFromFaq = faq.category?.translations?.[0]?.title ?? 'Категория';

    const tabLabelLocal = SupportTabs.find((t) => t.id === tabId)?.label ?? categoryFromFaq;

    const htmlContentLocal = faq.translation?.description ?? '';

    const pathMapLocal = {
      support: [
        {
          PATH: '/support',
          BREADCRUMB: tabLabelLocal,
          LINK: tabId ? `/support?tab=${tabId}#faq` : '/support',
        },
        {
          PATH: '/support/:id',
          BREADCRUMB: heroTitleLocal,
        },
      ],
    };

    return {
      heroTitle: heroTitleLocal,
      tabLabel: tabLabelLocal,
      htmlContent: htmlContentLocal,
      pathMap: pathMapLocal,
    };
  }, [faq, tabId]);

  // дальше — только рендер, без новых хуков и ранних return до хуков
  let content: React.ReactNode;

  if (isLoading && !faq) {
    content = <div className='text-secondary-text py-10 text-center'>Загрузка статьи...</div>;
  } else if (error && !faq) {
    content = (
      <div className='text-secondary-text py-10 text-center'>Не удалось загрузить статью</div>
    );
  } else if (!faq) {
    content = <div className='text-secondary-text py-10 text-center'>Статья не найдена</div>;
  } else {
    content = (
      <>
        {/* CONTENT */}
        <ArticleContent htmlContent={htmlContent} />

        {/* SIMILAR */}
        <div className='mt-12'>
          <div className='mb-4 flex items-center gap-2'>
            <h2 className='title-text'>Похожие статьи</h2>
          </div>
          <SameArticle currentId={faq.id} />
        </div>
      </>
    );
  }

  return (
    <section className='mt-25 rounded-t-[60px] bg-white px-2.5 pt-2.5 pb-15 md:rounded-t-[80px] md:px-10 md:pt-10 md:pb-30'>
      {/* HERO */}
      <div className='bg-catalog h-[184px] w-full overflow-hidden rounded-[60px] md:h-[387px]'>
        <div className='flex h-full flex-col items-center justify-center text-center'>
          <p className='description-text mb-2 text-white'>{tabLabel}</p>
          <h1 className='title-text max-w-3xl text-white'>{heroTitle}</h1>
        </div>
      </div>

      {/* BREADCRUMBS */}
      <div className='mt-6'>
        <DynamicBreadcrumbs
          startLink={{ value: 'Поддержка', link: '/support' }}
          pathMap={pathMap}
        />
      </div>

      {content}
    </section>
  );
}
