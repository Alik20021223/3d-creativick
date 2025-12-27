type Discount = { price: number; type?: 'fix' | 'percent' };
type Priced = {
  discounts?: (Discount | { price: number })[] | null;
  sell_price?: number | null;
};

export function calcPrice(p: Priced): number {
  // базовая цена
  const sell = typeof p.sell_price === 'number' && Number.isFinite(p.sell_price) ? p.sell_price : 0;

  // берём первый валидный дисконт
  const discount = (p.discounts ?? []).find(
    (d) => d && typeof d.price === 'number' && Number.isFinite(d.price),
  ) as Discount | undefined;

  let discountValue = 0;

  if (discount) {
    // Если type не указан, считаем фиксированной скидкой
    const discountType = discount.type ?? 'fix';
    if (discountType === 'fix') {
      // фиксированная сумма
      discountValue = discount.price;
    } else if (discountType === 'percent') {
      // процент от цены
      discountValue = (sell * discount.price) / 100;
    }
  }

  // активная цена = sell_price - discount
  const active = sell - discountValue;

  // защита от кривых данных (скидка больше цены и т.п.)
  if (active > 0) {
    return active;
  }

  // если скидки нет или она некорректна — возвращаем базовую цену
  return sell;
}

export function calcOldPrice(p: Priced, current: number): number | undefined {
  // базовая цена
  const sell =
    typeof p.sell_price === 'number' && Number.isFinite(p.sell_price) ? p.sell_price : undefined;

  if (!sell) return undefined;

  // старая цена показывается только если она действительно выше активной
  return sell > current ? sell : undefined;
}
