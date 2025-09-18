import { Button } from '@shared/shadcn/button';
import { Heart } from 'lucide-react';

interface ButtonSaveProps {
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  status: boolean;
}

const ButtonSave: React.FC<ButtonSaveProps> = ({ onSave, status }) => {
  return (
    <>
      <Button
        variant='outline'
        onClick={onSave}
        className='border-primary text-primary ml-3 h-full w-[46px] gap-0 rounded-full border p-3 md:w-[56px]'
      >
        <Heart className={`h-5.5! w-5.5! md:h-9! md:w-9! ${status && 'fill-primary'}`} />
      </Button>
    </>
  );
};

export default ButtonSave;
