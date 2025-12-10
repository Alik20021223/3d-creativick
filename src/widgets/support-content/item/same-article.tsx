import React from 'react';
import FAQCard from '@entities/support/ui/faq-card';
import { useGetAllFaq } from '@entities/support/hooks/getAllFaq';
import { getRandomItems } from '@utils/constant';

type Props = {
  currentId: number; // ID текущей статьи
};

export const SameArticle: React.FC<Props> = ({ currentId }) => {
  const { data, isLoading, error } = useGetAllFaq();

  // Все статьи, кроме текущей
  const otherFaqs = React.useMemo(() => {
    if (!data) return [];
    return data.filter((faq) => faq.id !== currentId);
  }, [data, currentId]);

  // 3 случайные статьи
  const random3 = React.useMemo(() => {
    return getRandomItems(otherFaqs, 3);
  }, [otherFaqs]);

  if (isLoading) {
    return <div className='text-secondary-text py-4 text-center'>Загрузка похожих статей...</div>;
  }

  if (error || !data) {
    return null;
  }

  if (random3.length === 0) {
    return <div className='text-secondary-text py-4 text-center'>Похожих статей пока нет</div>;
  }

  return (
    <article className='mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3'>
      {random3.map((faq) => (
        <FAQCard key={faq.id} faq={faq} />
      ))}
    </article>
  );
};
