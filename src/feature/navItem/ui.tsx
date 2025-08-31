import { isHashHref } from '@utils/constant';
import React from 'react'
import { Link } from 'react-router-dom';

interface NavItemProps {
    label: string;
    href: string;
    linkClass: (href: string) => string;
    pathname: string
}

const NavItem: React.FC<NavItemProps> = ({
    label,
    href,
    pathname,
    linkClass
}) => {

    
    

    if (isHashHref(href)) {
        if (pathname === '/') {
            // На главной: обычный якорь
            
            return (
                <a href={href} className={linkClass(href)}>
                    {label}
                </a>
            );
        }
        // Не на главной: ведём на главную с хешем (/#about)
        return (
            <Link to={`/${href}`} className={linkClass(href)}>
                {label}
            </Link>
        );
    }
    // Обычный роут
    return (
        <Link to={href} className={linkClass(href)}>
            {label}
        </Link>
    );
};

export default NavItem