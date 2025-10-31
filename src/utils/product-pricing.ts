type Discount = { price?: number | null };
type Priced = {
  discounts?: Discount[] | null;
  sell_price?: number | null;
};

export function calcPrice(p: Priced): number {
  const discountPrice = (p.discounts ?? []).find(
    (d) => typeof d?.price === 'number' && Number.isFinite(d.price),
  )?.price;

  if (typeof discountPrice === 'number') return discountPrice!;
  if (typeof p.sell_price === 'number') return p.sell_price!;
  return 0;
}

export function calcOldPrice(p: Priced, current: number): number | undefined {
  const candidates = [p.sell_price].filter(
    (v): v is number => typeof v === 'number' && Number.isFinite(v),
  );
  if (!candidates.length) return undefined;
  const max = Math.max(...candidates);
  return max > current ? max : undefined;
}
