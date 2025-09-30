import { Badge } from "@shared/types";

export type Section =
  | { id: string; title: string; type: "text"; content: string }
  | { id: string; title: string; type: "image"; src: string; caption?: string }
  | { id: string; title: string; type: "quote"; content: string }
  | { id: string; title: string; type: "callout"; content: string }
  | { id: string; title: string; type: "list"; items: string[] };

export type CartItem = {
    id: string | number;
    title: string;
    href?: string;
    description?: string;
    imageUrl?: string | null;
    price: number;
    oldPrice?: number | null;
};

export type OrderCardItem = {
  orderNumber: number | string;
    status: OrderStatus;

    createdAt?: string; // "27.05.2014 в 13:00"
    paidAt?: string;    // "28.05.2014 в 14:00" (можно не передавать)

    price: number;
    currency?: string; // по умолчанию "₽"

    facts?: Badge[]; // правые фиолетовые бейджи

    onDownload?: () => void; // для paid
    onReorder?: () => void;  // для canceled
    onPay?: () => void;      // для pending
}



export type OrderStatus = "paid" | "canceled" | "pending";

export type LoyaltyCardProps = {
    // Верхняя плашка
    badgeTitle: string;      // "3D"
    title: string;           // "Новичок", "Ученик", ...
    perks: string[];         // ["-3% на первый заказ"] или несколько строк

    art?: string;   // декоративная 3D-картинка (иконка/изображение)

    // Прогресс
    current: number;         // сколько потрачено на текущем уровне
    toNext: number;          // сколько нужно ДО следующего уровня (0 если максимум)
    nextThreshold: number;   // порог следующего уровня (для правой подписи)
    maxReached?: boolean;    // если это последний уровень

    // Текст под прогрессом
    nextLevelName?: string;  // "3D-Ученик"
    nextLevelDiscount?: string; // "5%" — скидка на след. уровне

    // Правила (аккордеон)
    rules?: string[];

    className?: string;
};

export type LevelDef = {
  key: "novice" | "student" | "master" | "pro";
  title: string;
  threshold: number;          // от какой суммы начинается уровень
  perks: string[];            // списком в шапке
  art: string;                // src изображения (можно заменить на ReactNode при желании)
  nextDiscountLabel?: string; // что пишем про скидку на СЛЕД. уровне
};

