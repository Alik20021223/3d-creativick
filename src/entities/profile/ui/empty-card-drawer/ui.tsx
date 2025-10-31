import bearPng from '@assets/bear-card-store.png';
import { ChevronRight } from 'lucide-react';
import { Button } from '@shadcn/button';

const EmptyCardDrawer = () => {
  return (
    <>
      <div className='h-full px-10 py-5'>
        <div className='flex h-full flex-col bg-transparent'>
          <p className='text-dark-blue text-center text-4xl leading-[110%] font-bold'>
            Здесь ещё ничего нет
          </p>

          <div className='flex flex-grow flex-col justify-center'>
            <div className='my-4 flex justify-center'>
              <img
                src={bearPng}
                alt='Пустая корзина'
                className='h-[378px] w-auto select-none'
                draggable={false}
              />
            </div>

            <p className='line-clamp-2 leading-[1.4] text-gray-600'>
              Самое время добавить в корзину все необходимое для реализации ваших идей и начать
              творить!
            </p>
          </div>

          <Button asChild className='mt-6 h-12 w-full rounded-full text-white'>
            <a href='/catalog' className='flex items-center'>
              В каталог <ChevronRight />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmptyCardDrawer;
