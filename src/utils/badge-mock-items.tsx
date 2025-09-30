import { FileImage, AlarmClock, Atom } from "lucide-react";
import { Badge } from "@shared/types";

// если есть тип из BadgeInfo, можно импортнуть:
// import type { BadgeInfoItem } from "@entities/profile/types";

export const BadgesMockItems: Badge[] = [
    {
        icon: <FileImage className="size-5" />,
        text: (
            <div className="flex w-full justify-between gap-2">
                <span>Размер файла</span>
                <span className="font-semibold">10 МБ</span>
            </div>
        ),
    },
    {
        icon: <AlarmClock className="size-5" />,
        text: (
            <div className="flex w-full justify-between gap-2">
                <span>Время печати серии</span>
                <span className="font-semibold">16 часов</span>
            </div>
        ),
    },
    {
        icon: <Atom className="size-5" />,
        text: (
            <div className="flex w-full justify-between gap-2">
                <span>Количество материала</span>
                <span className="font-semibold">500 г</span>
            </div>
        ),
    },
];
