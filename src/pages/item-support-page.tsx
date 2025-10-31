import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import { SameArticle } from '@widgets/support-content/item/same-article';
import { PRODUCT_PATH_MAP } from '@entities/products/constant/path-map';
import { ArrowRight } from 'lucide-react';
import ArticleContent from '@widgets/support-content/item/article-content';
import { ItemSupportMock } from '@entities/support/mock';

const PATH_MAP = { '*': PRODUCT_PATH_MAP };

export default function ItemSupportPage() {
  return (
    <section className='mt-15 rounded-t-[60px] bg-white px-2.5 pt-2.5 pb-15 md:mt-25 md:rounded-t-[80px] md:px-10 md:pt-10 md:pb-30'>
      {/* HERO */}
      <div className='bg-catalog h-[184px] w-full overflow-hidden rounded-[60px] md:h-[387px]'>
        <div className='flex h-full flex-col items-center justify-center text-center'>
          <p className='description-text mb-2 text-white'>Поиск и устранение неполадок</p>
          <h1 className='title-text max-w-3xl text-white'>
            Извлечение и замена шестерней подачи пластика
          </h1>
        </div>
      </div>

      {/* BREADCRUMBS */}
      <div className='mt-6'>
        <DynamicBreadcrumbs pathMap={PATH_MAP} />
      </div>

      {/* CONTENT + TOC */}
      <ArticleContent sections={ItemSupportMock} />

      {/* SIMILAR */}
      <div className='mt-12'>
        <div className='mb-4 flex items-center gap-2'>
          <h2 className='title-text'>Похожие статьи</h2>
          <ArrowRight className='size-5 text-[#9aa7b2]' />
        </div>
        <SameArticle />
      </div>
    </section>
  );
}
