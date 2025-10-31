import { Button } from '@shared/shadcn/button';
import ModalLayout from '@app/layout/modalLayout';
import React from 'react';
import { ChevronRight, Download } from 'lucide-react';

interface ModalSuccessPaymentProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  file?: File;
}

const ModalSuccessPayment: React.FC<ModalSuccessPaymentProps> = ({ open, setOpen }) => {
  return (
    <>
      <ModalLayout
        open={open}
        onOpenChange={setOpen}
        headerClassName='text-left'
        className='w-full max-w-fit'
        title='Успешная оплата'
        footer={
          <div className='flex w-full gap-3'>
            <Button
              onClick={() => console.log('download')}
              variant='outline'
              className='h-full flex-1'
            >
              <Download />
              Скачать
            </Button>
            <Button className='h-full flex-1 text-white'>
              К моим заказам <ChevronRight />
            </Button>
          </div>
        }
      >
        <p className='text-secondary-text text-lg'>Поздравляем с покупкой!</p>
      </ModalLayout>
    </>
  );
};

export default ModalSuccessPayment;
