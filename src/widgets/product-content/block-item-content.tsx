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

type Props = {
  images: GalleriesType[];
  visible?: number;
  /** данные для InfoBlock */
  infoData: ProductCardType;
  isSpool?: boolean;
  className?: string;
};

const BlockItem: React.FC<Props> = ({
  images,
  visible = 4,
  infoData,
  className = '',
  isSpool = false,
}) => {
  const { mutateAsync: addToCart } = useAddToShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();
  const { cartItems } = useAppStore();

  // выбор пользователя
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<number | undefined>(undefined);

  // вычисляем stock_id для текущей пары
  const selectedStockId = useMemo(() => {
    return findOptionIdBySelection(
      { uuid: infoData.uuid, stock_balances: infoData.stock_balances },
      selectedColor || undefined,
      selectedWeight,
    );
  }, [infoData.uuid, infoData.stock_balances, selectedColor, selectedWeight]);

  // корзина: есть ли уже именно этот вариант
  const cardItems = cartItems?.user_carts?.[0]?.cartDetails ?? [];
  const isInCart = useMemo(() => {
    if (!cardItems.length || !selectedStockId) return false;
    return cardItems.some((cd: CartDetail) => cd?.stock?.id === selectedStockId);
  }, [cardItems, selectedStockId]);

  // добавить
  const handleAddToCart = useCallback(
    async (stockId?: number) => {
      if (!stockId) return;
      await addToCart({
        products: [{ stock_id: stockId, quantity: 1 }],
        currency_id: 1,
        shop_id: 1,
      });
    },
    [addToCart],
  );

  // удалить именно выбранный вариант
  const handleRemoveFromCart = useCallback(async () => {
    const idToDelete =
      cardItems.find((cd: CartDetail) => cd?.stock?.id === selectedStockId)?.id ?? 0;
    if (idToDelete) {
      await deleteCart({ ids: [idToDelete] });
    }
  }, [cardItems, selectedStockId, deleteCart]);

  return (
    <div className={`flex w-full items-start gap-6 max-md:flex-col ${className}`}>
      <div className='w-full md:w-1/2'>
        <VerticalThumbGallery images={images} visible={visible} />
      </div>

      <InfoBlock
        textInstructions={isSpool}
        data={infoData}
        isInCart={isInCart} // ← сюда булевку
        onAdd={(id) => handleAddToCart(id)} // ← добавить
        onRemove={() => handleRemoveFromCart()} // ← удалить именно этот вариант
        onColorChange={setSelectedColor}
        onWeightChange={setSelectedWeight}
      />
    </div>
  );
};

export default BlockItem;
