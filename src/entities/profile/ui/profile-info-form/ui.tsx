"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@shadcn/button";
import { cn } from "@/shared/lib/utils";
import CustomInput from "@/feature/custom-input";
import { CalendarField } from "@/feature/formDate";
import { SelectField } from "@/feature/formSelect";

export type PersonalInfoValues = {
    fullName: string;
    birthDate?: Date;
    gender?: "male" | "female" | "other" | "unknown";
};

type PersonalInfoFormProps = {
    defaultValues?: Partial<PersonalInfoValues>;
    onSubmit: (values: PersonalInfoValues) => void | Promise<void>;
    onDeleteAccount?: () => void;
    className?: string;
};

const genderOptions = [
    { label: "Не выбран", value: "unknown" },
    { label: "Мужской", value: "male" },
    { label: "Женский", value: "female" },
    { label: "Другое", value: "other" },
];

export default function PersonalInfoForm({
    defaultValues,
    onSubmit,
    onDeleteAccount,
    className,
}: PersonalInfoFormProps) {
    const { control, handleSubmit } = useForm<PersonalInfoValues>({
        defaultValues: {
            fullName: "",
            gender: "unknown",
            ...defaultValues,
        },
        mode: "onTouched",
    });

    const submit: SubmitHandler<PersonalInfoValues> = (v) => onSubmit(v);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className={cn(
                "rounded-[20px] border border-secondary-gray bg-white p-5 md:p-6 flex flex-col gap-5 md:gap-4",
                className
            )}
        >
            <CustomInput<PersonalInfoValues>
                name="fullName"
                control={control}
                label="Ваше имя*"
                inputClassName="h-10"
                placeholder="Иван"
                className="h-10"
                containerClassName="flex flex-col"
                rules={{ required: "Укажите имя" }}
            />

            <CalendarField<PersonalInfoValues>
                name="birthDate"
                control={control}
                label="Дата рождения"
                placeholder="01.02.2003"
            />

            <SelectField<PersonalInfoValues>
                name="gender"
                control={control}
                label="Пол"
                options={genderOptions}
                placeholder="Не выбран"
            />

            <div className="mt-2 flex items-center justify-between gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    className="rounded-full bg-[#F4F4F5] hover:text-white hover:bg-red-500 hover:shadow-none!"
                    onClick={onDeleteAccount}
                >
                    Удалить аккаунт
                </Button>

                <Button type="submit" className="rounded-full text-white text-sm">
                    Сохранить
                </Button>
            </div>
        </form>
    );
}
