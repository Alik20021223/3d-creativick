import { cn } from '@lib/utils';
import { Button } from '@shared/shadcn/button';
import { Heart } from 'lucide-react';

interface ButtonSaveProps {
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  status: boolean;
  className?: string
  active?: boolean
}

const ButtonSave: React.FC<ButtonSaveProps> = ({ onSave, status, className, active = false }) => {
  return (
    <>
      <Button
        variant='outline'
        onClick={onSave}
        className={cn(' ml-3 h-full w-[46px] gap-0 rounded-full border p-3 md:w-[56px]',
          active ? 'border-primary-active text-primary-active' : 'border-primary text-primary',
          className
        )}
      >
        <Heart className={cn('h-5.5! w-5.5! md:h-9! md:w-9!',
          status ? 'fill-primary' : 'fill-transparent',
          (status && active) && 'fill-primary-active',
        )}
        />
      </Button >
    </>
  );
};

export default ButtonSave;
