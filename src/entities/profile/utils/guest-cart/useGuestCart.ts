// src/entities/profile/guest-cart/useGuestCart.ts
import { useCallback, useEffect, useState } from 'react';
import * as storage from './guest-cart.storage';
import { GuestCartItem } from '../../types/guest-cart';

export function useGuestCart() {
  const [items, setItems] = useState<GuestCartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(storage.readCart());
    sync(); // первичная гидратация

    // Синхронизация между вкладками и компонентами
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === 'gcart:v1') sync();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('gcart:changed', sync);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('gcart:changed', sync);
    };
  }, []);

  const add = useCallback((item: GuestCartItem) => {
    const next = storage.addItem(item);
    setItems(next);
  }, []);

  const removeByStockId = useCallback((stockId: number, shopId = 1) => {
    const next = storage.removeByStockId(stockId, shopId);
    setItems(next);
  }, []);

  const hasStock = useCallback(
    (stockId?: number, shopId = 1) => {
      if (!stockId) return false;
      return items.some((i) => i.stock_id === stockId && i.shop_id === shopId);
    },
    [items],
  );

  const updateQuantity = useCallback((stockId: number, quantity: number, shopId = 1) => {
    const next = storage.updateQuantity(stockId, quantity, shopId);
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    storage.clearCart();
    setItems([]);
  }, []);

  return { items, add, removeByStockId, updateQuantity, hasStock, clear, setItems };
}
