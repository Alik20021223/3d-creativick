import { useEffect, useRef, useState } from 'react';

type Options = {
  threshold?: number; // когда начинать прятать (px)
  delta?: number; // минимальный шаг для реакции (px)
  showAtTop?: boolean; // показывать у самого верха
  disabled?: boolean; // выключить логику
  revealOnIdleMs?: number; // автопоказ, если скролл остановился
};

export function useHideOnScroll({
  threshold = 80,
  delta = 6,
  showAtTop = true,
  disabled = false,
  revealOnIdleMs = 250, // <= главное нововведение
}: Options = {}) {
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY;
    let ticking = false;

    const clearIdle = () => {
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    const scheduleIdleReveal = () => {
      clearIdle();
      idleTimer.current = window.setTimeout(() => {
        // авто-показ после остановки прокрутки
        setHidden(false);
      }, revealOnIdleMs);
    };

    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y <= 2);

      // каждая прокрутка сбрасывает таймер «scrollend»
      scheduleIdleReveal();

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = y - lastY.current;

          if (y < threshold && showAtTop) {
            setHidden(false);
          } else {
            if (diff > delta)
              setHidden(true); // вниз — прячем
            else if (diff < -delta) setHidden(false); // вверх — показываем
          }

          lastY.current = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // при монтировании тоже запланируем idle-показ (на случай программного скролла)
    scheduleIdleReveal();

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearIdle();
    };
  }, [threshold, delta, showAtTop, disabled, revealOnIdleMs]);

  return { hidden, atTop, setHidden };
}
