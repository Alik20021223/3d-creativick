import * as React from "react";
import { cn } from "@lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";
import { DropdownItem } from "@shared/types";

type CustomDropdownProps = {
    trigger?: React.ReactNode;
    label?: string;
    items: DropdownItem[];
    className?: string;
    onSelect?: (value: string) => void;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    contentClassName?: string;

    /** новое: текущее выбранное значение */
    selectedValue?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    trigger,
    label,
    items,
    className,
    onSelect,
    align = "end",
    side = "bottom",
    sideOffset = 8,
    contentClassName,
    selectedValue,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-white py-2 px-3.5 rounded-[12px]" asChild>
                {trigger ? (
                    <span className={cn("inline-flex", className)}>{trigger}</span>
                ) : (
                    <button className={cn("rounded-md border px-3 py-2 text-sm", className)}>Open</button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className={cn("min-w-[12rem] rounded-[12px] p-1", contentClassName)}
            >
                {label && (
                    <>
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                            {label}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}

                {items.map((it) => {
                    const isSelected = it.value === selectedValue;

                    return (
                        <DropdownMenuItem
                            key={it.value}
                            disabled={it.disabled}
                            onSelect={() => {
                                // по умолчанию закрываем меню после выбора
                                if (it.onSelect) it.onSelect();
                                else onSelect?.(it.value);
                            }}
                            // для доступности: роль "radio" и aria-checked
                            role="menuitemradio"
                            aria-checked={isSelected}
                            className={cn(
                                "relative flex cursor-pointer select-none items-center gap-2 rounded-[12px] px-2 py-1.5 text-sm",
                                // базовый цвет
                                !isSelected && "text-secondary-text",
                                // выбранный пункт — меняем фон и текст
                                isSelected &&
                                " text-primary bg-secondary-white font-semibold",
                                it.destructive &&
                                "text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/40"
                            )}
                        >
                            {it.icon && <span className="shrink-0">{it.icon}</span>}
                            <span className="flex-1">{it.label}</span>

                            {it.shortcut && (
                                <span className="text-xs text-muted-foreground">{it.shortcut}</span>
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CustomDropdown;
