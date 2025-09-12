// pages/catalog/CatalogGrid.tsx
import { useMemo, useState, useEffect } from "react";
import { PerPageSelect, productCardsMock, SortMock } from "@utils/mock";
import ProductCard from "@shared/components/product-card";
import PaginationCustom from "@shared/components/pagination";
import CustomSelect from "@feature/custom-select";
import { Input } from "@shadcn/input";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import CustomDropdown from "@feature/custom-dropdown";

type CatalogGridProps = {
    topRef?: React.RefObject<HTMLDivElement | null>; // или React.MutableRefObject<HTMLDivElement | null>
};

export default function CatalogGrid({ topRef }: CatalogGridProps) {
    const [perPage, setPerPage] = useState<number>(9);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("price_asc");

    const scrollToTop = () => topRef?.current?.scrollIntoView({ behavior: "smooth" });

    const total = productCardsMock.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));



    // если пользователь уменьшил perPage и текущая страница стала “пустой”
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [perPage, totalPages, page]);

    const slice = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return productCardsMock.slice(start, end);
    }, [page, perPage]);


    return (
        <section className="w-full">
            {/* панель управления */}
            <div className="mb-6 flex mt-15 flex-wrap items-center justify-between gap-4">
                <div className="md:w-[484px]">
                    <Input placeholder="Поиск" className="!h-10" rightIcon={<Search className="w-3 h-3" />} />
                </div>
                <div className="md:w-[336px] flex gap-2">
                    <CustomDropdown
                        trigger={<ArrowDownWideNarrow />}
                        items={SortMock}
                        selectedValue={sort}
                        onSelect={setSort}
                        align="end"
                        side="bottom"
                        sideOffset={4}
                    />
                    <CustomSelect
                        options={PerPageSelect}
                        value={String(perPage)}
                        onValueChange={(v) => {
                            setPerPage(Number(v));
                            setPage(1);
                        }}
                        placeholder="Показывать по"
                    />
                </div>
            </div>

            {/* грид карточек */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {slice.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>

            {/* пагинация */}
            <div className="mt-10 flex justify-center">
                <PaginationCustom
                    page={page}
                    perPage={perPage}
                    totalItems={total}
                    onPageChange={(p) => {
                        setPage(p);
                        scrollToTop();
                    }}
                    siblings={1}
                />
            </div>
        </section>
    );
}
