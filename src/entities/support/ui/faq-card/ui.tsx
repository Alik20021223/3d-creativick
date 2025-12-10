// @entities/support/ui/faq-card.tsx
import { ArrowUpRight } from 'lucide-react';
import ImgDefault from '@assets/bg-catalog.webp';
import { useNavigate } from 'react-router-dom';
import type { FaqItem } from '@entities/support/types';
import { useSelectedFaqStore } from '@entities/support/store';

type FAQCardProps =
  | {
      faq: FaqItem;
      title?: never;
      img?: never;
      href?: never;
      tabId?: string;
    }
  | {
      faq?: never;
      title: string;
      img?: string;
      href?: string;
      tabId?: string;
    };

const FAQCard: React.FC<FAQCardProps> = (props) => {
  const navigate = useNavigate();

  const faq = 'faq' in props ? props.faq : undefined;

  const setSelectedFaq = useSelectedFaqStore((s) => s.setSelectedFaq);

  const title = faq?.translation?.title ?? props.title ?? 'Без заголовка';

  const img = faq?.img ?? faq?.galleries?.[0]?.path ?? props.img ?? ImgDefault;

  const handleClick = () => {
    setSelectedFaq(props.faq!);

    // Вариант 1: кладём id таба в query-параметр ?tab=...
    const search = props.tabId ? `?tab=${props.tabId}` : '';

    navigate(`/support/${props.faq!.id}${search}`);
  };

  return (
    <article
      onClick={() => handleClick()}
      className='group button-shadow-blue bg-secondary-white relative cursor-pointer overflow-hidden rounded-[60px] px-2.5 pt-2.5 shadow-xl transition-all'
    >
      <div className='relative h-[310px] overflow-hidden rounded-[60px]'>
        <img src={img} alt={title} className='h-full w-full object-cover' />
      </div>

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
