import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/select";
import { cn } from "@/shared/lib/utils";

type Option = { label: string; value: string };

interface SelectFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    options: Option[];
    className?: string;
}

export function SelectField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Выберите…",
    options,
    className,
}: SelectFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className={cn("flex flex-col gap-2", className)}>
                    {label && <Label htmlFor={name}>{label}</Label>}
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger id={name} className={cn(fieldState.error && "border-red-500", "border-secondary-gray border")}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldState.error && (
                        <p className="text-xs text-red-500">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
}
export default SelectField;
