import BlockItem from '@widgets/product-content/block-item-content';
import DetailsSeriesContent from '@/widgets/product-content/details-seria-content';
import { PRODUCT_PATH_MAP } from '@entities/products/constant/path-map';
import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
import BackBtnNavigate from '@feature/back-btn-navigate';
import { ImagesItems, infoDetail } from '@entities/products/mock';
import { useSharedStore } from '@shared/store';
import { useCallback, useMemo } from 'react';
import { SeriesCardData } from '@entities/products/types';
import SeriesSummaryCard from '@shared/components/info-card-seriea';

const PATH_MAP = { '*': PRODUCT_PATH_MAP };

const DetailPage = () => {
    const { isSave, setSave } = useSharedStore();

    /** 1) Данные вынуты в объект: здесь можно подставлять реальные значения */
    const seriesCard = useMemo<SeriesCardData>(() => ({
        title: 'Стоимость всей серии',
        description:
            'С другой стороны, реализация намеченных плановых заданий играет важную роль в формировании глубокомысленных рассуждений.',
        prices: {
            current: 149_900, // ← подставьте актуальную сумму серии (числом)
            old: 199_900,     // ← опционально: старая цена (числом) или null
            currencySymbol: '₽',
            locale: 'ru-RU',
        },
        labels: {
            addToCart: 'В корзину',
            savedAriaOn: 'Удалить из сохранённых',
            savedAriaOff: 'Сохранить товар',
        },
    }), []);

    /** 2) Функции-обработчики */
    const handleAddSeries = useCallback(() => {
        // например: cart.addSeries(seriesId) / emit analytics / toast
        console.log('[Series] add to cart');
    }, []);

    const handleToggleSave = useCallback(() => {
        setSave(!isSave);
    }, [isSave, setSave]);

    return (
        <>
            <section className="bg-white pt-10">
                <div className="container-custom space-y-4 px-2.5 md:px-10 2xl:px-0">
                    <div className="flex items-center gap-4">
                        <BackBtnNavigate />
                        <DynamicBreadcrumbs pathMap={PATH_MAP} />
                    </div>

                    <BlockItem visible={4} images={ImagesItems} infoData={infoDetail} />
                </div>

                <div className="bg-catalog mt-15 h-full rounded-t-[80px]">
                    <DetailsSeriesContent title='Другие детали серии' />

                    {/* 3) Используем новый компонент и вынесенные данные/функции */}
                    <div className='py-10 px-10 max-md:px-2.5'>
                        <SeriesSummaryCard
                            data={seriesCard}
                            onAdd={handleAddSeries}
                            onToggleSave={handleToggleSave}
                            isSaved={isSave}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailPage;
