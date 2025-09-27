import { Button } from '@shared/shadcn/button'
import miniBearCard from '@assets/bear-card-store.png'
import { ChevronRight } from 'lucide-react'

const EmptyCartContent = () => {
    return (
        <>
            <div className="flex max-md:flex-col md:px-36 px-2.5 py-15 max-md:py-5 gap-10 w-full items-center">
                <div className='flex max-md:w-full max-md:justify-center'>
                    <img src={miniBearCard} alt="mini-bear-store" className='w-[252px] h-[378px]' />
                </div>
                <div className='md:w-[calc(100%-252px)] w-full'>
                    <div className='bg-secondary-white w-full md:p-10 p-5 rounded-[20px] space-y-[22px]'>
                        <h1 className='title-text max-md:text-center'>Здесь пока ещё ничего нет</h1>
                        <p className='description-text max-w-[700px]'>В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности.</p>
                        <div className='md:w-[157px] w-full'>
                            <Button className="h-12 text-white text-base w-full">
                                В каталог <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmptyCartContent