import { Button } from "@shadcn/button";
import { Download } from "lucide-react";

interface TopMainBlockProps {
    subtitle: string
    title: string;
    description: string;
}

const TopMainBlock: React.FC<TopMainBlockProps> = ({ subtitle, title, description }) => {

    return (
        <>
            <div className="bg-white rounded-[20px] py-[42px] px-8 space-y-11 animate-float-in-up">
                <div className="flex flex-col items-center w-full gap-5">
                    <p className="text-secondary-gray">{subtitle}</p>
                    <h1 className="text-dark-blue text-[22px] font-bold leading-[110%]">{title}</h1>
                </div>
                <p className="description-text">{description}</p>
                <div className="w-full justify-center flex">
                    <Button className="text-white h-[56px] text-[22px] w-[193px]">
                        Скачать <Download />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TopMainBlock