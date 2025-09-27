import bearPng from '@assets/bear-card-store.png';
import {
    ChevronRight,
} from 'lucide-react';
import { Button } from '@shadcn/button';

const EmptyCardDrawer = () => {
    return (
        <>
            <div className="py-5 px-10">
                <div className="bg-transparent">
                    <p className="text-4xl font-bold leading-[110%] text-center text-dark-blue">
                        Здесь ещё ничего нет
                    </p>

                    <div className="my-4 flex justify-center">
                        <img src={bearPng} alt="Пустая корзина"
                            className="h-[378px] w-auto select-none" draggable={false} />
                    </div>

                    <p className="text-gray-600 leading-[1.4] line-clamp-2">
                        В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности.
                    </p>

                    <Button asChild className="mt-6 h-12 w-full rounded-full text-white">
                        <a href="/catalog" className='flex items-center'>В каталог <ChevronRight /></a>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default EmptyCardDrawer