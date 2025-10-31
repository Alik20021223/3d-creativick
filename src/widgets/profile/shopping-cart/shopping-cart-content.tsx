import ShopCard from '@entities/profile/ui/shop-card';
import { useAppStore } from '@app/store';
import ShopCardPriceBlock from '@entities/profile/ui/shop-card-price-block';
import { Button } from '@shared/shadcn/button';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { plural } from '@utils/constant';
import { useDeleteAllShoppingCart } from '@entities/profile/hooks/deleteAllShoppingCarts';
import { useDeleteShoppingCart } from '@entities/profile/hooks/deleteShoppingCart';

const ShoppingCartContent = () => {
  const { cartItems, cartItemsCount } = useAppStore();

  const { mutateAsync: deleteAllCart } = useDeleteAllShoppingCart();
  const { mutateAsync: deleteCart } = useDeleteShoppingCart();

  const handleDeleteAllCart = async () => {
    if (!cartItems) return;
    const ids = cartItems.user_carts[0].cart_id;
    await deleteAllCart({ ids: [ids] });
  };

  const handleDeleteCart = async (id: number) => {
    await deleteCart({ ids: [id] });
  };

  return (
    <>
      <article className='flex flex-col px-2.5 py-10 md:px-10'>
        <div className='flex w-full justify-between max-md:flex-col'>
          <div className='max-md:mb-10 md:w-[70%]'>
            <h1 className='title-text max-md:text-center'>
              В корзине {cartItemsCount} товар{plural(cartItemsCount, ['', 'а', 'ов'])}
            </h1>
            <p className='description-text mt-[22px]'>
              Проверьте содержимое корзины, чтобы убедиться, что все нужные вам товары в ней, и
              смело приступайте к оформлению заказа!
            </p>
          </div>
          <Button
            variant='link'
            onClick={handleDeleteAllCart}
            className='border-secondary-text text-secondary-text button-shadow-blue hover:text-primary hover:border-primary h-14 w-[298px] border bg-white text-[22px] leading-[130%] max-md:w-full'
          >
            Очистить корзину
            <Trash2 />
          </Button>
        </div>
        <div className='mt-10 flex w-full gap-5 max-md:flex-col'>
          <div className='max-md:mb-10 md:w-[70%]'>
            <div className='flex flex-col gap-4'>
              {cartItems?.user_carts[0].cartDetails.map((item, idx) => (
                <ShopCard key={idx} data={item} onRemove={() => handleDeleteCart(item.id)} />
              ))}
            </div>
            <div className='mt-6 flex w-full justify-center py-3.5 md:justify-end'>
              <Link to='/#shop' className='text-primary text-[22px] leading-[130%] underline'>
                В магазин
              </Link>
            </div>
          </div>
          <div className='md:w-[calc(100%-70%)]'>
            <ShopCardPriceBlock items={cartItems} />
          </div>
        </div>
      </article>
    </>
  );
};

export default ShoppingCartContent;
