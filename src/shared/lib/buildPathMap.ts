import type { BreadCrumpType, ProductCardType } from '@shared/types';

type BuildProductPathOpts = {
  basePath?: string;
  category?: {
    title: string;
    /** path — для matchPath */
    pathForMatch: string;
    /** link — реальный URL, куда вести */
    link: string;
  };
};

export function buildProductPathMap(
  productData: Pick<ProductCardType, 'uuid' | 'translation'> | undefined,
  pathname: string,
  opts?: BuildProductPathOpts,
): Record<string, BreadCrumpType[]> {
  if (!productData) return { '*': [] };

  const title = productData.translation?.title ?? '';
  const path =
    opts?.basePath && productData.uuid
      ? `${opts.basePath.replace(/\/$/, '')}/${productData.uuid}`
      : pathname;

  const crumbs: BreadCrumpType[] = [];

  if (opts?.category) {
    crumbs.push({
      PATH: opts.category.pathForMatch, // для matchPath
      LINK: opts.category.link, // реальный href
      BREADCRUMB: opts.category.title,
    });
  }

  crumbs.push({
    PATH: path,
    BREADCRUMB: title,
  });

  return {
    '*': crumbs,
  };
}
