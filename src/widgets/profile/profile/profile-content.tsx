import { Button } from '@shared/shadcn/button';
import { ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/tabs';
import { cn } from '@shared/lib/utils';
import { ProfileTabs, TabId } from '@utils/mock';
import OrderContent from './order-content';
import FavoriteContent from './favorite-content';
import PersonalInfoContent from './personal-info.content';
import EmptyOrderContent from './empty-order-content';
import EmptyFavoriteContent from './empty-favorite-content';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  /** начальный таб, если в URL нет ?tab= */
  defaultTab?: TabId; // "orders" | "favorites" | "personal-info"
  /** показать пустые состояния (пример переключателя демо) */
  showEmpty?: boolean;
};

const TAB_IDS = ProfileTabs.map((t) => t.id) as TabId[];
const isValidTab = (v: TabId): v is TabId => TAB_IDS.includes(v);

function renderTabContent(id: TabId, showEmpty?: boolean) {
  switch (id) {
    case 'orders':
      return showEmpty ? <EmptyOrderContent /> : <OrderContent />;
    case 'favorites':
      return showEmpty ? <EmptyFavoriteContent /> : <FavoriteContent />;
    case 'personal-info':
      return <PersonalInfoContent />;
    default:
      return null;
  }
}

export default function ProfileContent({ defaultTab = 'orders', showEmpty }: Props) {
  const [params, setParams] = useSearchParams();

  // derive initial from URL or prop
  const urlTab = params.get('tab');
  const initial = isValidTab(urlTab as TabId)
    ? urlTab
    : isValidTab(defaultTab)
      ? defaultTab
      : ProfileTabs[0].id;

  const [tab, setTab] = React.useState<TabId>(initial as TabId);

  // keep state in sync if ?tab= changes externally
  React.useEffect(() => {
    if (isValidTab(urlTab as TabId) && urlTab !== tab) setTab(urlTab as TabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTab]);

  const handleChange = (value: string) => {
    if (!isValidTab(value as TabId)) return;
    setTab(value as TabId);
    // keep other params, just update tab
    const next = new URLSearchParams(params);
    next.set('tab', value);
    setParams(next, { replace: true }); // no history push (use replace) — поменяй при желании
  };

  return (
    <article className='container-custom flex h-full flex-col px-2.5 md:px-10 2xl:px-0'>
      <div className='flex w-full justify-between max-md:flex-col'>
        <div className='max-md:mb-10 md:w-[70%]'>
          <h1 className='title-text max-md:text-center'>Личный кабинет</h1>
          <p className='description-text mt-[22px]'>
            Ваш персональный раздел на сайте, где вы можете управлять своей учетной записью,
            просматривать историю заказов, изменять личные данные, настраивать уведомления и
            получать доступ к эксклюзивным предложениям.
          </p>
        </div>
        <Button
          variant='link'
          className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 border bg-white px-11! text-[22px] leading-[130%] max-md:w-full'
        >
          Перейти в раздел поддержки
          <ChevronRight />
        </Button>
      </div>

      <Tabs value={tab} onValueChange={handleChange} className='mt-10'>
        <div className='relative -mx-4 px-4 md:mx-0 md:px-0'>
          <TabsList
            className={cn(
              'md:mb-8 md:h-14',
              'bg-secondary-white flex md:gap-2 md:rounded-full',
              'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth md:overflow-visible',
              'no-scrollbar md:w-full md:justify-between',
            )}
          >
            {ProfileTabs.map((t) => (
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

        {ProfileTabs.map((t) => (
          <TabsContent key={t.id} value={t.id}>
            {renderTabContent(t.id as TabId, showEmpty)}
          </TabsContent>
        ))}
      </Tabs>
    </article>
  );
}
