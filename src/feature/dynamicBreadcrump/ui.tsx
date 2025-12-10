import { useMemo } from 'react';
import { NavLink, useLocation, matchPath, generatePath } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@shadcn/breadcrumb';
import { BreadCrumpType } from '@shared/types';

type DynamicBreadcrumbsProps = {
  pathMap: Record<string, BreadCrumpType[]>;
  startLink: {
    value: string;
    link: string;
  };
};

const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({ pathMap, startLink }) => {
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

      if (!matched) continue;

      const paramMatches = matched.PATH.match(/:([a-zA-Z]+)/g) || [];

      let link: string;

      if (matched.LINK) {
        // если явно задан LINK — используем его (вместе с query)
        link = matched.LINK;
      } else if (paramMatches.length && matched.PATH.includes(':')) {
        // /support/:id → подставляем сегмент пути
        const params = Object.fromEntries(
          paramMatches.map((param) => [param.slice(1), pathParts[i]]),
        ) as Record<string, string>;

        link = generatePath(matched.PATH, params);
      } else {
        link = matched.PATH;
      }

      if (!items.find((el) => el.text === matched.BREADCRUMB)) {
        items.push({ link, text: matched.BREADCRUMB });
      }
    }

    return items;
  }, [pathParts, data]);

  const len = breadcrumbs.length;

  return (
    <Breadcrumb className='py-2.5'>
      <BreadcrumbList className='flex text-xs lg:text-sm'>
        <BreadcrumbItem>
          <NavLink to={startLink.link} className='text-secondary-text text-sm'>
            {startLink.value}
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
        <span className='text-secondary-text text-sm'>{item.text}</span>
      ) : (
        <NavLink to={item.link} className='text-secondary-text text-sm'>
          {item.text}
        </NavLink>
      )}
    </BreadcrumbItem>
  </>
);

export default DynamicBreadcrumbs;
