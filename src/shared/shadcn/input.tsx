import * as React from 'react';
import { cn } from '@lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleVisibilityIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      show,
      setShow,
      toggleVisibilityIcon,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const isPassword =
      type === 'password' && typeof show === 'boolean' && typeof setShow === 'function';

    return (
      <div className='relative w-full'>
        {leftIcon && (
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-2 flex items-center'>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={isPassword && show ? 'text' : type}
          data-slot='input'
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-[12px] bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            leftIcon && 'pl-8',
            className,
          )}
          {...props}
        />
        {isPassword && toggleVisibilityIcon && (
          <button
            type='button'
            onClick={() => setShow(!show)}
            className='text-muted-foreground absolute inset-y-0 right-2 flex items-center'
            tabIndex={-1}
          >
            {toggleVisibilityIcon}
          </button>
        )}
        {rightIcon && (
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-2 flex items-center'>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
