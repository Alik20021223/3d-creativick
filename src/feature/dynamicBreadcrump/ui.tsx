import { useMemo } from 'react';
import { NavLink, useLocation, matchPath, generatePath } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@shadcn/breadcrumb';
import { BreadCrumpType } from '@shared/types';

type DynamicBreadcrumbsProps = {
  pathMap: Record<string, BreadCrumpType[]>;
};

const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({ pathMap }) => {
  const location = useLocation();

  const pathParts = useMemo(
    () => location.pathname.split('/').filter(Boolean),
    [location.pathname],
  );

  const data = useMemo(() => {
    const first = pathParts[0];
    return pathMap[first] ?? pathMap['*'] ?? [];
  }, [pathMap, pathParts]);

  const breadcrumbs = useMemo(() => {
    let currentPath = '';
    const items: { link: string; text: string }[] = [];

    for (let i = 0; i < pathParts.length; i++) {
      currentPath += `/${pathParts[i]}`;

      const matched =
        data.find((item) => matchPath({ path: item.PATH, end: true }, currentPath)) ||
        data.find((item) => matchPath({ path: item.PATH, end: false }, currentPath));

      if (matched) {
        const paramMatches = matched.PATH.match(/:([a-zA-Z]+)/g) || [];
        const params = Object.fromEntries(
          paramMatches.map((param) => [param.slice(1), pathParts[i + 1]]),
        ) as Record<string, string>;

        const link = matched.PATH.includes(':') ? generatePath(matched.PATH, params) : matched.PATH;

        if (!items.find((el) => el.text === matched.BREADCRUMB)) {
          items.push({ link, text: matched.BREADCRUMB });
        }
      }
    }

    return items;
  }, [pathParts, data]);

  const len = breadcrumbs.length;

  console.log(breadcrumbs);


  return (
    <Breadcrumb className='py-2.5'>
      <BreadcrumbList className='flex text-xs lg:text-sm'>
        <BreadcrumbItem>
          <NavLink to='/' className='text-sm text-secondary-text'>
            Каталог
          </NavLink>
        </BreadcrumbItem>

        {breadcrumbs.map((item, i) => (
          <BreadcrumbSegment key={item.link || item.text} item={item} isLast={i === len - 1} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbSegment = ({
  item,
  isLast,
}: {
  item: { link: string; text: string };
  isLast: boolean;
}) => (
  <>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      {isLast ? (
        <BreadcrumbPage>{item.text}</BreadcrumbPage>
      ) : (
        <NavLink to={item.link} className='text-sm text-[#a8a8a8]'>
          {item.text}
        </NavLink>
      )}
    </BreadcrumbItem>
  </>
);

export default DynamicBreadcrumbs;
