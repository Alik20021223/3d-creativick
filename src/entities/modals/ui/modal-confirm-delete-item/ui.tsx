import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';

interface ModalConfirmDeleteItemProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleDeleteItem: (id: number) => void;
  id: number;
  title: string
}

const ModalConfirmDeleteItem: React.FC<ModalConfirmDeleteItemProps> = ({
  open,
  setOpen,
  handleDeleteItem,
  id,
  title
}) => {
  const handleClick = () => {
    setOpen(false);
    handleDeleteItem(id);
  };

  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        title='Удалить из корзины?'
        footer={
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <Button onClick={() => setOpen(false)} className='h-full flex-1 text-white'>
              Отмена
            </Button>
            <Button onClick={handleClick} variant='outline' className='h-full flex-1'>
              Да, удалить
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>
          Товар «{title}» будет удалён из&nbsp;корзины, продолжить?
        </p>
      </ModalLayout>
    </>
  );
};

export default ModalConfirmDeleteItem;
