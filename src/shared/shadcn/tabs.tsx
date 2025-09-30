import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // пилюля по всей ширине контейнера
        "inline-flex w-full items-center justify-between md:rounded-full rounded-md bg-secondary-white",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // плавные цвета/фон/тень
        "inline-flex flex-1 items-center justify-center gap-2 md:rounded-full rounded-md px-5 py-2 text-sm font-medium whitespace-nowrap",
        "transition-[background-color,color,box-shadow,transform] duration-300 ease-out",
        // обычное состояние
        "text-foreground",
        // hover для неактивных
        "data-[state=inactive]:hover:bg-black/5",
        // активный таб
        "data-[state=active]:bg-primary-active data-[state=active]:text-white data-[state=active]:shadow-[0_8px_20px_rgba(59,127,214,0.35)]",
        // focus
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // Radix монтирует только активный контент → анимируем вход
      className={cn(
        "flex-1 outline-none",
        "data-[state=active]:animate-fade-in-up",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
