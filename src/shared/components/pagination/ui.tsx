// components/pagination-custom.tsx
import { cn } from "@lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@shadcn/pagination";

type Props = {
    page: number;
    perPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    siblings?: number;
};

function buildRange(
    page: number,
    totalPages: number,
    siblings: number
): (number | "…")[] {
    const range: (number | "…")[] = [];
    const start = Math.max(2, page - siblings);
    const end = Math.min(totalPages - 1, page + siblings);

    range.push(1);
    if (start > 2) range.push("…");
    for (let p = start; p <= end; p++) range.push(p);
    if (end < totalPages - 1) range.push("…");
    if (totalPages > 1) range.push(totalPages);

    return Array.from(new Set(range));
}

export default function PaginationCustom({
    page,
    perPage,
    totalItems,
    onPageChange,
    siblings = 1,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const clampedPage = Math.min(Math.max(1, page), totalPages);
    const items = buildRange(clampedPage, totalPages, siblings);

    const isFirst = clampedPage === 1;
    const isLast = clampedPage === totalPages;

    // базовые стили для кружков страниц
    const basePage =
        "h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors";
    const activePage =
        "bg-white text-primary shadow scale-115";
    const inactivePage =
        "bg-white/10 text-white hover:bg-white/20";

    return (
        <Pagination>
            <PaginationContent className="gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={isFirst}
                        className={cn(
                            "text-white border border-white rounded-full px-3 py-2",
                            isFirst && "opacity-50 pointer-events-none"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isFirst) onPageChange(Math.max(1, clampedPage - 1));
                        }}
                    />
                </PaginationItem>

                {items.map((it, i) =>
                    it === "…" ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis className="text-white/70" />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={it}>
                            <PaginationLink
                                href="#"
                                // можно оставить isActive для aria-current, но стилизуем сами
                                isActive={it === clampedPage}
                                className={cn(
                                    basePage,
                                    it === clampedPage ? activePage : inactivePage
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(it as number);
                                }}
                            >
                                {it}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={isLast}
                        className={cn(
                            "text-white border border-white rounded-full px-3 py-2",
                            isLast && "opacity-50 pointer-events-none"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isLast) onPageChange(Math.min(totalPages, clampedPage + 1));
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
