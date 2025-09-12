import { SelectOption } from '@shared/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcn/select';
import React from 'react';

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  disabled,
  value,
  onValueChange,
}) => {
  return (
    <Select disabled={disabled} onValueChange={onValueChange} value={String(value)}>
      <SelectTrigger className='!h-10 w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
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
