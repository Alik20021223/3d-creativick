import { useEffect, useState } from "react";

/**
 * следит за секциями по id, подсвечивает активную
 */
export function useTocObserver(ids: string[]) {
    const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

    useEffect(() => {
        if (!ids.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) =>
                        a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1
                    );
                if (visible[0]?.target?.id) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -70% 0px", // смещаем «зону активности»
                threshold: [0, 0.25, 0.5, 1],
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
    };

    return { activeId, handleClick };
}
