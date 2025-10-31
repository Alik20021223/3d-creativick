import { CalendarIcon } from 'lucide-react';
import { Button } from '@shadcn/button';
import { Calendar } from '@shadcn/calendar';
import { Input } from '@shadcn/input';
import { Label } from '@shadcn/label';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@shared/lib/utils';

interface BaseProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

interface SingleModeProps<T extends FieldValues> extends BaseProps<T> {
  mode?: 'single';
}

interface RangeModeProps<T extends FieldValues> extends BaseProps<T> {
  mode: 'range';
  required?: boolean;
}

type CalendarFieldProps<T extends FieldValues> = SingleModeProps<T> | RangeModeProps<T>;

const isValidDate = (d: unknown): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};

export const CalendarField = <T extends FieldValues>(props: CalendarFieldProps<T>) => {
  const { name, control, label, placeholder = 'Выберите дату' } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const formatted = isValidDate(value) ? format(value, 'dd.MM.yyyy') : '';
        return (
          <div className='flex flex-col gap-2'>
            {label && (
              <Label htmlFor={name} className='px-1'>
                {label}
              </Label>
            )}
            <div className='relative flex w-full gap-2'>
              <Input
                id={name}
                value={formatted}
                readOnly
                placeholder={placeholder}
                className={cn('bg-background h-10 w-full pr-10', props.className)}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='ghost'
                    className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
                  >
                    <CalendarIcon className='size-3.5' />
                    <span className='sr-only'>Выбор даты</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='w-auto overflow-hidden p-0'
                  align='end'
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode={'single'}
                    selected={value}
                    captionLayout='dropdown'
                    onSelect={(date: Date | undefined) => {
                      onChange(date);
                    }}
                    {...{}}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      }}
    />
  );
};
