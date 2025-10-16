import wbLogo from '@assets/mobile-wb.png';
import yandexLogo from '@assets/mobile-yandex.png';
import megaLogo from '@assets/mobile-mega.png';
import ozonLogo from '@assets/mobile-ozon.png';
import wbLogoMobile from '@assets/mobile-wb.png';
import yandexLogoMobile from '@assets/mobile-yandex.png';
import megaLogoMobile from '@assets/mobile-mega.png';
import ozonLogoMobile from '@assets/mobile-ozon.png';
import HitOneImg from '@assets/hit-sell-one.svg';
import { BenefitCardMock, ProductCardMock } from '@shared/types';
import LampImg from '@assets/lump-icon.png';
import ShieldCheckImg from '@assets/sheild-pink.png';
import InfinityImg from '@assets/infinityImg.png';
import BulbImg from '@assets/bulbImg.png';
import ourActions from '@assets/our-actions.png';
import ourActionsMobile from '@assets/mobile-actions.png';

export const headerMock = {
  main: [
    { label: 'О нас', href: '#about' },
    { label: 'Креативик. Store', href: '#series' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
  shop: [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/shop' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
};

export const itemsFeedback = [
  {
    rating: 5,
    text: 'Восторг! Подарили «3D Креативик» сыну на день рождения — и это был лучший подарок! Ребёнок в восторге, печатает фигурки каждый день. Программа простая и понятная, а готовые модели — находка для старта. Всем рекомендуем!',
    authorName: 'Игорь Сорокин',
    authorRole: 'Отец',
  },
  {
    rating: 5,
    text: 'Дочка (7 лет) просто влюбилась в этот набор! Сначала переживала, что не справится, но инструкция оказалась очень понятной — и у неё всё получилось с первого раза. Теперь все игрушки для кукол печатаем сами! Развивает фантазию и мелкую моторику на ура.',
    authorName: 'Мария Воронова',
    authorRole: 'Мама',
  },
  {
    rating: 4,
    text: 'В наше время детей трудно чем-то удивить, но «3D Креативик» смог! Мы забыли про планшет — теперь у нас творческий бум. Очень радует, что в наборе есть всё необходимое, не нужно ничего докупать. А фигурки получаются яркими и интересными!',
    authorName: 'Дмитрий Полевой',
    authorRole: 'Отец',
  },
  {
    rating: 5,
    text: 'Искали что-то интересное и развивающее для сына (10 лет), и «3D Креативик» оказался идеальным вариантом. Принтер простой в использовании, качество печати отличное. Главное — ребёнок увлечён и с удовольствием создаёт собственные игрушки и сувениры.',
    authorName: 'Анна Соколова',
    authorRole: 'Мама',
  },
  {
    rating: 5,
    text: 'Внучка (6 лет) в восторге от «3D Креативик»! Каждый день радует нас новыми фигурками, которые делает сама. Прекрасный способ развить творческое мышление и научить ребёнка работать руками. Спасибо за такую замечательную идею!',
    authorName: 'Лидия Степанова',
    authorRole: 'Бабушка',
  },
  {
    rating: 4,
    text: 'Очень довольны покупкой! Собрали и запустили принтер буквально за полчаса. Всё работает отлично, а ребёнок теперь с нетерпением ждёт новых моделей. Отличное сочетание развлечения и обучения!',
    authorName: 'Павел Никитин',
    authorRole: 'Отец',
  },
];

export const marketplaces = [
  {
    name: 'Wildberries',
    logo: wbLogo,
    url: 'https://www.wildberries.ru',
  },
  {
    name: 'Яндекс Маркет',
    logo: yandexLogo,
    url: 'https://market.yandex.ru',
  },
  {
    name: 'Мега Маркет',
    logo: megaLogo,
    url: 'https://megamarket.ru',
  },
  {
    name: 'Ozon',
    logo: ozonLogo,
    url: 'https://ozon.ru',
  },
];

export const marketplacesMobile = [
  {
    name: 'Wildberries',
    logo: wbLogoMobile,
    url: 'https://www.wildberries.ru',
  },
  {
    name: 'Яндекс Маркет',
    logo: yandexLogoMobile,
    url: 'https://market.yandex.ru',
  },
  {
    name: 'Мега Маркет',
    logo: megaLogoMobile,
    url: 'https://megamarket.ru',
  },
  {
    name: 'Ozon',
    logo: ozonLogoMobile,
    url: 'https://ozon.ru',
  },
];

// src/utils/mock.ts
export const topTwoMock = {
  printer: {
    title: '3D-принтер',
    items: [
      'Безопасный',
      'Компактный',
      'Бесшумный',
      'Яркая цветовая индикация',
      'Простой в управлении',
      'Идеален для детей',
    ],
  },
  store: {
    title: 'Креативик.Store',
    items: ['Онлайн покупка', 'Эксклюзивные 3D-модели', 'Новые серии', 'Подписка'],
  },
  materials: {
    title: 'Материалы',
    items: ['Эксклюзивные филаменты для 3D-печати', 'Безопасный и биоразлагаемый материал'],
  },
  service: {
    title: 'Сервис',
    items: ['Поддержка', 'Ремонт', 'Гарантия', 'Запчасти'],
  },
  kit: {
    title: 'Комплектация',
    items: [
      '3D-принтер',
      'Филамент 250 г',
      'Набор инструментов',
      'USB-накопитель',
      'Держатель катушки филамента',
      'Комплект проводов',
      'Бумажное руководство пользователя',
    ],
  },
};

export const exclusiveProductsMock: ProductCardMock[] = [
  {
    id: 'pla-yellow',
    title: 'Катушка жёлтая',
    rating: 4.8,
    href: '/product/pla-yellow',
    image: HitOneImg,
  },
  {
    id: 'pla-red',
    title: 'Катушка красная',
    rating: 4.7,
    href: '/product/pla-red',
    image: HitOneImg,
  },
  {
    id: 'pla-blue',
    title: 'Катушка голубая',
    rating: 4.9,
    href: '/product/pla-blue',
    image: HitOneImg,
  },
  {
    id: 'pla-green',
    title: 'Катушка зелёная',
    rating: 4.6,
    href: '/product/pla-green',
    image: HitOneImg,
  },
  {
    id: 'pla-white',
    title: 'Катушка белая',
    rating: 4.8,
    href: '/product/pla-white',
    image: HitOneImg,
  },
  {
    id: 'pla-black',
    title: 'Катушка чёрная',
    rating: 4.8,
    href: '/product/pla-black',
    image: HitOneImg,
  },
];

export const benefitsMock: BenefitCardMock[] = [
  {
    id: 'inspire',
    title: ['Вдохновляет', 'на творчество'],
    lines:
      'Фигурки можно раскрасить, собрать' +
      'в коллекцию или дополнить своими' +
      'идеями — каждая модель становится' +
      'поводом для игры, творчества' +
      'и гордости за результат, созданный' +
      'своими руками',
    buttonText: 'Замена гаджетам',
    image: BulbImg,
    accentClassName: '-top-22 right-0 2xl:top-29 xl:top-50 2xl:right-2 xl:top-16 z-10',
  },
  {
    id: 'unlimited',
    title: ['Безграничный'],
    lines:
      'Креативик Store — это постоянно пополняемая коллекция 3D-моделей,' +
      ' созданных специально для набора «3D Креативик»,' +
      ' с удобным доступом к покупке по тематическим сериям',
    buttonText: 'Большой выбор моделей',
    image: InfinityImg,
    accentClassName:
      '2xl:top-23 xl:top-16 2xl:rotate-0 xl:top-50 2xl:right-0 xl:top-16 -top-15 right-0 z-10 -rotate-30 xl:-rotate-10',
  },
  {
    id: 'safe-simple',
    title: ['Простой', 'и безопасный'],
    lines:
      'Принтер запускается одной кнопкой,' +
      'оснащён закрытой камерой,' +
      'компактный и лёгкий. В комплекте —' +
      'готовые 3D-модели (игрушки, животные, механизмы).',
    buttonText: 'Проверено нами /\nПроверено Росатомом',
    image: ShieldCheckImg,
    accentClassName: '2xl:top-30 xl:top-16 2xl:-right-3 xl:top-50 -top-18 right-0 z-10',
  },
  {
    id: 'useful',
    title: ['Полезный'],
    lines:
      'Развивает пространственное и инженерное мышление,' +
      ' учит основам 3D-печати, креативности и творческому подходу,' +
      ' знакомит с технологиями будущего',

    buttonText: 'Замена гаджетам',
    image: LampImg,
    accentClassName: '2xl:top-26 xl:top-50 2xl:right-2 xl:right-2 -top-18 right-0 z-10',
  },
];

export const footerColumns = [
  {
    title: 'Главная',
    links: [
      { to: '/about', label: 'О нас' },
      { to: '/reviews', label: 'Отзывы' },
      { to: '/where-to-buy', label: 'Где купить' },
    ],
    colSpan: 'col-span-6 md:col-span-2',
  },
  {
    title: 'Магазин',
    links: [
      { to: '/catalog', label: 'Каталог' },
      { to: '/cart', label: 'Корзина' },
      { to: '/account', label: 'Личный кабинет' },
    ],
    colSpan: 'col-span-6 md:col-span-2',
  },
  {
    title: 'Поддержка',
    links: [
      { to: '/software', label: 'Программное обеспечение' },
      { to: '/manuals', label: 'Руководство пользователя' },
      { to: '/faq', label: 'Часто задаваемые вопросы' },
      { to: '/contacts', label: 'Остались вопросы?' },
    ],
    colSpan: 'col-span-12 md:col-span-2',
  },
];

export const ourActionsMock: string[] = [ourActions, ourActions, ourActions];
export const ourActionsMockMobile: string[] = [
  ourActionsMobile,
  ourActionsMobile,
  ourActionsMobile,
];
