import React, { useEffect, useRef } from 'react';
import {
    Controller,
    Control,
    FieldValues,
    Path,
    RegisterOptions,
    useFormContext,
} from 'react-hook-form';

import { cn } from '@lib/utils';
import { Textarea } from '@shadcn/textarea';

type BaseProps = React.ComponentProps<typeof Textarea>;

type CustomTextAreaProps<T extends FieldValues> = {
    name: Path<T>;
    control?: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    label?: string;
    helperText?: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;

    /** Автоподстройка высоты по контенту (по умолчанию true) */
    autoResize?: boolean;

    /** Показ счётчика символов; если есть maxLength — покажет current/max */
    showCount?: boolean;

    /** Кнопка очистки значения (крестик) */
    clearable?: boolean;
    clearAriaLabel?: string;
    clearIcon?: React.ReactNode;
} & Omit<BaseProps, 'name' | 'value' | 'defaultValue' | 'onChange' | 'ref'>;

export function CustomTextArea<T extends FieldValues>({
    name,
    control,
    rules,
    label,
    helperText,
    containerClassName,
    labelClassName,
    errorClassName,
    autoResize = true,
    showCount = false,
    clearable = false,
    clearAriaLabel = 'Очистить',
    clearIcon,
    className,
    ...props
}: CustomTextAreaProps<T>) {
    const ctx = useFormContext<T>();
    const ctl = control ?? ctx?.control;
    if (!ctl) throw new Error('CustomTextArea: provide `control` or wrap with <FormProvider>.');

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // утилита автоподстройки высоты
    const resize = () => {
        if (!autoResize || !textareaRef.current) return;
        const el = textareaRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    return (
        <Controller
            name={name}
            control={ctl}
            rules={rules}
            render={({ field, fieldState }) => {
                const currentLength = (field.value?.length ?? 0) as number;
                const maxLength = (props.maxLength ?? undefined) as number | undefined;

                // авто-ресайз при изменении значения
                useEffect(() => {
                    resize();
                }, [field.value]);

                // авто-ресайз на маунт
                useEffect(() => {
                    resize();
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                }, []);

                const showCounter = showCount || typeof maxLength === 'number';

                return (
                    <div className={cn('space-y-1 ', containerClassName)}>
                        {label && (
                            <label htmlFor={field.name} className={cn('text-sm font-medium', labelClassName)}>
                                {label}
                            </label>
                        )}

                        <div className="relative">
                            <Textarea
                                id={field.name}
                                aria-invalid={!!fieldState.error}
                                {...field}
                                {...props}
                                ref={(node) => {
                                    field.ref(node);
                                    textareaRef.current = node;
                                }}
                                className={cn(
                                    // даём отступ справа под крестик/счётчик
                                    clearable || showCounter ? 'pr-10' : '',
                                    className,
                                )}
                            />

                            {/* Кнопка очистки */}
                            {clearable && (
                                <button
                                    type="button"
                                    aria-label={clearAriaLabel}
                                    onClick={() => {
                                        field.onChange('');
                                        requestAnimationFrame(() => textareaRef.current?.focus());
                                    }}
                                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-black/5"
                                >
                                    {clearIcon ?? <span className="text-sm leading-none">×</span>}
                                </button>
                            )}

                            {/* Счётчик символов */}
                            {showCounter && (
                                <div className="pointer-events-none absolute bottom-2 right-2 select-none text-xs text-muted-foreground">
                                    {typeof maxLength === 'number'
                                        ? `${currentLength}/${maxLength}`
                                        : currentLength}
                                </div>
                            )}
                        </div>

                        {fieldState.error && <p
                            className={cn(
                                'min-h-4 text-xs',
                                fieldState.error ? 'text-red-500' : 'text-muted-foreground',
                                errorClassName,
                            )}
                        >
                            {fieldState.error ? fieldState.error.message : helperText}
                        </p>
                        }
                    </div>
                );
            }}
        />
    );
}

export default CustomTextArea;
