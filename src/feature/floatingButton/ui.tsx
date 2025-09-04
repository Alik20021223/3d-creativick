import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@shadcn/button";

type FloatingButtonsProps = {
    chatHref?: string;   // например, ссылка на Telegram/WhatsApp/чат
    showAt?: number;     // порог показа кнопки "вверх" по скроллу
};

export default function FloatingButtons({
    chatHref = "https://t.me/your_support_bot",
    showAt = 200,
}: FloatingButtonsProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > showAt);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showAt]);

    const scrollTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div
            className="
        fixed right-4
        bottom-[calc(env(safe-area-inset-bottom)+20px)]
        z-50 flex flex-col items-center gap-3
        max-sm:right-3
      "
        >
            {/* Кнопка Вверх */}
            <Button
                variant="outline"
                onClick={scrollTop}
                aria-label="Прокрутить вверх"
                className={`
          transition-all
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
          rounded-full h-12 w-12
          bg-[#F1F5F9]
          hover:brightness-110 active:scale-95
          grid place-items-center
        `}
            >
                <ArrowUp size={24} strokeWidth={2} className="w-6! h-6!" />
            </Button>

            {/* Кнопка Чат/Поддержка */}
            <a
                href={chatHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Открыть чат поддержки"
                className="
          rounded-full h-12 w-12
          bg-[#0A84FF] text-white
          shadow-lg shadow-black/20
          hover:brightness-110 active:scale-95
          grid place-items-center
        "
            >
                <MessageCircle size={20} strokeWidth={2.5} />
            </a>
        </div>
    );
}
