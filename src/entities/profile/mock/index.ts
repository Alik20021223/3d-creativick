
import { LevelDef, OrderCardItem, OrderStatus } from "@entities/profile/types";
import { Download, RotateCcw, CreditCard, CheckCircle2, XCircle, Clock3 } from "lucide-react";
import ImgCubick from '@assets/novichok-kubick.svg'
import ImgBook from '@assets/student-book.svg'
import ImgHat from '@assets/master-hat.svg'
import ImgProfi from '@assets/profi-cup.svg'
import { BadgesMockItems } from "@utils/badge-mock-items";

// массив карточек
export const cards = [
  {
    id: 1,
    title: "Серия 1",
    description: "Кстати, стремящиеся вытеснить традиционное производство.",
    href: "#",
    price: 369458,
    oldPrice: 500692,
    imageUrl: "",
  },
  {
    id: 2,
    title: "Серия 2",
    description: "Инновации, которые меняют привычный рынок.",
    href: "#",
    price: 249999,
    oldPrice: 310000,
    imageUrl: "",
  },
  {
    id: 3,
    title: "Серия 3",
    description: "Технологии нового поколения для вашего бизнеса.",
    href: "#",
    price: 189000,
    oldPrice: 215000,
    imageUrl: "",
  },
];


export const statusConfig: Record<
    OrderStatus,
    {
        label: string;
        leftPillClass: string;
        LeftIcon: typeof CheckCircle2;
        ctaText: string;
        ctaVariant: "default" | "secondary" | "outline" | "link";
        ctaHandlerKey: "onDownload" | "onReorder" | "onPay";
        CtaIcon?: typeof Download | typeof RotateCcw | typeof CreditCard;
    }
> = {
    paid: {
        label: "Заказ оплачен",
        leftPillClass: "bg-lime-500 text-white",
        LeftIcon: CheckCircle2,
        ctaText: "Скачать",
        ctaVariant: "default",
        ctaHandlerKey: "onDownload",
        CtaIcon: Download,
    },
    canceled: {
        label: "Заказ отменён",
        leftPillClass: "bg-gray-400 text-white",
        LeftIcon: XCircle,
        ctaText: "Оформить заново",
        ctaVariant: "default",
        ctaHandlerKey: "onReorder",
    },
    pending: {
        label: "Ожидает оплаты",
        leftPillClass: "bg-amber-500 text-white",
        LeftIcon: Clock3,
        ctaText: "Оплатить",
        ctaVariant: "default",
        ctaHandlerKey: "onPay",
    },
};

export const ordersMock: OrderCardItem[] = [
  {
    orderNumber: 23,
    status: "paid",
    createdAt: "27.05.2014 в 13:00",
    paidAt: "28.05.2014 в 14:00",
    price: 3900,
    facts: BadgesMockItems,
    onDownload: () => alert("Скачивание заказа #23"),
  },
  {
    orderNumber: 23,
    status: "canceled",
    createdAt: "27.05.2014 в 13:00",
    paidAt: "28.05.2014 в 14:00",
    price: 3900,
    onReorder: () => alert("Оформить заново заказ #23"),
  },
  {
    orderNumber: 23,
    status: "pending",
    createdAt: "27.05.2014 в 13:00",
    paidAt: "28.05.2014 в 14:00",
    price: 3900,
    onPay: () => alert("Оплатить заказ #23"),
  },
];

export const LEVELS: LevelDef[] = [
  {
    key: "novice",
    title: "Новичок",
    threshold: 0,
    perks: ["-3% на первый заказ"],
    art: ImgCubick,
    nextDiscountLabel: "5%",
  },
  {
    key: "student",
    title: "Ученик",
    threshold: 10_000,
    perks: ["-5% на продукцию с сайта"],
    art: ImgBook,
    nextDiscountLabel: "7% и будет доступен бонус на день рождения",
  },
  {
    key: "master",
    title: "Мастер",
    threshold: 20_000,
    perks: ["-7% на продукцию с сайта", "Бонус на день рождения"],
    art: ImgHat,
    nextDiscountLabel: "10% и будет доступен бонус на день рождения",
  },
  {
    key: "pro",
    title: "Профи",
    threshold: 60_000,
    perks: ["-10% на все товары", "Бонус на день рождения"],
    art: ImgProfi,
    // нет nextDiscountLabel — это максимальный уровень
  },
];