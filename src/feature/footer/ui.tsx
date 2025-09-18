// src/feature/footer/ui.tsx
import { Link } from 'react-router-dom';
import logoSrc from '@assets/logo-3d.svg';
import TgIcon from '@assets/tg-icon.svg';
import VkIcon from '@assets/vk-icon.svg';
import LogoRosatom from '@assets/logo-footer-rosatom.svg';
import { footerColumns } from '@utils/mock';

const Footer = () => {
  return (
    <footer className='relative z-10 select-none'>
      {/* верхняя светлая зона */}
      <div className='bg-secondary-white'>
        <div className='container-custom mx-auto px-4 py-8 md:px-10 md:py-12 2xl:px-0'>
          {/* GRID: mobile-first */}
          <div className='grid grid-cols-12 gap-x-4 gap-y-8'>
            {/* Левый блок */}
            <div className='col-span-12 md:col-span-3'>
              <div className='flex items-center justify-center md:justify-start'>
                <Link to='/' aria-label='На главную'>
                  {/* меньше на мобилке */}
                  <img src={logoSrc} alt='logo' className='h-10 w-auto md:h-12' />
                </Link>
              </div>

              <div className='text-secondary-text mt-4 flex flex-col items-center md:items-start'>
                {/* размер для мобилки */}
                <a
                  href='mailto:info@3dkreativik.ru'
                  className='text-base hover:underline md:text-[22px]'
                >
                  info@3dkreativik.ru
                </a>
                <a href='tel:+84959888282' className='text-base md:text-[22px]'>
                  8 (495) 988-82-82
                </a>
              </div>

              <div className='mt-4 flex justify-center gap-3 md:justify-start'>
                <a
                  aria-label='VK'
                  href='/'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white md:h-12 md:w-12'
                >
                  <img src={VkIcon} alt='vk' className='h-5 w-5 md:h-6 md:w-6' />
                </a>
                <a
                  aria-label='Telegram'
                  href='/'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white md:h-12 md:w-12'
                >
                  <img src={TgIcon} alt='tg' className='h-5 w-5 md:h-6 md:w-6' />
                </a>
              </div>
            </div>

            {/* Колонки ссылок */}
            {footerColumns.map((col, idx) => (
              <div key={idx} className={col.colSpan}>
                <h3 className='text-dark-blue mb-3 text-lg font-semibold md:mb-7 md:text-[22px]'>
                  {col.title}
                </h3>
                <ul className='text-secondary-text space-y-2 text-sm md:space-y-3 md:text-lg'>
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} className='hover:underline'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Карточка «РОСАТОМ» */}
            <div className='col-span-12 md:col-span-3'>
              <div className='h-full rounded-[20px] bg-white px-4 py-3 shadow-sm md:px-6 md:py-4'>
                <div className='mb-4 flex items-center gap-3 md:mb-5'>
                  <div className='flex h-10 w-[120px] items-center justify-start md:h-12 md:w-[137px]'>
                    <img src={LogoRosatom} alt='Росатом' className='h-full w-auto' />
                  </div>
                </div>

                <div className='space-y-2 text-[13px] leading-5 text-zinc-600 md:space-y-3 md:text-sm'>
                  <div className='text-secondary-text'>ООО «Росатом Аддитивные технологии»</div>
                  <div className='text-[#B4B7C2]'>ОГРН 5177746230547</div>
                  <div className='text-[#B4B7C2]'>
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
      <div className='bg-secondary-text text-white'>
        <div className='container-custom mx-auto px-4 py-5 md:px-10 2xl:px-0'>
          {/* mobile: столбиком; desktop: в строку */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='text-xs opacity-90'>Все права защищены ©2025.</div>

            <nav className='flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-6'>
              <a href='/privacy' className='text-primary hover:underline'>
                Политика конфиденциальности
              </a>
              <a href='/personal-data' className='text-primary hover:underline'>
                Политика обработки персональных данных
              </a>
              <a href='/offer' className='text-primary hover:underline'>
                Публичная оферта
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
