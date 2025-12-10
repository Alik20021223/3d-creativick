import { SelectOption } from '@shared/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcn/select';
import React from 'react';
import { cn } from '@lib/utils';

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  value: string;
  classNameTrigger?: string;
  classNameContent?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  disabled,
  value,
  onValueChange,
  classNameTrigger,
  classNameContent,
}) => {
  return (
    <Select disabled={disabled} onValueChange={onValueChange} value={String(value)}>
      <SelectTrigger className={cn('!h-10 w-full', classNameTrigger)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(classNameContent)}>
        {options.length > 0 ? (
          options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
