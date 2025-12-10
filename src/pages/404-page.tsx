import { useIsMobile } from '@app/hook/useMobile';
import { Link } from 'react-router-dom';
import ErrorImg from '@assets/Error-img.png';
import MobileErrorImg from '@assets/Mobile-Error-img.png';
import { Button } from '@shared/shadcn/button';

const ErrorPage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <section className='px-6 py-10 max-md:px-0 max-md:py-[60px]'>
        <div className='mx-auto max-w-[1540px] rounded-[80px] bg-white p-2.5 pb-20 md:p-10'>
          <div className='grid w-full items-center gap-10 max-md:gap-20 md:grid-cols-2'>
            {/* Левая картинка */}
            <div className='flex h-full w-full justify-center'>
              <div className='pointer-events-none relative w-full select-none max-md:-top-2.5 max-md:max-h-[276px] max-md:max-w-[355px]'>
                <img
                  src={isMobile ? MobileErrorImg : ErrorImg}
                  alt='Технические работы'
                  className='w-full object-contain'
                  draggable={false}
                />
              </div>
            </div>

            {/* Правая колонка */}
            <div>
              <h1 className='text-dark-blue text-[32px] leading-[110%] font-bold md:text-[44px] xl:text-[54px]'>
                Что-то пошло не так
              </h1>

              <p className='text-secondary-text mt-[22px] text-base leading-[130%] font-normal md:text-[16px]'>
                К сожалению, произошла непредвиденная ошибка. Мы уже работаем над её устранением.
                Попробуйте обновить страницу через несколько минут или вернуться позже. Возможно, вы
                перешли по неверной ссылке или URL-адрес был изменён. Если проблема повторяется,
                пожалуйста, сообщите нам об этом — так мы сможем быстрее её исправить. Приносим
                извинения за возможные неудобства 💙
              </p>

              <div className='relative z-10 mt-8 flex gap-5 max-md:flex-col max-md:items-center max-md:justify-center'>
                <Button className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'>
                  <Link to='https://3dkreativik.ru/'>На главную</Link>
                </Button>

                <Button className='bg-primary-active inline-flex h-[56px] w-[195px] items-center justify-center rounded-full text-[22px] font-normal text-white max-md:w-full max-md:text-lg'>
                  <Link to='/'>В магазин</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
