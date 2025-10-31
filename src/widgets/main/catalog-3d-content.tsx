import { useMainStore } from '@entities/main/store';
import { useCatalogCategories } from '@entities/main/hooks/getCategories';
import CatalogGrid from '@entities/main/ui/catolog-items/ui';
import { useEffect, useMemo, useRef } from 'react';
import { Category } from '@entities/main/types';
import { useGetAllProducts } from '@entities/main/hooks/getAllProducts';

const Catalog3dContent = () => {
  const { activeCategory, setActiveCategory, perPage, page, search, sort, setTotal } =
    useMainStore();

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

  // активная категория по умолчанию — "Все"
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory, setActiveCategory]);

  // параметры для API
  const params = useMemo(
    () => ({
      perPage,
      page,
      search: search?.trim() || undefined,
      order_by: sort,
      // если выбрана "Все" (id=0) — category_id не отправляем
      category_id:
        activeCategory && activeCategory.id !== 0 ? String(activeCategory.id) : undefined,
    }),
    [perPage, page, search, sort, activeCategory],
  );
  // запрос продуктов
  const { data: products } = useGetAllProducts(params);

  useEffect(() => {
    setTotal(products ? products.meta.total : 0);
  }, [products, setTotal]);

  const topRef = useRef<HTMLDivElement | null>(null);

  const handleChangeCategory = (category: Category) => {
    setActiveCategory(category);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
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
            В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет
            широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности
          </p>
        </div>

        {/* Категории */}
        <div className='mx-auto mt-6 grid max-w-[902px] grid-cols-2 items-center justify-center gap-3 md:mt-8 md:flex md:flex-wrap md:gap-4'>
          {categories.map((category) => {
            const isActive = category.id === activeCategory?.id;

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

        <CatalogGrid products={products?.data || []} topRef={topRef} />
      </div>
    </section>
  );
};

export default Catalog3dContent;
