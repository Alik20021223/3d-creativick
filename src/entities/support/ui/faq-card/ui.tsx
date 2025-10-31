// components/faq-card.tsx
import { ArrowUpRight } from 'lucide-react';
import ImgDefault from '@assets/bg-catalog.png';
import { useNavigate } from 'react-router-dom';

type FAQCardProps = {
  title: string;
  img?: string;
  href?: string;
};

const FAQCard: React.FC<FAQCardProps> = ({ title, img, href = 'support-1' }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(href)}
      className='group button-shadow-blue bg-secondary-white relative cursor-pointer overflow-hidden rounded-[60px] px-2.5 pt-2.5 shadow-xl transition-all'
    >
      {/* превью */}
      <div className='relative h-[310px] overflow-hidden rounded-[60px]'>
        <img src={img ?? ImgDefault} alt='' className='h-full w-full object-cover' />
      </div>

      {/* контент */}
      <div className='flex items-start justify-between gap-4 p-5'>
        <h3 className='text-secondary-text flex-1 text-[18px] leading-snug font-semibold break-words'>
          {title}
        </h3>

        <span className='border-primary-active text-primary-active group-hover:text-primary group-hover:border-primary hidden h-[59px] w-[59px] shrink-0 place-items-center rounded-full border-2 transition md:grid'>
          <ArrowUpRight className='size-10' />
        </span>
      </div>
    </article>
  );
};

export default FAQCard;
