// import { VITE_CONTACTS_URL, VITE_PRIVACY_URL, VITE_TERMS_URL } from '@utils/constant';
// import logoImg from '@assets/logo.svg';

const Footer = () => {
  return (
    <>
      <footer className='flex  z-10 px-10 relative justify-between gap-4 pt-20 pb-[34px] select-none max-lg:flex-col max-lg:gap-10'>
        <div className='flex w-[320px] flex-col gap-5 max-lg:w-auto max-lg:max-w-[330px]'>
          <a
            href='/'
            className='flex items-center gap-2.5 text-xl leading-6 font-bold duration-[0.3s]'
          >
            {/* <img src={logoImg} alt='logo' width={115} height={48} /> */}
          </a>
          <div className='text-sm leading-4 font-normal text-(--text-secondary-color)'>
            Покупайте робуксы по низким ценам и наслаждайтесь
            моментами&nbsp;в&nbsp;любимой&nbsp;игре
          </div>
        </div>
        <div className='rbxsell-footer__section'>
          <h3>Помощь</h3>
          <ul className='space-y-[13px]'>
            <li>
              <a href='/faq'>Вопросы и ответы</a>
            </li>
            {/* <li>
              <a href={VITE_TERMS_URL} target='_blank'>
                Пользовательское соглашение
              </a>
            </li>
            <li>
              <a href={VITE_PRIVACY_URL} target='_blank'>
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <a href={VITE_CONTACTS_URL} target='_blank'>
                Контакты
              </a>
            </li> */}
          </ul>
        </div>
        <div className='rbxsell-footer__section w-[284px]'>
          <h3>Сотрудничество</h3>
          <a href='/' target='_blank' className='rbxsell-footer-links-block-subtitle'>
            Запиши видео о сайте и получи 100 робуксов, а также мы сотрудничаем с каналами от 1000
            просмотров, пишите.
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
