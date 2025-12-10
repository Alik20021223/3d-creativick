// pages/catalog/CatalogGrid.tsx
import { useEffect, useState } from 'react';
import { PerPageSelect, SortMock } from '@utils/mock';
import ProductCard from '@shared/components/product-card';
import PaginationCustom from '@shared/components/pagination';
import CustomSelect from '@feature/custom-select';
import { Input } from '@shadcn/input';
import { ArrowDownWideNarrow, Search } from 'lucide-react';
import CustomDropdown from '@feature/custom-dropdown';
import { useMainStore } from '../../store';
import { ProductCardType } from '@shared/types';
import { ProductListSkeleton } from '@shared/components/skeleton';

type CatalogGridProps = {
  topRef?: React.RefObject<HTMLDivElement | null>;
  products?: ProductCardType[];
  isLoading?: boolean;
};

export default function CatalogGrid({ topRef, products, isLoading }: CatalogGridProps) {
  const {
    perPage,
    setPerPage,
    page,
    setPage,
    sort,
    setSort,
    search: searchStore,
    setSearch: setSearchStore,
    total,
  } = useMainStore();

  // Локальное значение поля ввода (для мгновенного UI-апдейта)
  const [searchValue, setSearchValue] = useState<string>(searchStore ?? '');

  // Дебаунс: после паузы обновляем значение в сторе
  useEffect(() => {
    const trimmed = searchValue.trim();
    if (trimmed === searchStore) return; // Не обновляем если значение не изменилось
    
    const t = setTimeout(() => setSearchStore(trimmed), 400);
    return () => clearTimeout(t);
  }, [searchValue, searchStore, setSearchStore]);

  const scrollToTop = () => topRef?.current?.scrollIntoView({ behavior: 'smooth' });

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // если пользователь уменьшил perPage и текущая страница стала "пустой"
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [perPage, totalPages, page, setPage]);

  return (
    <section className='w-full'>
      {/* панель управления */}
      <div className='mt-15 mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div className='w-full md:w-[484px]'>
          <Input
            placeholder='Поиск'
            onChange={(e) => setSearchValue(e.target.value)}
            className='!h-10'
            rightIcon={<Search className='h-3 w-3' />}
          />
        </div>
        <div className='flex w-full gap-2 md:w-[336px]'>
          <CustomDropdown
            trigger={<ArrowDownWideNarrow />}
            items={SortMock}
            selectedValue={sort}
            onSelect={setSort}
            align='end'
            side='bottom'
            sideOffset={4}
          />
          <CustomSelect
            options={PerPageSelect}
            value={String(perPage)}
            onValueChange={(v) => {
              setPerPage(Number(v));
              setPage(1);
            }}
            placeholder='Показывать по'
          />
        </div>
      </div>

      {/* грид карточек */}
      {isLoading ? (
        <ProductListSkeleton count={perPage} />
      ) : (
        <div className='grid grid-cols-1 gap-4 max-md:justify-items-center md:grid-cols-2 xl:grid-cols-3'>
          {products?.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      )}

      {/* пагинация */}
      <div className='mt-10 flex justify-center'>
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
