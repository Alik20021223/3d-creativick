export const headerMock = {
  guest: [
    { label: 'О нас', href: '/about' },
    { label: 'Эксклюзивные 3D серии', href: '/series' },
    { label: 'Наши преимущества', href: '/advantages' },
    { label: 'Где купить', href: '/where-to-buy' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
  auth: [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'Где купить?', href: '/where-to-buy' },
    { label: 'Наши преимущества', href: '/advantages' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Поддержка', href: '/support' },
  ],
} as const;
