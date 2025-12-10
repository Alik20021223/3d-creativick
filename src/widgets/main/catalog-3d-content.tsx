import { useMainStore } from '@entities/main/store';
import { useCatalogCategories } from '@entities/main/hooks/getCategories';
import CatalogGrid from '@entities/main/ui/catolog-items/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Category } from '@entities/main/types';
import { useGetAllProducts } from '@entities/main/hooks/getAllProducts';
import { useSearchParams } from 'react-router-dom';

const Catalog3dContent = () => {
  const { perPage, page, search, sort, setTotal } = useMainStore();

  const [searchParams, setSearchParams] = useSearchParams(); // ⬅️
  
  // Массив выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // загрузка категорий
  const { data: fetchedCategories } = useCatalogCategories();

  // Добавляем пункт "Все" в начало списка
  const categories = useMemo<Category[]>(() => {
    const base = fetchedCategories || [];
    return [
      { id: 0, keywords: 'Все', translation: { title: 'Все', locale: '', id: 0 } } as Category,
      ...base,
    ]; // id:0 — фейковый идентификатор
  }, [fetchedCategories]);

  // Синхронизация с URL параметрами
  useEffect(() => {
    if (!categories.length) return;

    const categoryIdsFromUrl = searchParams.getAll('category_id');

    setSelectedCategories((prevCategories) => {
      if (categoryIdsFromUrl.length > 0) {
        const foundCategories = categoryIdsFromUrl
          .map((idStr) => {
            const id = Number(idStr);
            const found = categories.find((c) => c.id === id);
            return found && found.id !== 0 ? found : null;
          })
          .filter((c): c is Category => c !== null);

        // Обновляем только если изменилось
        if (
          foundCategories.length !== prevCategories.length ||
          foundCategories.some((fc) => !prevCategories.find((sc) => sc.id === fc.id))
        ) {
          return foundCategories;
        }
        return prevCategories;
      } else {
        // Если в URL нет category_id — ставим "Все"
        const allCategory = categories[0]; // "Все" всегда первая
        if (prevCategories.length !== 1 || prevCategories[0]?.id !== allCategory.id) {
          return [allCategory];
        }
        return prevCategories;
      }
    });
  }, [categories, searchParams]);

  // параметры для API
  const params = useMemo(
    () => {
      // Фильтруем категории, исключая "Все" (id=0)
      const categoryIds = selectedCategories
        .filter((cat) => cat.id !== 0)
        .map((cat) => String(cat.id));

      // Если один элемент - используем category_id, если массив - category_ids[]
      const categoryParams: { category_id?: string; category_ids?: string[] } = {};
      
      if (categoryIds.length === 1) {
        categoryParams.category_id = categoryIds[0];
      } else if (categoryIds.length > 1) {
        categoryParams.category_ids = categoryIds;
      }

      return {
        perPage,
        page,
        search: search?.trim() || undefined,
        order_by: sort,
        ...categoryParams,
      };
    },
    [perPage, page, search, sort, selectedCategories],
  );
  // запрос продуктов
  const { data: products, isLoading } = useGetAllProducts(params);

  useEffect(() => {
    setTotal(products ? products.meta.total : 0);
  }, [products, setTotal]);

  const topRef = useRef<HTMLDivElement | null>(null);

  const handleChangeCategory = (category: Category) => {
    const next = new URLSearchParams(searchParams);

    if (category.id === 0) {
      // Если выбрали "Все" — сбрасываем все категории и ставим только "Все"
      next.delete('category_id');
      setSelectedCategories([category]);
    } else {
      // Переключаем категорию (добавляем/удаляем)
      const isSelected = selectedCategories.some((cat) => cat.id === category.id);
      
      let newSelectedCategories: Category[];
      if (isSelected) {
        // Удаляем категорию
        newSelectedCategories = selectedCategories.filter((cat) => cat.id !== category.id);
        // Если после удаления не осталось категорий, ставим "Все"
        if (newSelectedCategories.length === 0) {
          const allCategory = categories[0];
          newSelectedCategories = [allCategory];
          next.delete('category_id');
        } else {
          // Удаляем конкретный category_id из URL
          const categoryIds = next.getAll('category_id');
          next.delete('category_id');
          categoryIds
            .filter((id) => Number(id) !== category.id)
            .forEach((id) => next.append('category_id', id));
        }
      } else {
        // Добавляем категорию
        // Убираем "Все" если она была выбрана
        newSelectedCategories = selectedCategories.filter((cat) => cat.id !== 0);
        newSelectedCategories.push(category);
        
        // Обновляем URL
        next.delete('category_id');
        newSelectedCategories.forEach((cat) => next.append('category_id', String(cat.id)));
      }
      
      setSelectedCategories(newSelectedCategories);
    }

    // Предотвращаем автоматический скролл наверх при изменении URL
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <section id='shop' ref={topRef} className='relative'>
      <div className='bg-catalog absolute inset-0 rounded-t-[80px]' />
      <div className='container-custom relative z-10 w-full px-2.5 py-20 md:px-10 2xl:px-0'>
        {/* Заголовки */}
        <div className='flex flex-col items-center space-y-4 text-center'>
          <h1 className='title-text hidden text-[48px] font-extrabold text-white md:block'>
            Каталог 3D-моделей
          </h1>
          <h1 className='text-[32px] leading-tight font-extrabold text-white md:hidden'>
            Каталог <br />
            <span>3D-моделей</span>
          </h1>
          <p className='description-text max-w-[902px] leading-relaxed text-white'>
            Воплоти свои идеи в реальность! Играй. Учись. Создавай.
          </p>
        </div>

        {/* Категории */}
        <div className='mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4'>
          {categories.map((category) => {
            const isActive = selectedCategories.some((cat) => cat.id === category.id);

            return (
              <div key={category.id} className='flex justify-center'>
                <button
                  onClick={() => handleChangeCategory(category)}
                  className={[
                    'cursor-pointer rounded-[12px] px-5.5 py-[9.5px] text-sm leading-[130%] transition-colors duration-200 select-none md:py-[8.5px] md:text-lg',
                    isActive ? 'bg-primary-active text-white' : 'text-secondary-text bg-white',
                  ].join(' ')}
                >
                  {category?.translation?.title}
                </button>
              </div>
            );
          })}
        </div>

        <CatalogGrid products={products?.data || []} topRef={topRef} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Catalog3dContent;
