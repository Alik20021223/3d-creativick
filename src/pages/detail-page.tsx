import DetailsSeriesContent from '@widgets/product-content/details-seria-content';
import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import { useProductById } from '@entities/main/hooks/getProductById';
import { useParams, useLocation } from 'react-router-dom';
import BlockItem from '@widgets/product-content/block-item-content';
import { ProductCardType } from '@shared/types';
import { useProductBreadcrumbs } from '@shared/hooks/useProductBreadcrumbs';
import { useMemo } from 'react';
import type { BreadCrumpType } from '@shared/types';
import SeriesFloatingBar from '@widgets/product-content/series-floating-bar';

const DetailPage = () => {
  const { titleId, detailId } = useParams<{ titleId: string; detailId: string }>();
  const location = useLocation();

  const { data: productData } = useProductById(titleId);

  const modelId = detailId ? Number(detailId) : null;

  const currentModel = productData?.models?.find((model) => model.id === modelId);

  // Используем productData (не infoData) для breadcrumbs, чтобы получить название продукта
  const { pathMap: basePathMap } = useProductBreadcrumbs({ productData });

  // Создаем кастомный pathMap с добавлением модели
  const PATH_MAP = useMemo(() => {
    if (!productData || !currentModel) return basePathMap;

    const baseCrumbs = basePathMap['*'] || [];
    const productTitle = productData.translation?.title ?? '';
    const modelTitle = currentModel.translation?.title ?? '';

    // Путь к продукту (без модели)
    const productPath = `/product/${titleId}`;
    // Текущий путь (с моделью)
    const currentPath = location.pathname;

    const crumbs: BreadCrumpType[] = [];
    let hasProductCrumb = false;

    // Копируем все breadcrumbs из basePathMap (категория + продукт)
    // Но заменяем путь продукта на правильный (без detailId)
    baseCrumbs.forEach((crumb) => {
      if (crumb.BREADCRUMB === productTitle) {
        // Это breadcrumb продукта - обновляем путь
        hasProductCrumb = true;
        crumbs.push({
          PATH: productPath,
          LINK: productPath,
          BREADCRUMB: productTitle,
        });
      } else {
        // Это категория или другой breadcrumb - оставляем как есть
        crumbs.push(crumb);
      }
    });

    // Если продукт не был найден в baseCrumbs, добавляем его
    if (!hasProductCrumb) {
      crumbs.push({
        PATH: productPath,
        LINK: productPath,
        BREADCRUMB: productTitle,
      });
    }

    // Добавляем breadcrumb для модели
    crumbs.push({
      PATH: currentPath,
      BREADCRUMB: modelTitle,
    });

    return {
      '*': crumbs,
    };
  }, [basePathMap, productData, currentModel, titleId, location.pathname]);

  if (!productData || !currentModel) return null;

  const infoData: ProductCardType = {
    ...productData,
    print_time_min: currentModel.print_time_min,
    material_grams: currentModel.material_grams,
    file_size_mb: currentModel.file_size_mb,
    translation: {
      ...productData.translation,
      title: currentModel.translation.title,
      description: currentModel.translation.description,
    },
  };

  // 🔹 Все модели, кроме текущей
  const otherModels = (productData.models ?? []).filter((model) => model.id !== currentModel.id);

  return (
    <section className='pt-10 max-md:pt-25'>
      <div className='container-custom space-y-4 px-2.5 md:px-10 2xl:px-0'>
        <div className='flex items-center gap-4'>
          <BackBtnNavigate />
          <DynamicBreadcrumbs startLink={{ value: 'Каталог', link: '/#shop' }} pathMap={PATH_MAP} />
        </div>

        <BlockItem
          visible={4}
          images={currentModel.galleries || []}
          infoData={infoData}
          isSeries={true}
        />
      </div>

      <div
        id='series-floating-bar-container'
        className='bg-catalog mt-15 h-full rounded-t-[80px] pt-20 pb-25 max-md:py-15'
      >
        {otherModels.length > 0 && <DetailsSeriesContent items={otherModels} />}

        {/* Маркер для определения, когда блок должен стать статичным */}
        <div id='series-floating-bar-sentinel' className='h-0' />
        {/* Плавающий блок с ценой и кнопками для всей серии */}
        <SeriesFloatingBar productData={productData} sentinelId='series-floating-bar-sentinel' />
      </div>
    </section>
  );
};

export default DetailPage;
