import React from 'react';
import { ColorButtonType } from '@shared/types';

interface ColorButtonProps {
  data: ColorButtonType;
  activeColor: string;
  setNewColor: (value: string) => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({ data, activeColor, setNewColor }) => {
  const isActive = activeColor === data.value;

  return (
    <button
      type='button'
      onClick={() => setNewColor(data.value)}
      className={`h-6 w-10 cursor-pointer rounded-[6px] transition-all duration-300 ease-in-out ${isActive ? 'color-btn-shadow scale-110 border border-white' : 'scale-100 border border-transparent'} `}
      style={{
        backgroundColor: data.class,
      }}
      aria-label={data.value}
    />
  );
};

export default ColorButton;
