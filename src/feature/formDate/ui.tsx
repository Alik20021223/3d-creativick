import { CalendarIcon } from "lucide-react"
import { Button } from "@shadcn/button"
import { Calendar } from "@shadcn/calendar"
import { Input } from "@shadcn/input"
import { Label } from "@shadcn/label"
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover"
import { Controller, Control, FieldValues, Path } from "react-hook-form"
import * as React from "react"
import { format } from "date-fns"

interface BaseProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
}

interface SingleModeProps<T extends FieldValues> extends BaseProps<T> {
    mode?: "single"
}

interface RangeModeProps<T extends FieldValues> extends BaseProps<T> {
    mode: "range"
    required?: boolean
}

type CalendarFieldProps<T extends FieldValues> = SingleModeProps<T> | RangeModeProps<T>

const isValidDate = (d: unknown): d is Date => {
    return d instanceof Date && !isNaN(d.getTime());
};

// Function to get yesterday's date
const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
};

// Function to get today's date
const getToday = () => new Date();

export const CalendarField = <T extends FieldValues>(props: CalendarFieldProps<T>) => {
    const { name, control, label, placeholder = "Выберите дату" } = props
    const [open, setOpen] = React.useState(false)


    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
                const formatted = isValidDate(value)
                    ? format(value, "dd.MM.yyyy")
                    : "";
                return (
                    <div className="flex flex-col gap-2">
                        {label && (
                            <Label htmlFor={name} className="px-1">
                                {label}
                            </Label>
                        )}
                        <div className="relative flex gap-2 w-full">
                            <Input
                                id={name}
                                value={formatted}
                                readOnly
                                placeholder={placeholder}
                                className="w-full pr-10 bg-background h-10"
                            />
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                    >
                                        <CalendarIcon className="size-3.5" />
                                        <span className="sr-only">Выбор даты</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="end"
                                    alignOffset={-8}
                                    sideOffset={10}
                                >
                                    <Calendar
                                        mode={"single"}
                                        selected={value}
                                        captionLayout="dropdown"
                                        onSelect={(date: Date | undefined) => {
                                            onChange(date)
                                        }}
                                        {...({})}
                                    />
                                    <div className="flex justify-between p-3">
                                        {/* Button to set yesterday's date */}
                                        <Button
                                            className="text-black bg-slate-300"
                                            onClick={() => {
                                                const currentValue = value // Get current value if any
                                                onChange({
                                                    from: getYesterday(),  // Set yesterday's date to 'from'
                                                    to: currentValue.to || currentValue.from, // Keep existing 'to' value or 'from'
                                                })
                                            }}
                                        >
                                            Вчера
                                        </Button>

                                        {/* Button to set today's date */}
                                        <Button
                                            className="text-black bg-slate-300"
                                            onClick={() => {
                                                const currentValue = value
                                                onChange({
                                                    from: currentValue.from || getToday(), // Keep existing 'from' or set today's date
                                                    to: getToday(),  // Set today's date to 'to'
                                                })
                                            }}
                                        >
                                            Сегодня
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )
            }}
        />
    )
}
