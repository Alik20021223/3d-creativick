import wbLogo from '@assets/wb-image.png';
import yandexLogo from '@assets/yandex-market.svg';
import megaLogo from '@assets/mega-market.svg';
import ozonLogo from '@assets/ozon-slot.png';
import wbLogoMobile from '@assets/mobile-wb.svg';
import yandexLogoMobile from '@assets/mobile-yandex.svg';
import megaLogoMobile from '@assets/mobile-mega.svg';
import ozonLogoMobile from '@assets/mobile-ozon.svg';
import HitOneImg from '@assets/hit-sell-one.svg';
import { BenefitCardMock, ProductCardMock } from '@shared/types';
import LampImg from '@assets/lump-icon.svg';
import ShieldCheckImg from '@assets/sheild-pink.svg';
import InfinityImg from '@assets/infinityImg.svg';
import BulbImg from '@assets/bulbImg.svg';
import ourActions from '@assets/our-actions.svg';
import ourActionsMobile from '@assets/mobile-actions.svg';

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
    rating: 4,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Игорь Сорокин',
    authorRole: 'Учитель',
  },
  {
    rating: 5,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Мария Воронова',
    authorRole: 'Преподаватель',
  },
  {
    rating: 3,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Дмитрий Полевой',
    authorRole: 'Родитель',
  },
  {
    rating: 4,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Игорь Сорокин',
    authorRole: 'Учитель',
  },
  {
    rating: 5,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Мария Воронова',
    authorRole: 'Преподаватель',
  },
  {
    rating: 3,
    text: 'Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.',
    authorName: 'Дмитрий Полевой',
    authorRole: 'Родитель',
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
      'Простой и удобный',
      'Безопасный и компактный',
      'Красочный и бесшумный',
      'Стабильный и эффективный',
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
    bought: 600,
    href: '/product/pla-yellow',
    image: HitOneImg,
  },
  {
    id: 'pla-red',
    title: 'Катушка красная',
    rating: 4.7,
    bought: 410,
    href: '/product/pla-red',
    image: HitOneImg,
  },
  {
    id: 'pla-blue',
    title: 'Катушка голубая',
    rating: 4.9,
    bought: 520,
    href: '/product/pla-blue',
    image: HitOneImg,
  },
  {
    id: 'pla-green',
    title: 'Катушка зелёная',
    rating: 4.6,
    bought: 305,
    href: '/product/pla-green',
    image: HitOneImg,
  },
  {
    id: 'pla-white',
    title: 'Катушка белая',
    rating: 4.8,
    bought: 780,
    href: '/product/pla-white',
    image: HitOneImg,
  },
  {
    id: 'pla-black',
    title: 'Катушка чёрная',
    rating: 4.8,
    bought: 920,
    href: '/product/pla-black',
    image: HitOneImg,
  },
];

export const benefitsMock: BenefitCardMock[] = [
  {
    id: 'inspire',
    title: ['Вдохновляет', 'на творчество'],
    lines: [
      'Фигурки можно раскрасить, собрать',
      'в коллекцию или дополнить своими',
      'идеями — каждая модель становится',
      'поводом для игры, творчества',
      'и гордости за результат, созданный',
      'своими руками',
    ],
    buttonText: 'Замена гаджетам',
    image: BulbImg,
    accentClassName: 'md:-bottom-6 md:right-5 -top-20 right-0 z-10',
  },
  {
    id: 'unlimited',
    title: ['Безграничный'],
    lines: [
      'K.Store — это постоянно обновляемая',
      'коллекция 3D-моделей, созданных',
      'специально для принтера из набора',
      '«3D Кретивик», с доступом к покупке',
      'по тематическим сериям',
    ],
    buttonText: 'Рекомендует 9/10 педагогов',
    image: InfinityImg,
    accentClassName: 'md:-bottom-2 md:right-0 -top-15 right-0 z-10 -rotate-30',
  },
  {
    id: 'safe-simple',
    title: ['Простой', 'и безопасный'],
    lines: [
      'Принтер запускается одной кнопкой,',
      'оснащён закрытой камерой,',
      'компактный и лёгкий. В комплекте — ',
      'готовые 3D-модели (игрушки, животные,механизмы).',
    ],
    buttonText: 'Рекомендует 9/10 педагогов',
    image: ShieldCheckImg,
    accentClassName: 'md:-bottom-4 md:right-0 -top-20 right-0 z-10',
  },
  {
    id: 'useful',
    title: ['Полезный'],
    lines: [
      'Развивает мышление и креативность,',
      'учит основам 3D-печати и дизайну,',
      'знакомит с технологиями будущего',
      'и помогает отвлечься от гаджетов',
    ],
    buttonText: 'Замена гаджетам',
    image: LampImg,
    accentClassName: 'md:-bottom-3 md:right-2 -top-20 right-0 z-10',
  },
];

export const ourActionsMock: string[] = [ourActions, ourActions, ourActions];
export const ourActionsMockMobile: string[] = [ourActionsMobile, ourActionsMobile, ourActionsMobile];
