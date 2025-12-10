// src/entities/support/ui/top-main.tsx
import { Button } from '@shadcn/button';
import { Download } from 'lucide-react';

interface TopMainBlockProps {
  subtitle: string;
  title: string;
  description: string;
  downloadUrl?: string; // 🔗 ссылка на файл
}

const TopMainBlock: React.FC<TopMainBlockProps> = ({
  subtitle,
  title,
  description,
  downloadUrl,
}) => {
  const isDisabled = !downloadUrl;

  return (
    <div className='animate-float-in-up space-y-11 rounded-[20px] bg-white px-8 py-[42px]'>
      <div className='flex w-full flex-col items-center gap-5'>
        <p className='text-secondary-gray'>{subtitle}</p>
        <h1 className='text-dark-blue text-[22px] leading-[110%] font-bold'>{title}</h1>
      </div>

      <p className='description-text whitespace-pre-line'>{description}</p>

      <div className='flex w-full justify-center'>
        {downloadUrl ? (
          <Button className='h-[56px] w-[193px] text-[22px] text-white' asChild>
            <a href={downloadUrl} target='_blank' rel='noopener noreferrer'>
              Скачать <Download className='ml-2' />
            </a>
          </Button>
        ) : (
          <Button className='h-[56px] w-[193px] text-[22px] text-white' disabled={isDisabled}>
            Скачать <Download className='ml-2' />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopMainBlock;
