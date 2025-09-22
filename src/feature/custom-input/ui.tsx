import React, { useState, useRef } from 'react';
import {
    Controller,
    Control,
    FieldValues,
    Path,
    RegisterOptions,
    useFormContext,
} from 'react-hook-form';
import { cn } from '@lib/utils';
import { Input } from '@shadcn/input';

type BaseProps = React.ComponentProps<typeof Input>;

type CustomInputProps<T extends FieldValues> = {
    name: Path<T>;
    control?: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    label?: string;
    helperText?: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
} & Omit<BaseProps, 'name' | 'value' | 'defaultValue' | 'onChange' | 'ref'>;

export function CustomInput<T extends FieldValues>({
    name,
    control,
    rules,
    label,
    helperText,
    containerClassName,
    labelClassName,
    errorClassName,
    type = 'text',
    clearable = true,              // по умолчанию крестик включён
    clearAriaLabel,
    clearIcon,
    ...inputProps
}: CustomInputProps<T>) {
    const ctx = useFormContext<T>();
    const ctl = control ?? ctx?.control;
    if (!ctl) throw new Error('CustomInput: provide `control` or wrap with <FormProvider>.');

    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isPassword = type === 'password';

    return (
        <Controller
            name={name}
            control={ctl}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={cn('space-y-1', containerClassName)}>
                    {label && (
                        <label htmlFor={field.name} className={cn('text-sm font-medium pb-2.5', labelClassName)}>
                            {label}
                        </label>
                    )}

                    <Input
                        id={field.name}
                        aria-invalid={!!fieldState.error}
                        {...field}
                        {...inputProps}
                        ref={(node) => {
                            // RHF ref + локальный ref для фокуса после очистки
                            field.ref(node);
                            inputRef.current = node;
                        }}
                        type={type}
                        show={isPassword ? show : undefined}
                        setShow={isPassword ? setShow : undefined}
                        clearable={clearable}
                        clearIcon={clearIcon}
                        clearAriaLabel={clearAriaLabel}
                        onClear={() => {
                            // очистим значение в RHF и вернём фокус
                            field.onChange('');
                            // чтобы сработало сразу, обновим каретку
                            requestAnimationFrame(() => inputRef.current?.focus());
                        }}
                    />

                    {fieldState.error && <p
                        className={cn(
                            'min-h-4 text-xs',
                            fieldState.error ? 'text-red-500' : 'text-muted-foreground',
                            errorClassName,
                        )}
                    >
                        {fieldState.error ? fieldState.error.message : helperText}
                    </p>}
                </div>
            )}
        />
    );
}

export default CustomInput;
