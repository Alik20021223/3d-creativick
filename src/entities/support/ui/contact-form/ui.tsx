import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button } from "@shadcn/button";
import CustomInput from "@feature/custom-input";
import CustomTextArea from "@feature/custom-textarea";
import LabeledCheckbox from "@feature/custom-checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDefaultValues, ContactFormFields, contactSchema } from "./validation";

const ContactForm = () => {
    const form = useForm<ContactFormFields>({
        defaultValues: contactDefaultValues,
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
        control,
    } = form;

    const onSubmit = async (data: ContactFormFields) => {
        // TODO: интеграция с API
        console.log("submit form:", data);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col space-y-5 rounded-[22px] bg-secondary-white p-10"
            >
                {/* Две колонки */}
                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <CustomInput<ContactFormFields>
                        name="name"
                        label="Ваше имя*"
                        placeholder="Ваше имя"
                        clearable
                        rules={{ required: "Укажите имя" }}
                        className="h-12 rounded-[40px]"
                    />

                    <CustomInput<ContactFormFields>
                        name="phone"
                        label="Номер телефона"
                        placeholder="+7 999 888 77 66"
                        className="h-12 rounded-[40px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <CustomInput<ContactFormFields>
                        name="email"
                        label="Email*"
                        placeholder="example@gmail.com"
                        rules={{
                            required: "Укажите email",
                            pattern: { value: /\S+@\S+\.\S+/, message: "Некорректный email" },
                        }}
                        className="h-12 rounded-[40px]"
                    />

                    <CustomInput<ContactFormFields>
                        name="company"
                        label="Компания"
                        placeholder=""
                        className="h-12 rounded-[40px]"
                    />
                </div>

                <CustomTextArea<ContactFormFields>
                    name="message"
                    label="Сообщение"
                    placeholder=""
                    autoResize
                    className="min-h-[140px] rounded-[22px]"
                />

                {/* Чекбоксы — заменены на LabeledCheckbox + Controller */}
                <div className="space-y-3">
                    <Controller
                        control={control}
                        name="agreePrivacy"
                        rules={{ required: "Обязательное поле" }}
                        render={({ field, fieldState }) => (
                            <LabeledCheckbox
                                checked={field.value}
                                onCheckedChange={(v) => field.onChange(Boolean(v))}
                                error={fieldState.error?.message}
                                label={
                                    <span className="text-sm text-secondary-text">
                                        Я ознакомлен(а) с политикой конфиденциальности
                                    </span>
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="agreePersonal"
                        rules={{ required: "Обязательное поле" }}
                        render={({ field, fieldState }) => (
                            <LabeledCheckbox
                                checked={field.value}
                                onCheckedChange={(v) => field.onChange(Boolean(v))}
                                error={fieldState.error?.message}
                                label={
                                    <span className="text-sm text-secondary-text">
                                        Даю согласие на обработку персональных данных
                                    </span>
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="agreeMarketing"
                        render={({ field }) => (
                            <LabeledCheckbox
                                checked={field.value}
                                onCheckedChange={(v) => field.onChange(Boolean(v))}
                                label={
                                    <span className="text-sm text-secondary-text">
                                        Согласен на рассылку рекламных материалов
                                    </span>
                                }
                            />
                        )}
                    />
                </div>

                {/* Кнопка отправки справа */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="h-12 rounded-full px-8 text-white"
                    >
                        Отправить
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default ContactForm;
