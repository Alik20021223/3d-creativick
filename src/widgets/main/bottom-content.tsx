import FeedbackCarousel from "@feature/feedback-carousel/ui"
import imgPlane from '@assets/rocket.png'


const items = [
    { rating: 4, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Игорь Сорокин", authorRole: "Учитель" },
    { rating: 5, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Мария Воронова", authorRole: "Преподаватель" },
    { rating: 3, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Дмитрий Полевой", authorRole: "Родитель" },
    { rating: 4, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Игорь Сорокин", authorRole: "Учитель" },
    { rating: 5, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Мария Воронова", authorRole: "Преподаватель" },
    { rating: 3, text: "Таким образом, глубокий уровень погружения не оставляет шанса для своевременного выполнения сверхзадачи.", authorName: "Дмитрий Полевой", authorRole: "Родитель" },

];


const BottomContent = () => {
    return (
        <>
            <div className="bg-feedback relative z-5 mt-[56px] w-screen pt-[80px] rounded-t-[80px] px-[38px] pb-10">
                <div className="grid place-items-center">
                    <div className="max-w-[1460px] space-y-12 relative">
                        <div className=" text-white w-[761px]">
                            <h1 className="font-bold text-[54px]">Отзывы о нас</h1>
                            <p className="text-lg font-normal w-[600px]">С другой стороны, реализация намеченных плановых заданий играет важную роль в формировании глубокомысленных рассуждений</p>
                        </div>

                        <FeedbackCarousel items={items} />

                        <img src={imgPlane} alt={imgPlane} className="absolute -top-20 left-90 z-5 float-rocket" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomContent