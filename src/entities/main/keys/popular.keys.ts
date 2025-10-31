export const PopularKeys = {
  all: ['products'] as const,
  list: () => [...PopularKeys.all, 'list'] as const,
};
