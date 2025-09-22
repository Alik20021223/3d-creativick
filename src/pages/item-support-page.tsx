
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump";
import { SameArticle } from "@widgets/support-content/item/same-article";
import { PRODUCT_PATH_MAP } from "@entities/products/constant/path-map";
import { ArrowRight } from "lucide-react";
import ArticleContent from "@widgets/support-content/item/article-content";
import { ItemSupportMock } from "@entities/support/mock";

const PATH_MAP = { "*": PRODUCT_PATH_MAP };

export default function ItemSupportPage() {


    return (
        <section className="bg-white md:rounded-t-[80px] rounded-t-[60px] md:pt-10 md:px-10 md:pb-30 md:mt-25 mt-15 pb-15 px-2.5 pt-2.5">
            {/* HERO */}
            <div className="rounded-[60px] overflow-hidden md:h-[387px] h-[184px] w-full bg-catalog">
                <div className="flex flex-col items-center justify-center text-center h-full">
                    <p className="description-text text-white mb-2">
                        Поиск и устранение неполадок
                    </p>
                    <h1 className="title-text text-white max-w-3xl">
                        Извлечение и замена шестерней подачи пластика
                    </h1>
                </div>
            </div>

            {/* BREADCRUMBS */}
            <div className="mt-6">
                <DynamicBreadcrumbs pathMap={PATH_MAP} />
            </div>

            {/* CONTENT + TOC */}
            <ArticleContent sections={ItemSupportMock} />

            {/* SIMILAR */}
            <div className="mt-12">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="title-text">Похожие статьи</h2>
                    <ArrowRight className="size-5 text-[#9aa7b2]" />
                </div>
                <SameArticle />
            </div>
        </section>
    );
}
