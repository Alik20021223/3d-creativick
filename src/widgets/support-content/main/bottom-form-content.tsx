import ContactForm from '@entities/support/ui/contact-form'
import imgSupportInfo from '@assets/support-info.svg'


const BottomFormContent = () => {
    return (
        <section id='have-questions' className="bg-white rounded-t-[80px]">
            <div className="md:px-10 px-2.5 md:py-30 py-15 flex gap-10 w-full max-lg:flex-col container-custom">
                <div className="flex flex-col gap-10 w-1/2 max-lg:w-full">
                    <div className="w-full">
                        <span className="text-secondary-gray text-[22px] leading-[130%]">Наши контакты</span>
                        <h1 className="mt-2 mb-6 title-text">
                            Остались вопросы?
                        </h1>
                        <p className="description-text">
                            Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.
                        </p>
                    </div>
                    <div className="w-full">
                        <img src={imgSupportInfo} alt="img-support-info" />
                    </div>
                </div>

                {/* ПРАВАЯ КОЛОНКА — ФОРМА */}
                <div className="flex w-1/2 max-lg:w-full">
                    <ContactForm />
                </div>
            </div>
        </section>
    )
}

export default BottomFormContent
