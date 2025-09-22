import MainContent from "@widgets/support-content/main-content"
import BottomFormContent from "@widgets/support-content/bottom-form-content"
import TopMainContent from "@widgets/support-content/top-main-content"


const SupportPage = () => {
    return (
        <>
            <section className="pt-25 flex flex-col md:gap-25 gap-15">
                <TopMainContent />
                <div className="flex-grow md:px-10 px-2.5">
                    <MainContent />
                </div>
                <BottomFormContent />
            </section>
        </>
    )
}

export default SupportPage