import { Button } from '@shadcn/button'
import React from 'react'
import ProductCarouselImage from '@shared/components/product-card/product-carousel'
import { ChevronRight } from 'lucide-react'
import { DetailCardType } from '@shared/types';

interface DetailCardProps {
    data: DetailCardType;
}

const DetailCard: React.FC<DetailCardProps> = ({ data }) => {
    return (
        <>
            <div className='bg-secondary-white relative overflow-hidden rounded-[60px] shadow-lg flex flex-col md:max-h-[618px] max-h-[520px] max-md:max-w-[355px] h-full'>
                {/* Верх: картинка и теги */}
                <ProductCarouselImage images={data.image} category={data.badges} />

                {/* Контент */}
                <div className="p-5.5 pt-0 mt-auto">
                    <h2 className='text-2xl font-bold'>{data.title ?? 'Принтер голубой'}</h2>

                    {data.description && (
                        <div className='mt-3'>
                            <p className='description-text'>{data.description}</p>
                        </div>
                    )}

                    {/* Кнопки */}
                    <div className='mt-5 flex items-center md:h-[56px] h-[46px]'>
                        <Button className='flex-1 rounded-full py-3! h-full text-lg font-semibold text-white'>
                            Подробнее <ChevronRight className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCard