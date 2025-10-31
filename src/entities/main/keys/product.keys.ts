// @entities/product/product.keys.ts
export const productKeys = {
  all: ['products'] as const,
  list: (params?: { category?: string; search?: string }) =>
    [...productKeys.all, 'list', params] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};
