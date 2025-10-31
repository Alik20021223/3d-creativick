import FAQCard from '@entities/support/ui/faq-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/tabs';
import { SupportCards, SupportTabs } from '@utils/mock';
import { Button } from '@shadcn/button';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@lib/utils';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <section id='faq' className='container-custom rounded-[80px] bg-white px-2.5 py-20 md:px-10'>
        <aside className='flex w-full items-start max-md:flex-col'>
          <div className='space-y-11 md:w-[59%]'>
            <h1 className='title-text max-md:text-center'>Часто задаваемые вопросы</h1>
            <p className='description-text'>
              Прежде чем обращаться в службу поддержки, загляните сюда! Возможно, ответ на ваш
              вопрос уже есть в списке часто задаваемых вопросов. Здесь мы собрали ответы на
              наиболее распространенные из них. Если вы не нашли нужную информацию, свяжитесь с
              нами, и мы с радостью вам поможем!
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
        <aside className=''>
          <Tabs defaultValue='troubleshoot' className='mt-10'>
            {/* scroll container только на мобилке */}
            <div className='relative -mx-4 px-4 md:mx-0 md:px-0'>
              <TabsList
                className={cn(
                  // mobile: горизонтальный скролл
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
                      // фиксированная высота + перенос запретить
                      'h-10.5 px-3 text-sm whitespace-nowrap md:h-14 md:px-5 md:text-[22px]',
                      // не даём сжиматься и прилипание к началу «щелчком»
                      'shrink-0 snap-start',
                      // твои актив/hover стили
                      'transition-[background-color,color,box-shadow] duration-300',
                      'data-[state=active]:bg-primary-active rounded-md data-[state=active]:text-white md:rounded-full',
                    )}
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {SupportTabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {SupportCards[t.id].map((title, i) => (
                    <FAQCard key={i} title={title} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </aside>
      </section>
    </>
  );
};

export default MainContent;
