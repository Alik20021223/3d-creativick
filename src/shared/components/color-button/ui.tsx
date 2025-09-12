import { ColorButtonType } from "@/shared/types"

interface ColorButtonProps {
    data: ColorButtonType,
    activeColor: string
    setNewColor: (value: string) => void
}

const ColorButton: React.FC<ColorButtonProps> = ({ data, activeColor, setNewColor }) => {
    return (
        <button
            onClick={() => setNewColor(data.value)}
            className={`
                w-10 h-6 rounded-[6px] 
                transition-all duration-300 ease-in-out
                ${activeColor === data.value
                    ? "border-white border color-btn-shadow scale-110"
                    : "scale-100 border border-transparent"
                } ${data.class}
            `}
        />
    )
}


export default ColorButton