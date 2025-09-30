import * as React from 'react';
import { cn } from '@lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleVisibilityIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Новые пропсы очистки
  clearable?: boolean;                  // вкл/выкл кнопку очистки
  onClear?: () => void;                 // обработчик очистки
  clearIcon?: React.ReactNode;          // иконка крестика (если не передать — используем ×)
  clearAriaLabel?: string;              // aria-label для доступности
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      show,
      setShow,
      toggleVisibilityIcon,
      leftIcon,
      rightIcon,

      clearable,
      onClear,
      clearIcon,
      clearAriaLabel = 'Очистить ввод',

      ...props
    },
    ref,
  ) => {
    const isPassword =
      type === 'password' && typeof show === 'boolean' && typeof setShow === 'function';

    // есть ли справа хоть что-то (правый икон, переключатель пароля или крестик)
    const hasRightControls = Boolean(rightIcon || isPassword || clearable);

    // базовый класс инпута
    const inputCls = cn(
      'file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground',
      'border-secondary-gray flex h-9 w-full min-w-0 rounded-full bg-white px-3 py-1 text-base shadow-xs focus-visible:border-primary  focus-visible:ring-primary hover:border-primary-active border',
      'transition-[color,box-shadow] outline-none',
      'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      leftIcon && 'pl-8',
      hasRightControls && 'pr-12', // даём место под правые контролы
      className,
    );

    return (
      <div className="relative w-full h-full">
        {/* Левый икон */}
        {leftIcon && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-2 flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={isPassword && show ? 'text' : type}
          data-slot="input"
          className={inputCls}
          {...props}
        />

        {/* Контейнер правых контролов: Иконка справа, тогглер пароля, крестик очистки */}
        {(rightIcon || isPassword || clearable) && (
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {rightIcon && (
              <div className="text-muted-foreground pointer-events-none flex items-center">
                {rightIcon}
              </div>
            )}

            {isPassword && toggleVisibilityIcon && (
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="text-muted-foreground flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/5"
                tabIndex={-1}
              >
                {toggleVisibilityIcon}
              </button>
            )}

            {clearable && props.value?.toString() && (
              <button
                type="button"
                onClick={onClear}
                aria-label={clearAriaLabel}
                className="text-muted-foreground flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/5"
              >
                {clearIcon ?? <span className="text-sm leading-none">×</span>}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
