import { ColorButtonType } from '@/shared/types';

interface ColorButtonProps {
  data: ColorButtonType;
  activeColor: string;
  setNewColor: (value: string) => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({ data, activeColor, setNewColor }) => {
  return (
    <button
      onClick={() => setNewColor(data.value)}
      className={`h-6 w-10 rounded-[6px] transition-all duration-300 ease-in-out ${
        activeColor === data.value
          ? 'color-btn-shadow scale-110 border border-white'
          : 'scale-100 border border-transparent'
      } ${data.class} `}
    />
  );
};

export default ColorButton;
