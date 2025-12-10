import { DropdownItem, SelectOption } from '@shared/types';
// import wbLogo from '@assets/mobile-wb.png';
// import yandexLogo from '@assets/mobile-yandex.png';
// import megaLogo from '@assets/mobile-mega.png';
// import ozonLogo from '@assets/mobile-ozon.png';
import AtomLogo from '@assets/atom-store.png';
// import { slugify } from './constant';

export const headerMock = {
  main: [
    { label: 'О нас', href: '#about' },
    { label: 'Креативик. Store', href: '#series' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
  shop: [
    { label: 'Главная', href: 'https://3dkreativik.ru/' },
    { label: 'Каталог', href: '/' },
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
export const footerColumns = [
  {
    title: 'Главная',
    links: [
      { to: 'https://3dkreativik.ru/#about', label: 'О нас' },
      { to: 'https://3dkreativik.ru/#reviews', label: 'Отзывы' },
      { to: 'https://3dkreativik.ru/#where-to-buy', label: 'Где купить' },
    ],
    colSpan: 'col-span-6 md:col-span-2',
  },
  {
    title: 'Магазин',
    links: [
      { to: '/#shop', label: 'Каталог' },
      { to: '/shopping-cart', label: 'Корзина' },
      { to: '/profile', label: 'Личный кабинет' },
    ],
    colSpan: 'col-span-6 md:col-span-2',
  },
  {
    title: 'Поддержка',
    links: [
      { to: '/support#instructions', label: 'Программное обеспечение' },
      { to: '/support#instructions', label: 'Руководство пользователя' },
      { to: '/support#faq', label: 'Часто задаваемые вопросы' },
      { to: '/support#have-questions', label: 'Остались вопросы?' },
    ],
    colSpan: 'col-span-12 md:col-span-2',
  },
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

export const sortOrderOptions: SelectOption[] = [
  { label: 'Сначала новые', value: 'newest' },
  { label: 'Сначала старые', value: 'oldest' },
];

export const statusFilterOptions: SelectOption[] = [
  { label: 'Показывать все', value: 'all' },
  { label: 'Статус Ожидает оплаты', value: 'progress' },
  { label: 'Статус Заказ оплачен', value: 'paid' },
  { label: 'Статус Заказ отменен', value: 'canceled' },
];



export const marketplaces = [
  {
    name: 'Atom',
    logo: AtomLogo,
    url: 'https://shop.atom.museum/catalog/additivnye_tekhnologii__1/',
  },
  // {
  //   name: 'Wildberries',
  //   logo: wbLogo,
  //   url: 'https://www.wildberries.ru',
  // },
  // {
  //   name: 'Яндекс Маркет',
  //   logo: yandexLogo,
  //   url: 'https://market.yandex.ru',
  // },
  // {
  //   name: 'Мега Маркет',
  //   logo: megaLogo,
  //   url: 'https://megamarket.ru',
  // },
  // {
  //   name: 'Ozon',
  //   logo: ozonLogo,
  //   url: 'https://ozon.ru',
  // },
];

export const marketplacesMobile = [
  {
    name: 'Atom',
    logo: AtomLogo,
    url: 'https://shop.atom.museum/catalog/additivnye_tekhnologii__1/',
  },
  // {
  //   name: 'Wildberries',
  //   logo: wbLogo,
  //   url: 'https://www.wildberries.ru',
  // },
  // {
  //   name: 'Яндекс Маркет',
  //   logo: yandexLogo,
  //   url: 'https://market.yandex.ru',
  // },
  // {
  //   name: 'Мега Маркет',
  //   logo: megaLogo,
  //   url: 'https://megamarket.ru',
  // },
  // {
  //   name: 'Ozon',
  //   logo: ozonLogo,
  //   url: 'https://ozon.ru',
  // },
];

export const SupportTabs = [
  {
    id: 'service', // value для Tabs
    label: 'Обслуживание',
    pageCategoryId: 1, // ← id категории из бэка
  },
  {
    id: 'troubleshoot',
    label: 'Поиск и устранение неполадок',
    pageCategoryId: 2,
  },
  {
    id: 'slicer',
    label: 'Слайсер',
    pageCategoryId: 3,
  },
] as const;

export const ProfileTabs = [
  { id: 'orders', label: 'Заказы' },
  { id: 'favorites', label: 'Избранное' },
  { id: 'personal-info', label: 'Персональные данные' },
] as const;

export type TabId = (typeof ProfileTabs)[number]['id'];

export const SupportCards: Record<(typeof SupportTabs)[number]['id'], string[]> = {
  service: [
    'Короткий вопрос',
    'Извлечение и замена шестерней подачи пластика',
    'Еще какое-то очень длинное название статьи про обслуживание',
    'Короткий вопрос',
    'Извлечение и замена шестерней подачи пластика',
  ],
  troubleshoot: [
    'Короткий вопрос',
    'Извлечение и замена шестерней подачи пластика',
    'Еще какое-то очень длинное название статьи про поиск и устранение неполадок',
    'Еще какое-то очень длинное название статьи про поиск и устранение неполадок',
    'Короткий вопрос',
    'Извлечение и замена шестерней подачи пластика',
  ],
  slicer: ['Быстрые пресеты для PLA', 'Профили ретракта', 'Артефакты на периметрах: как убрать'],
};

export const COUPON_ERROR_MESSAGES: Record<string, string> = {
  ERROR_251: 'Этот промокод уже был использован',
  ERROR_252: 'Промокод не найден',
  ERROR_250: 'Срок действия промокода истёк',
  // ...добавишь остальные коды, какие есть
};
