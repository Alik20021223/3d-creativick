import { Button } from "@shared/shadcn/button"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs"
import { cn } from "@shared/lib/utils"
import { ProfileTabs, TabId } from "@utils/mock"
import OrderContent from "./order-content"
import FavoriteContent from "./favorite-content"
import PersonalInfoContent from "./personal-info.content"
import EmptyOrderContent from "./empty-order-content"
import EmptyFavoriteContent from "./empty-favorite-content"

function renderTabContent(id: TabId) {
    switch (id) {
        case "orders":
            return false ? <EmptyOrderContent /> : <OrderContent />;
        case "favorites":
            return false ? <EmptyFavoriteContent /> : <FavoriteContent />;
        case "personal-info":
            return <PersonalInfoContent />;
        default:
            return null;
    }
}


const ProfileContent = () => {
    return (
        <>
            <article className='flex flex-col 2xl:px-0 md:px-10 px-2.5 container-custom h-full'>
                <div className="flex max-md:flex-col justify-between w-full">
                    <div className="md:w-[70%] max-md:mb-10">
                        <h1 className="title-text max-md:text-center">Личный кабинет</h1>
                        <p className="description-text mt-[22px]">В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности.</p>
                    </div>
                    <Button variant="link" className="border-secondary-text text-[22px] leading-[130%] max-md:w-full px-11! text-secondary-text bg-white border h-14  button-shadow-blue hover:text-primary hover:border-primary">
                        Перейти в раздел поддержки
                        <ChevronRight />
                    </Button>
                </div>
                <div className="">
                    <Tabs defaultValue="orders" className="mt-10">
                        {/* scroll container только на мобилке */}
                        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                            <TabsList
                                className={cn(
                                    // mobile: горизонтальный скролл
                                    "md:mb-8 md:h-14",
                                    "flex md:gap-2 md:rounded-full bg-secondary-white",
                                    "overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth md:overflow-visible",
                                    "no-scrollbar md:w-full md:justify-between"
                                )}
                            >
                                {ProfileTabs.map((t) => (
                                    <TabsTrigger
                                        key={t.id}
                                        value={t.id}
                                        className={cn(
                                            // фиксированная высота + перенос запретить
                                            "md:h-14 h-10.5 md:px-5 px-3 whitespace-nowrap md:text-[22px] text-sm",
                                            // не даём сжиматься и прилипание к началу «щелчком»
                                            "shrink-0 snap-start",
                                            // твои актив/hover стили
                                            "transition-[background-color,color,box-shadow] duration-300",
                                            "data-[state=active]:bg-primary-active data-[state=active]:text-white md:rounded-full rounded-md"
                                        )}
                                    >
                                        {t.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {ProfileTabs.map((t) => (
                            <TabsContent key={t.id} value={t.id}>
                                {renderTabContent(t.id as TabId)}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </article>
        </>
    )
}

export default ProfileContent