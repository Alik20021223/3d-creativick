// src/entities/profile/guest-cart/guest-cart.storage.ts

import { GuestCartItem } from '../../types/guest-cart';

const KEY = 'gcart:v1';
const canUseLS = () => typeof window !== 'undefined' && !!window.localStorage;

function emitChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('gcart:changed'));
  }
}

export function readCart(): GuestCartItem[] {
  if (!canUseLS()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GuestCartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: GuestCartItem[]) {
  if (!canUseLS()) return;
  localStorage.setItem(KEY, JSON.stringify(items));
  emitChange();
}

export function addItem(item: GuestCartItem) {
  const items = readCart();
  const idx = items.findIndex((i) => i.stock_id === item.stock_id && i.shop_id === item.shop_id);
  if (idx >= 0) {
    items[idx].quantity += item.quantity;
  } else {
    items.push(item);
  }
  writeCart(items); // внутри дернёт emitChange()
  return items;
}

export function removeByStockId(stockId: number, shopId = 1) {
  const next = readCart().filter((i) => !(i.stock_id === stockId && i.shop_id === shopId));
  writeCart(next);
  return next;
}

export function updateQuantity(stockId: number, quantity: number, shopId = 1) {
  const items = readCart();
  const idx = items.findIndex((i) => i.stock_id === stockId && i.shop_id === shopId);
  if (idx >= 0) {
    if (quantity <= 0) {
      // Если количество <= 0, удаляем товар
      return removeByStockId(stockId, shopId);
    }
    items[idx].quantity = quantity;
    writeCart(items);
    return items;
  }
  return items;
}

export function clearCart() {
  if (!canUseLS()) return;
  localStorage.removeItem(KEY);
  emitChange();
}
