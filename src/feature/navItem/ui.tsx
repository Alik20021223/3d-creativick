import { isHashHref } from '@utils/constant';
import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  label: string;
  href: string;
  linkClass: (href: string) => string;
  pathname: string;
  onHashClick?: () => void; // чтобы закрывать меню и т.п.
}

const NavItem: React.FC<NavItemProps> = ({ label, href, linkClass, onHashClick }) => {
  if (isHashHref(href)) {
    // Якорь: всегда внутри текущей страницы
    return (
      <a href={href} className={linkClass(href)} onClick={onHashClick}>
        {label}
      </a>
    );
  }
  // Обычный роут
  return (
    <Link to={href} className={linkClass(href)}>
      {label}
    </Link>
  );
};

export default NavItem;
