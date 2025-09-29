import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@shadcn/button';

type FloatingButtonsProps = {
  chatHref?: string; // например, ссылка на Telegram/WhatsApp/чат
  showAt?: number; // порог показа кнопки "вверх" по скроллу
};

export default function FloatingButtons({
  showAt = 200,
}: FloatingButtonsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAt);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAt]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className='fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+20px)] z-50 flex flex-col items-center gap-3 max-sm:right-3'>
      {/* Кнопка Вверх */}
      <Button
        variant='outline'
        onClick={scrollTop}
        aria-label='Прокрутить вверх'
        className={`transition-all ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'} grid h-12 w-12 place-items-center rounded-full bg-[#F1F5F9] hover:brightness-110 active:scale-95`}
      >
        <ArrowUp size={24} strokeWidth={2} className='h-6! w-6!' />
      </Button>
    </div>
  );
}
