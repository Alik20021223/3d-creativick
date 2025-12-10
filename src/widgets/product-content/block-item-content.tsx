// src/widgets/product/BlockItem.tsx
import { GalleriesType, ProductCardType } from '@shared/types';
import VerticalThumbGallery from '@entities/products/ui/image-block';
import InfoBlock from '@entities/products/ui/info-block';
import { useAddToShoppingCart } from '@entities/profile/hooks/addToShoppingCart';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';
import { useAppStore } from '@app/store';
import { useCallback, useMemo, useState } from 'react';
import { findOptionIdBySelection } from '@/utils/product-variants';
import { CartDetail } from '@/entities/profile/types/cart';

// гостевая корзина
import { useGuestCart } from '@entities/profile/utils/guest-cart/useGuestCart';

type Props = {
  images: GalleriesType[];
  visible?: number;
  infoData: ProductCardType;
  isSpool?: boolean;
  className?: string;
  techData?: string;
  isSeries?: boolean;
};

const DEFAULT_SHOP_ID = 1;
const DEFAULT_CURRENCY_ID = 1;

const BlockItem: React.FC<Props> = ({
  images,
  visible = 4,
  infoData,
  className = '',
  // isSpool = false,
  isSeries = false,
  techData = '',
}) => {
  const { mutateAsync: addToCart } = useAddToShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  const { cartItems, isAuth } = useAppStore();

  // Гостевая корзина
  const guest = useGuestCart();

  // выбор вариантов
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<number | undefined>(undefined);

  // stock_id для текущей комбинации
  const selectedStockId = useMemo(() => {
    return findOptionIdBySelection(
      { uuid: infoData.uuid, stock_balances: infoData.stock_balances },
      selectedColor || undefined,
      selectedWeight,
    );
  }, [infoData.uuid, infoData.stock_balances, selectedColor, selectedWeight]);

  // Контент корзины пользователя
  const cardItems = useMemo(() => cartItems?.user_carts?.[0]?.cartDetails ?? [], [cartItems]);

  // Уже ли этот вариант в корзине? (учитываем авторизацию/гостя)
  const isInCart = useMemo(() => {
    if (!selectedStockId) return false;
    if (isAuth) {
      if (!cardItems.length) return false;
      return cardItems.some((cd: CartDetail) => cd?.stock?.id === selectedStockId);
    }
    return guest.hasStock(selectedStockId, DEFAULT_SHOP_ID);
  }, [isAuth, cardItems, selectedStockId, guest]);

  // Добавить в корзину
  // Добавить в корзину (ГОСТЬ + АВТОРИЗОВАННЫЙ)
  const handleAddToCart = useCallback(
    async (stockId?: number) => {
      if (!stockId) return;

      if (isAuth) {
        // авторизованный пользователь
        await addToCart({
          products: [{ stock_id: stockId, quantity: 1 }],
          currency_id: DEFAULT_CURRENCY_ID,
          shop_id: DEFAULT_SHOP_ID,
        });
      } else {
        // ГОСТЬ
        // Находим текущий вариант stock по id
        const stock = infoData.stock_balances.find((s) => s.id === stockId);

        guest.add({
          stock_id: stockId,
          quantity: 1,

          // Вес (как в ProductCard)
          weight: String(stock?.size ?? ''),

          product_uuid: infoData.uuid,

          // Цвет (как в ProductCard)
          color: selectedColor || undefined,

          shop_id: DEFAULT_SHOP_ID,
          currency_id: DEFAULT_CURRENCY_ID,

          // обязательные поля
          img: infoData.img,

          // цена (как в ProductCard)
          price: infoData.sell_price,

          // скидка — объект! А НЕ 0
          discount: infoData.discounts?.[0] || null,

          title: infoData.translation.title,
          description: infoData.translation.description || '',

          addedAt: Date.now(),
        });
      }
    },
    [
      isAuth,
      addToCart,
      guest,
      infoData.uuid,
      infoData.img,
      infoData.sell_price,
      infoData.discounts,
      infoData.translation.title,
      infoData.translation.description,
      selectedColor,
    ],
  );

  // Удалить из корзины
  const handleRemoveFromCart = useCallback(async () => {
    const stockId = selectedStockId;
    if (!stockId) return;

    if (isAuth) {
      const idToDelete = cardItems.find((cd: CartDetail) => cd?.stock?.id === stockId)?.id ?? 0;
      if (idToDelete) {
        await deleteCart({ ids: [idToDelete] });
      }
    } else {
      guest.removeByStockId(stockId, DEFAULT_SHOP_ID);
    }
  }, [isAuth, selectedStockId, cardItems, deleteCart, guest]);

  return (
    <div className={`flex w-full items-start gap-6 max-md:flex-col ${className}`}>
      <div className='w-full md:w-1/2'>
        <VerticalThumbGallery images={images} visible={visible} />
      </div>

      <InfoBlock
        techData={techData}
        data={infoData}
        isSeries={isSeries}
        isInCart={isInCart}
        onAdd={(id) => handleAddToCart(id)}
        onRemove={() => handleRemoveFromCart()}
        onColorChange={setSelectedColor}
        onWeightChange={setSelectedWeight}
      />
    </div>
  );
};

export default BlockItem;
