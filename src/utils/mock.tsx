import wbLogo from '@assets/wb-image.png'
import yandexLogo from '@assets/yandex-market.svg'
import megaLogo from '@assets/mega-market.svg'
import ozonLogo from '@assets/ozon-slot.png'

export const headerMock = {
  main: [
    { label: 'О нас', href: '#about' },
    { label: 'Эксклюзивные 3D серии', href: '#series' },
    { label: 'Где купить', href: '#where-to-buy' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
  shop: [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/shop' },
    { label: 'Где купить?', href: '#where-to-buy' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
};

export const itemsFeedback = [
  { rating: 4, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Игорь Сорокин", authorRole: "Учитель" },
  { rating: 5, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Мария Воронова", authorRole: "Преподаватель" },
  { rating: 3, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Дмитрий Полевой", authorRole: "Родитель" },
  { rating: 4, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Игорь Сорокин", authorRole: "Учитель" },
  { rating: 5, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Мария Воронова", authorRole: "Преподаватель" },
  { rating: 3, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Дмитрий Полевой", authorRole: "Родитель" },
];

export const marketplaces = [
  {
    name: "Wildberries",
    logo: wbLogo,
    url: "https://www.wildberries.ru",
  },
  {
    name: "Яндекс Маркет",
    logo: yandexLogo,
    url: "https://market.yandex.ru",
  },
  {
    name: "Мега Маркет",
    logo: megaLogo,
    url: "https://megamarket.ru",
  },
  {
    name: "Ozon",
    logo: ozonLogo,
    url: "https://ozon.ru",
  },
];
