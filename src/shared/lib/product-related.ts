export function getCategoryIds(product: {
  category_id?: number;
  category?: { id: number };
  categories?: Array<{ id: number }>;
}): number[] {
  if (!product) return [];

  const ids = new Set<number>();

  // 1) прямое поле category_id
  if (typeof product.category_id === 'number') {
    ids.add(product.category_id);
  }

  // 2) вложенный объект category { id }
  if (product.category?.id != null) {
    ids.add(Number(product.category.id));
  }

  // 3) массив categories: Category[]
  if (Array.isArray(product.categories)) {
    product.categories.forEach((c) => {
      if (c?.id != null) ids.add(Number(c.id));
    });
  }

  return Array.from(ids);
}

// выбираем N случайных элементов из массива
export function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
