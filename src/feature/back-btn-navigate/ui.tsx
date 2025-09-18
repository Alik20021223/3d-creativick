import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackBtnNavigate = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        type='button'
        className='grid size-10 place-items-center rounded-full border-1 border-slate-300 bg-white text-slate-600'
        aria-label='Назад'
      >
        <ArrowLeft className='h-5 w-5' />
      </button>
    </>
  );
};

export default BackBtnNavigate;
