'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import { cn } from '@shared/lib/utils';
import CustomInput from '@feature/custom-input';

export type ContactInfoValues = {
  email: string;
};

type ContactInfoFormProps = {
  defaultValues?: Partial<ContactInfoValues>;
  onSubmitEmail?: (values: Pick<ContactInfoValues, 'email'>) => void | Promise<void>;
  className?: string;
  title?: string;
};

export default function ContactInfoForm({
  defaultValues,
  onSubmitEmail,
  className,
  title = 'Контактная информация',
}: ContactInfoFormProps) {
  const emailForm = useForm<ContactInfoValues>({
    defaultValues: { email: '', ...defaultValues },
    mode: 'onTouched',
  });

  const submitEmail: SubmitHandler<ContactInfoValues> = (v) => onSubmitEmail?.({ email: v.email });

  return (
    <section
      className={cn(
        'border-secondary-gray flex flex-col gap-5 rounded-[20px] border bg-white p-5 md:gap-6 md:p-6',
        className,
      )}
    >
      <header>
        <h3 className='text-dark-blue text-xl font-bold md:text-2xl'>{title}</h3>
      </header>

      {/* Email + кнопка подтверждения */}
      <form onSubmit={emailForm.handleSubmit(submitEmail)} className='flex items-end gap-3'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <label className='text-sm font-medium'>Email*</label>
          </div>

          <CustomInput<ContactInfoValues>
            name='email'
            control={emailForm.control}
            placeholder='example@gmail.com'
            containerClassName='mt-2'
            className='h-10'
            clearable={false}
            disabled={true}
          />
        </div>
      </form>
    </section>
  );
}
