// src/feature/footer/ui.tsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='relative z-5 select-none'>
      {' '}
      {/* верхняя белая зона */}
      <div className='bg-white'>
        <div className='mx-auto max-w-[1540px] px-6 py-12 md:px-10'>
          <div className='grid grid-cols-12 gap-8'>
            {/* Левый блок: логотип, контакты, соцкнопки */}
            <div className='col-span-12 md:col-span-3'>
              <div className='mb-4 text-2xl font-extrabold tracking-wide'>3D КРЕДИВИК</div>

              <div className='space-y-1 text-sm text-(--text-secondary-color)'>
                <a href='mailto:info@3dkreativik.ru' className='transition hover:text-black'>
                  info@3dkreativik.ru
                </a>
                <div>8 (495) 988-82-82</div>
              </div>

              <div className='mt-4 flex items-center gap-3'>
                {/* заглушки под иконки */}
                <a
                  aria-label='Telegram'
                  href='/'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-300'
                >
                  TG
                </a>
                <a
                  aria-label='VK'
                  href='/'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-300'
                >
                  VK
                </a>
                <a
                  aria-label='WhatsApp'
                  href='/'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-300'
                >
                  WA
                </a>
              </div>
            </div>

            {/* Колонка 1 */}
            <div className='col-span-6 md:col-span-2'>
              <h3 className='mb-4 text-lg font-semibold'>Главная</h3>
              <ul className='space-y-3 text-sm'>
                <li>
                  <Link to='/about' className='hover:underline'>
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to='/exclusive' className='hover:underline'>
                    Эксклюзивные 3D серии
                  </Link>
                </li>
                <li>
                  <Link to='/reviews' className='hover:underline'>
                    Отзывы
                  </Link>
                </li>
                <li>
                  <Link to='/where-to-buy' className='hover:underline'>
                    Где купить
                  </Link>
                </li>
              </ul>
            </div>

            {/* Колонка 2 */}
            <div className='col-span-6 md:col-span-2'>
              <h3 className='mb-4 text-lg font-semibold'>Магазин</h3>
              <ul className='space-y-3 text-sm'>
                <li>
                  <Link to='/catalog' className='hover:underline'>
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link to='/where-to-buy' className='hover:underline'>
                    Где купить
                  </Link>
                </li>
                <li>
                  <Link to='/cart' className='hover:underline'>
                    Корзина
                  </Link>
                </li>
                <li>
                  <Link to='/account' className='hover:underline'>
                    Личный кабинет
                  </Link>
                </li>
              </ul>
            </div>

            {/* Колонка 3 */}
            <div className='col-span-12 md:col-span-2'>
              <h3 className='mb-4 text-lg font-semibold'>Поддержка</h3>
              <ul className='space-y-3 text-sm'>
                <li>
                  <Link to='/software' className='hover:underline'>
                    Программное обеспечение
                  </Link>
                </li>
                <li>
                  <Link to='/manuals' className='hover:underline'>
                    Инструкции
                  </Link>
                </li>
                <li>
                  <Link to='/faq' className='hover:underline'>
                    Часто задаваемые вопросы
                  </Link>
                </li>
                <li>
                  <Link to='/contacts' className='hover:underline'>
                    Остались вопросы?
                  </Link>
                </li>
              </ul>
            </div>

            {/* Правая карточка «РОСАТОМ» */}
            <div className='col-span-12 md:col-span-3'>
              <div className='rounded-2xl border border-zinc-200 p-5 shadow-sm'>
                <div className='mb-3 flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold'>
                    {/* сюда можно поставить <img src={rosatomLogo} /> */}R
                  </div>
                  <div className='text-sm'>
                    <div className='font-semibold'>РОСАТОМ</div>
                    <div className='text-zinc-500'>ООО «Росатом Аддитивные технологии»</div>
                  </div>
                </div>

                <div className='space-y-2 text-xs leading-5 text-zinc-600'>
                  <div>ОГРН 5177746230547</div>
                  <div>
                    Юр. адрес / Для корреспонденции:
                    <br />
                    115409, г. Москва, вн. тер. г. муниципальный округ Москворечье-Сабурово,
                    Каширское шоссе, д.49, этаж 10, помеш. XXIX, комн. 5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* нижняя тёмная плашка */}
      <div className='bg-[#1E1E1E] text-white'>
        <div className='mx-auto flex max-w-[1540px] flex-col gap-3 px-6 py-4 text-xs md:flex-row md:items-center md:justify-between md:px-10'>
          <div className='opacity-80'>Все права защищены ©2025.</div>
          <nav className='flex flex-wrap items-center gap-6 opacity-90'>
            <a href='/privacy' className='hover:underline'>
              Политика конфиденциальности
            </a>
            <a href='/personal-data' className='hover:underline'>
              Политика обработки персональных данных
            </a>
            <a
              href='https://webmaxup.ru'
              target='_blank'
              rel='noreferrer'
              className='hover:underline'
            >
              Разработка сайта WebMaxUP
            </a>
            <a
              href='https://sobolevlab.ru'
              target='_blank'
              rel='noreferrer'
              className='hover:underline'
            >
              Разработка дизайна SobolevLab
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
