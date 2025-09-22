// components/fields/labeled-checkbox.tsx
import * as React from "react";

import { cn } from "@lib/utils";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@shadcn/checkbox";
import { FormDescription, FormItem, FormLabel, FormMessage } from "@shadcn/form";

interface LabeledCheckboxProps extends Omit<CheckboxProps, "id"> {
    id?: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: React.ReactNode;
    /** расположение подписи */
    labelPlacement?: "right" | "left";
    className?: string;
}

const LabeledCheckbox: React.FC<LabeledCheckboxProps> = ({
    id,
    label,
    description,
    error,
    labelPlacement = "right",
    className,
    ...props
}) => {
    const generatedId = React.useId();
    const inputId = id ?? `chk_${generatedId}`;

    return (
        <FormItem className={cn(className)}>
            <div className={cn("flex items-start gap-3", labelPlacement === "left" && "flex-row-reverse justify-end")}>
                <Checkbox id={inputId} aria-invalid={!!error || undefined} {...props} />
                <div className="grid gap-1 leading-none">
                    {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage>{error}</FormMessage>
                </div>
            </div>
        </FormItem>
    );
};

export default LabeledCheckbox