"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@shadcn/button";

import { cn } from "@/shared/lib/utils";
import CustomInput from "@/feature/custom-input";

export type ContactInfoValues = {
    email: string;
    phone: string;
};

type ContactInfoFormProps = {
    defaultValues?: Partial<ContactInfoValues>;
    requiresEmailVerify?: boolean;
    onSubmitEmail?: (values: Pick<ContactInfoValues, "email">) => void | Promise<void>;
    onSubmitPhone?: (values: Pick<ContactInfoValues, "phone">) => void | Promise<void>;
    className?: string;
    title?: string;
    description?: string;
};

export default function ContactInfoForm({
    defaultValues,
    requiresEmailVerify = false,
    onSubmitEmail,
    onSubmitPhone,
    className,
    title = "Контактная информация",
    description = "В своём стремлении повысить качество жизни…",
}: ContactInfoFormProps) {
    const emailForm = useForm<ContactInfoValues>({
        defaultValues: { email: "", phone: "", ...defaultValues },
        mode: "onTouched",
    });
    const phoneForm = emailForm; // один стор для синхронизации значений

    const submitEmail: SubmitHandler<ContactInfoValues> = (v) =>
        onSubmitEmail?.({ email: v.email });

    const submitPhone: SubmitHandler<ContactInfoValues> = (v) =>
        onSubmitPhone?.({ phone: v.phone });

    return (
        <section
            className={cn(
                "rounded-[20px] border border-secondary-gray bg-white p-5 md:p-6 flex flex-col gap-5 md:gap-6",
                className
            )}
        >
            <header>
                <h3 className="text-xl md:text-2xl font-bold text-dark-blue">{title}</h3>
                {description && (
                    <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
                )}
            </header>

            {/* Email + кнопка подтверждения */}
            <form
                onSubmit={emailForm.handleSubmit(submitEmail)}
                className="flex items-end gap-3"
            >
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Email*</label>
                        {requiresEmailVerify && (
                            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700">
                                Требует подтверждения
                            </span>
                        )}
                    </div>

                    <CustomInput<ContactInfoValues>
                        name="email"
                        control={emailForm.control}
                        placeholder="example@gmail.com"
                        containerClassName="mt-2"
                        className="h-10"
                        rules={{
                            required: "Укажите email",
                            pattern: { value: /\S+@\S+\.\S+/, message: "Неверный email" },
                        }}
                    />
                </div>

                <Button type="submit" variant="secondary" className="rounded-full h-10 px-6 py-0 text-lg">
                    Подтвердить
                </Button>
            </form>

            {/* Телефон + кнопка изменить */}
            <form
                onSubmit={phoneForm.handleSubmit(submitPhone)}
                className="flex items-end gap-3"
            >
                <div className="flex-1">
                    <label className="text-sm font-medium">Номер телефона</label>
                    <CustomInput<ContactInfoValues>
                        name="phone"
                        control={phoneForm.control}
                        placeholder="+7 999 123-45-67"
                        containerClassName="mt-2"
                        className="h-10"
                        rules={{
                            required: "Укажите номер",
                            minLength: { value: 10, message: "Слишком короткий номер" },
                        }}
                    />
                </div>

                <Button type="submit" className="rounded-full h-10 px-6 py-0 text-lg text-white">
                    Изменить
                </Button>
            </form>
        </section>
    );
}
