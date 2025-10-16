import { useEffect, useState } from 'react';

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Если нужно анимировать только один раз:
        io.unobserve(ref);
      }
    }, options);

    io.observe(ref);
    return () => io.disconnect();
  }, [ref, options]);

  return { ref: setRef, inView };
}
