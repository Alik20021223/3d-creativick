import FAQCard from "@entities/support/ui/faq-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs"
import { SupportCards, SupportTabs } from "@utils/mock"
import { Button } from "@shadcn/button"
import { ChevronRight, Search } from "lucide-react"
import { cn } from "@lib/utils"

const MainContent = () => {
    return (
        <>
            <section className="py-20 md:px-10 px-2.5 bg-white rounded-[80px]">
                <aside className="w-full flex max-md:flex-col items-start">
                    <div className="space-y-11 md:w-[59%]">
                        <h1 className="title-text max-md:text-center">Часто задаваемые вопросы</h1>
                        <p className="description-text">
                            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.
                        </p>
                    </div>
                    <div className="flex justify-end flex-1 max-md:w-full mt-[50px]">
                        <Button variant="link" className="border-secondary-text max-md:w-full text-secondary-text bg-white border">
                            <Search />
                            Остались вопросы
                            <ChevronRight />
                        </Button>
                    </div>
                </aside>
                <aside className="">
                    <Tabs defaultValue="troubleshoot" className="mt-10">
                        {/* scroll container только на мобилке */}
                        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                            <TabsList
                                className={cn(
                                    // mobile: горизонтальный скролл
                                    "md:mb-8 md:h-12",
                                    "flex gap-2 rounded-full bg-secondary-white p-1",
                                    "overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth md:overflow-visible",
                                    "no-scrollbar md:w-full md:justify-between"
                                )}
                            >
                                {SupportTabs.map((t) => (
                                    <TabsTrigger
                                        key={t.id}
                                        value={t.id}
                                        className={cn(
                                            // фиксированная высота + перенос запретить
                                            "h-10 px-5 whitespace-nowrap",
                                            // не даём сжиматься и прилипание к началу «щелчком»
                                            "shrink-0 snap-start",
                                            // твои актив/hover стили
                                            "transition-[background-color,color,box-shadow] duration-300",
                                            "data-[state=active]:bg-primary-active data-[state=active]:text-white rounded-full"
                                        )}
                                    >
                                        {t.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {SupportTabs.map((t) => (
                            <TabsContent key={t.id} value={t.id}>
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    )
}

export default MainContent