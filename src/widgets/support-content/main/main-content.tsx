import FAQCard from '@entities/support/ui/faq-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/tabs';
import { SupportTabs } from '@utils/mock';
import { Button } from '@shadcn/button';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@lib/utils';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAllFaq } from '@entities/support/hooks/getAllFaq';
import { useMemo } from 'react';

const MainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const urlTab = searchParams.get('tab') ?? SupportTabs[0].id;

  const { data, isLoading, error } = useGetAllFaq();

  const faqsByCategory = useMemo(() => {
    if (!data) return {} as Record<number, typeof data>;
    return data.reduce(
      (acc, faq) => {
        const catId = faq.page_category_id;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(faq);
        return acc;
      },
      {} as Record<number, typeof data>,
    );
  }, [data]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(location.search);
    params.set('tab', value);

    navigate(
      {
        pathname: location.pathname,
        search: `?${params.toString()}`,
      },
      {
        replace: true,
        // 👇 ключевая опция
        preventScrollReset: true,
      },
    );
  };

  return (
    <section
      id='faq'
      className='container-custom scroll-mt-[100px] rounded-[80px] bg-white px-2.5 py-20 md:px-10'
    >
      {/* шапка */}
      <aside className='flex w-full items-start max-md:flex-col'>
        <div className='space-y-11 md:w-[59%]'>
          <h1 className='title-text max-md:text-center'>Часто задаваемые вопросы</h1>
          <p className='description-text'>
            Прежде чем обращаться в службу поддержки, загляните сюда! Возможно, ответ на ваш вопрос
            уже есть в списке часто задаваемых вопросов. Здесь мы собрали ответы на наиболее
            распространенные из них. Если вы не нашли нужную информацию, свяжитесь с нами, и мы с
            радостью вам поможем!
          </p>
        </div>
        <div className='mt-[50px] flex flex-1 justify-end max-md:w-full'>
          <Button
            onClick={() => navigate('/support#have-questions')}
            variant='link'
            className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary border bg-white max-md:w-full'
          >
            <Search />
            Остались вопросы
            <ChevronRight />
          </Button>
        </div>
      </aside>

      {/* Tabs */}
      <aside className=''>
        <Tabs
          value={urlTab} // ← читаем из URL
          onValueChange={handleTabChange}
          className='mt-10'
        >
          {/* Таб-хедер */}
          <div className='relative -mx-4 px-4 md:mx-0 md:px-0'>
            <TabsList
              className={cn(
                'md:mb-8 md:h-14',
                'bg-secondary-white flex md:gap-2 md:rounded-full',
                'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth md:overflow-visible',
                'no-scrollbar md:w-full md:justify-between',
              )}
            >
              {SupportTabs.map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className={cn(
                    'h-10.5 px-3 text-sm whitespace-nowrap md:h-14 md:px-5 md:text-[22px]',
                    'shrink-0 snap-start',
                    'transition-[background-color,color,box-shadow] duration-300',
                    'data-[state=active]:bg-primary-active rounded-md data-[state=active]:text-white md:rounded-full',
                  )}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Контент вкладок — фильтрация на фронте */}
          {SupportTabs.map((t) => {
            const categoryFaqs = faqsByCategory[t.pageCategoryId] ?? [];

            return (
              <TabsContent key={t.id} value={t.id}>
                {isLoading && (
                  <div className='text-secondary-text py-6 text-center'>Загрузка...</div>
                )}

                {error && <div className='py-6 text-center text-red-500'>Ошибка загрузки FAQ</div>}

                {!isLoading && !error && (
                  <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {categoryFaqs.length === 0 && (
                      <div className='text-secondary-text col-span-full py-6 text-center'>
                        В этой категории пока нет вопросов
                      </div>
                    )}

                    {categoryFaqs.map((faq) => (
                      <FAQCard key={faq.id} faq={faq} tabId={t.id} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </aside>
    </section>
  );
};

export default MainContent;
