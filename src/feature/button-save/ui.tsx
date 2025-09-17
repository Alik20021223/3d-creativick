import { Button } from '@shared/shadcn/button'
import { Heart } from 'lucide-react'

interface ButtonSaveProps {
    onSave: () => void
    status: boolean
}

const ButtonSave: React.FC<ButtonSaveProps> = ({ onSave, status }) => {
    return (
        <>
            <Button
                variant="outline"
                onClick={onSave}
                className='border-primary h-full md:w-[56px] w-[46px] gap-0 text-primary ml-3 rounded-full border p-3'
            >
                <Heart className={`md:h-9! md:w-9! h-5.5! w-5.5! ${status && 'fill-primary'}`} />
            </Button>
        </>
    )
}

export default ButtonSave