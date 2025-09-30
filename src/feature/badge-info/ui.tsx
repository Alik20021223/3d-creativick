import { Badge } from "@shared/types"

interface BadgeInfoProps {
    data: Badge
}

const BadgeInfo: React.FC<BadgeInfoProps> = ({ data }) => {
    return (
        <>
            <span
                className='bg-gradient-badge inline-flex items-center gap-3.5 rounded-[8px] px-3 py-2 text-xs text-white max-md:w-full w-fit md:text-sm'
            >
                {data.icon}
                <div className='flex-1 text-sm'>{data.text}</div>
            </span>
        </>
    )
}

export default BadgeInfo