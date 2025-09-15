import HitOneImg from '@assets/hit-sell-one.svg';
import PrinterImg from '@assets/printer-card.png';
import CatushkaImg from '@assets/katushka-card.png';
import CosmoPersonImg from '@assets/cosmo-person.png';
import { DropdownItem, ProductCardMock, ProductCardType, SelectOption } from '@shared/types';
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

// colors-palette.ts
export const COLOR_PALETTE: Record<string, string> = {
  pink: 'bg-pink-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  beige: 'bg-amber-100',
  black: 'bg-gray-800',
  gray: 'bg-gray-300',
  blue: 'bg-sky-500',       // светло-синий
  blueDark: 'bg-blue-700',  // тёмно-синий
  green: 'bg-green-600',
  white: 'bg-white border border-gray-200',
  orange: 'bg-orange-500',
};

// доступные наборы цветов по типу товара
export const COLORS_BY_SET: Record<'printer'|'spool', string[]> = {
  printer: ['pink', 'blue', 'yellow', 'gray', 'black'], // как на 1-м скрине
  spool:   ['pink', 'red', 'yellow', 'beige', 'black', 'blueDark', 'green', 'white', 'orange'], // 2-й скрин
};


const baseProducts: ProductCardType[] = [
  {
    id: 1,
    title: 'Принтер голубой',
    activeColor: 'blue',
    colorSet: 'printer',
    badges: ['Космос 🚀', 'Эксклюзивы'],
    price: { last_price: 3900, new_price: 1900 },
    image: [PrinterImg, PrinterImg, PrinterImg],
  },
  {
    id: 2,
    title: 'Катушка',
    colorSet: 'spool',
    activeColor: 'pink',
    badges: ['Эксклюзивы'],
    price: { last_price: 4200, new_price: 2100 },
    image: [CatushkaImg, CatushkaImg],
  },
];

// генерим ещё 18 карточек (id 3..20) с одной картинкой
const generatedItems: ProductCardType[] = Array.from({ length: 18 }, (_, i) => {
  const id = i + 3; // 3..20
  return {
    id,
    title: `Космический флот ${id - 2}`, // например: Космический флот 1..18
    description: 'Каждый из нас понимает очевидную вещь: синтетическое тестирование способствует.',
    badges: ['Космос 🚀'], // можно поменять на свои теги
    price: { last_price: 3900, new_price: 1900 }, // как на макете
    image: [CosmoPersonImg], // одна картинка для всех 18
  };
});

// итоговый мок на 20 шт. — принтер, катушка, затем 18 авто-сгенерированных
export const productCardsMock: ProductCardType[] = [...baseProducts, ...generatedItems];

export const CATEGORIES = [
  'Акции 🔥',
  'Эксклюзивы',
  'Космос 🚀',
  'Категория 2',
  'Категория 3', // активная по умолчанию
  'Категория 4',
  'Категория 5',
  'Категория 6',
  'Категория 7',
  'Категория 8',
  'Категория 9',
  'Категория 10',
  'Категория 11',
  'Категория 12',
];

export const PerPageSelect: SelectOption[] = [
  { label: 'Показывать по 6', value: 6 },
  { label: 'Показывать по 9', value: 9 },
  { label: 'Показывать по 12', value: 12 },
  { label: 'Показывать по 15', value: 15 },
  { label: 'Показывать по 24', value: 24 },
];

export const SortMock: DropdownItem[] = [
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'newest', label: 'Сначала новые' },
];
