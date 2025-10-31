import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shadcn/button'; // Используем импорт из shadcn, как в вашем коде
import ModalLayout from '@app/layout/modalLayout'; // Используем ваш ModalLayout // Используем ваш Input
import { GENDER_OPTIONS, ModalRegisterFormType, ModalRegisterSchema } from './validation';
import LabeledCheckbox from '@feature/custom-checkbox';
import { SelectField } from '@feature/formSelect';
import { CalendarField } from '@feature/formDate';
import CustomInput from '@feature/custom-input';
import { useModalStore } from '../../store';
import { useRegisterForm } from '../../hooks/sendRegisterForm';
import { formattedBirthDate } from '@utils/constant';
import { useAppStore } from '@app/store';

interface ModalRegisterProfileProps {
  open: boolean;
}

const ModalRegisterProfileForm: React.FC<ModalRegisterProfileProps> = ({ open }) => {
  const { closeModal, email, openModal } = useModalStore();
  const { setIsAuth } = useAppStore();

  const { mutate } = useRegisterForm();

  const form = useForm<ModalRegisterFormType>({
    defaultValues: {
      name: '',
      birthDate: null,
      gender: undefined,
      policyAgreement: false,
      dataProcessing: false,
      newsletter: true, // По умолчанию включено
    },
    resolver: zodResolver(ModalRegisterSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: ModalRegisterFormType) => {
    const formattedDate = formattedBirthDate(data.birthDate || new Date());

    mutate(
      {
        email: email,
        firstname: data.name,
        birthday: formattedDate,
        gender: data.gender as 'male' | 'female',
      },
      {
        onSuccess: (res) => {
          form.reset();
          localStorage.setItem('token', res.data.token);

          setIsAuth?.(true);
          openModal('register_success');
          closeModal('register_form');
        },
        onError: (e) => {
          console.error('Login error:', e);
        },
      },
    );
  };

  React.useEffect(() => {
    form.setValue('birthDate', null, { shouldValidate: false });
  }, [form]);

  return (
    <FormProvider {...form}>
      <ModalLayout
        open={open}
        onOpenChange={() => closeModal('register_form')}
        headerClassName='text-center'
        className='max-w-md!'
        title='Регистрация'
        footer={
          <div className='flex w-full gap-3'>
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
              className='h-14 w-full text-lg text-white shadow-xl'
            >
              Отправить
            </Button>
          </div>
        }
      >
        <div className='flex flex-col pt-0'>
          <p className='mb-6 text-center text-base text-gray-700'>
            Заполните необходимые поля. Это займёт всего минуту.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            {/* Ваше имя */}
            <CustomInput<ModalRegisterFormType>
              name='name'
              placeholder='Ваше имя'
              className='h-14 rounded-[40px]'
            />

            <div className='flex h-full gap-4'>
              {/* Дата рождения */}
              <div className='flex-1'>
                <CalendarField<ModalRegisterFormType>
                  name='birthDate'
                  label='Дата рождения'
                  control={form.control}
                  placeholder='ДД.ММ.ГГГГ'
                  className='h-14 rounded-[40px]'
                />
              </div>

              {/* Пол */}
              <div className='flex-1'>
                <SelectField<ModalRegisterFormType>
                  name='gender'
                  control={form.control}
                  placeholder='Выбрать'
                  options={GENDER_OPTIONS}
                  label='Пол'
                  className='pointer-events-auto h-14! w-full rounded-[40px]'
                />
              </div>
            </div>

            <div className='space-y-2 pt-2'>
              <LabeledCheckbox
                id='policyAgreement'
                name='policyAgreement'
                checked={form.watch('policyAgreement')}
                onCheckedChange={(checked) =>
                  form.setValue('policyAgreement', !!checked, { shouldValidate: true })
                }
                label='Я ознакомлен(а) с политикой конфиденциальности'
                error={form.formState.errors.policyAgreement?.message}
                className='data-[state=checked]:bg-primary-active'
              />
              <LabeledCheckbox
                id='dataProcessing'
                name='dataProcessing'
                checked={form.watch('dataProcessing')}
                onCheckedChange={(checked) =>
                  form.setValue('dataProcessing', !!checked, { shouldValidate: true })
                }
                label='Даю согласие на обработку персональных данных'
                error={form.formState.errors.dataProcessing?.message}
                className='data-[state=checked]:bg-primary-active'
              />
              <LabeledCheckbox
                id='newsletter'
                name='newsletter'
                checked={form.watch('newsletter')}
                onCheckedChange={(checked) => form.setValue('newsletter', !!checked)}
                label='Согласен на рассылку рекламных материалов'
                defaultChecked={true}
                // Убираем error, так как это опциональное поле
                className='data-[state=checked]:bg-primary-active'
              />
            </div>
          </form>
        </div>
      </ModalLayout>
    </FormProvider>
  );
};

export default ModalRegisterProfileForm;
