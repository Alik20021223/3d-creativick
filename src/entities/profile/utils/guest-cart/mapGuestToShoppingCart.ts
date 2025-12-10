import type { ShoppingCart } from '@/entities/profile/types/cart';
import { GuestCartItem } from '../../types/guest-cart';

export function mapGuestToShoppingCart(guest: GuestCartItem[]): ShoppingCart {
  return {
    user_carts: [
      {
        cartDetails: guest.map((g) => ({
          id: g.stock_id, // важно: id == stock_id, чтобы onRemove(id) у гостя работал
          quantity: g.quantity,
          price: g.price, // ← CardItem читает item.price
          discount: g.discount ?? 0, // ← CardItem читает item.discount
          stock: {
            id: g.stock_id,
            color: g.color, // ← для бейджа вариации и getDetailPathByVariant
            size: g.weight, // ← из веса делаем строку "N г"
            product: {
              uuid: g.product_uuid,
              img: g.img, // ← карточка берёт превью
              translation: {
                title: g.title, // ← заголовок
                description: g.description, // если где-то нужен
              },
            },
          },
        })),
      },
    ],
  } as ShoppingCart;
}
