
import LoyaltyLevelCard from "@entities/profile/ui/loyatly-card"
import ContactInfoForm from "@entities/profile/ui/contact-info-form"
import PersonalInfoForm from "@entities/profile/ui/profile-info-form"
import { PersonalInfoValues } from "@entities/profile/ui/profile-info-form/ui"
import { buildLoyaltyCard } from "@entities/profile/ui/loyatly-card/buildLayout"


const PersonalInfoContent = () => {

    const currentTotal = 61000; // тут подставляешь реальное значение

    const cardProps = buildLoyaltyCard(currentTotal);




    return (
        <>
            <section className="flex w-full justify-between">
                <article className="flex-col flex gap-8 md:w-1/2">
                    <PersonalInfoForm
                        defaultValues={{ fullName: "Иван", gender: "unknown", birthDate: new Date(2003, 1, 1) }}
                        onSubmit={(v: PersonalInfoValues) => console.log("save personal", v)}
                        onDeleteAccount={() => console.log("delete account")}
                    />

                    <article className="md:hidden">
                        <LoyaltyLevelCard {...cardProps} />
                    </article>

                    <ContactInfoForm
                        defaultValues={{ email: "example@gmail.com", phone: "" }}
                        requiresEmailVerify
                        onSubmitEmail={({ email }) => console.log("confirm email", email)}
                        onSubmitPhone={({ phone }) => console.log("change phone", phone)}
                    />
                </article>
                <article className="w-[35%] max-md:hidden">
                    <LoyaltyLevelCard {...cardProps} />
                </article>
            </section>
        </>
    )
}

export default PersonalInfoContent