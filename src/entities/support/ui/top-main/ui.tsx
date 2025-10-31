import { Button } from '@shadcn/button';
import { Download } from 'lucide-react';

interface TopMainBlockProps {
  subtitle: string;
  title: string;
  description: string;
}

const TopMainBlock: React.FC<TopMainBlockProps> = ({ subtitle, title, description }) => {
  return (
    <>
      <div className='animate-float-in-up space-y-11 rounded-[20px] bg-white px-8 py-[42px]'>
        <div className='flex w-full flex-col items-center gap-5'>
          <p className='text-secondary-gray'>{subtitle}</p>
          <h1 className='text-dark-blue text-[22px] leading-[110%] font-bold'>{title}</h1>
        </div>
        <p className='description-text'>{description}</p>
        <div className='flex w-full justify-center'>
          <Button className='h-[56px] w-[193px] text-[22px] text-white'>
            Скачать <Download />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopMainBlock;
