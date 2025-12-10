import { useMemo, useState, useEffect } from 'react';
import { useGetInfoProfile } from '@entities/profile/hooks/getInfoProfile';
import PersonalInfoForm from '@entities/profile/ui/profile-info-form';
import ContactInfoForm from '@entities/profile/ui/contact-info-form';
import LoyaltyLevelCard from '@entities/profile/ui/loyatly-card';
import { buildLoyaltyCard } from '@entities/profile/ui/loyatly-card/buildLayout';
import { Button } from '@shared/shadcn/button';
import { useAppStore } from '@app/store';
import type { PersonalInfoValues } from '@entities/profile/ui/profile-info-form/ui';
import { useUpdateInfoProfile } from '@entities/profile/hooks/updateInfoProfile';
import { formatDateYYYYMMDD } from '@utils/constant';
import { CheckCircle2 } from 'lucide-react';
import { ContactInfoValues } from '@entities/profile/ui/contact-info-form/ui';
import { useDeleteAccount } from '@/entities/profile/hooks/deleteAccount';
import ModalConfirmDeleteAccount from '@/entities/modals/ui/modal-confirm-delete-account';
import { useModalStore } from '@/entities/modals/store';
import { getEmailErrors } from '@shared/types/api-error';

const PersonalInfoContent = () => {
  const { data: user } = useGetInfoProfile();
  const cardProps = buildLoyaltyCard(user?.total_spent ?? 0);

  const { confirm_delete_account, openModal, closeModal } = useModalStore();

  const { mutate, isPending } = useUpdateInfoProfile();
  const { setIsAuth } = useAppStore();

  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error' | 'email_taken'>(
    'idle',
  );

  useEffect(() => {
    if (saveStatus === 'idle') return;
    const id = setTimeout(() => setSaveStatus('idle'), 3000);
    return () => clearTimeout(id);
  }, [saveStatus]);

  const personalKey = user ? `pi-${user.uuid}-${user.id ?? ''}` : 'pi-loading';
  const contactKey = user ? `ci-${user.uuid}-${user.id ?? ''}` : 'ci-loading';

  const personalDefaults: PersonalInfoValues = useMemo(
    () => ({
      fullName: user?.firstname ?? '',
      gender: (user?.gender as 'male' | 'female') ?? 'unknown',
      birthDate: user?.birthday ? new Date(user.birthday) : undefined,
    }),
    [user],
  );

  const contactDefaults: Partial<ContactInfoValues> = useMemo(
    () => ({
      email: user?.email ?? '',
    }),
    [user],
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth?.(false);
  };

  const handleSavePersonal = (v: PersonalInfoValues) => {
    const firstname = v.fullName?.trim() || undefined;
    const gender = v.gender === 'unknown' ? undefined : v.gender;
    const birthday = formatDateYYYYMMDD(v.birthDate ?? undefined);
    const email = user?.email ?? undefined;

    const payload = {
      firstname,
      gender,
      birthday,
      email,
    } as const;

    mutate(payload, {
      onSuccess: () => setSaveStatus('success'),
      onError: (e) => {
        console.error('Ошибка обновления профиля', e);
        setSaveStatus('error');
      },
    });
  };

  // сохранение email
  // сохранение email
  const handleSaveContact = (v: Pick<ContactInfoValues, 'email'>) => {
    const email = v.email?.trim() || undefined;

    const firstname = user?.firstname ?? undefined;
    const gender = user?.gender ? (user.gender as 'male' | 'female') : undefined;

    const birthday = user?.birthday ? formatDateYYYYMMDD(new Date(user.birthday)) : undefined;

    const payload = {
      firstname,
      gender,
      birthday,
      email,
    } as const;

    mutate(payload, {
      onSuccess: () => setSaveStatus('success'),
      onError: (e) => {
        console.error('Ошибка обновления email', e);

        const emailErrors = getEmailErrors(e);

        if (emailErrors && emailErrors.length > 0) {
          // конкретный кейс: почта уже существует
          setSaveStatus('email_taken');
        } else {
          setSaveStatus('error');
        }
      },
    });
  };

  const { mutate: deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        localStorage.removeItem('token');
        setIsAuth?.(false);
      },
      onError: (e) => {
        console.error('Ошибка удаления аккаунта', e);
      },
    });
  };

  return (
    <>
      <section className='flex w-full justify-between'>
        <article className='flex flex-col gap-8 md:w-1/2'>
          <PersonalInfoForm
            key={personalKey}
            defaultValues={personalDefaults}
            onSubmit={handleSavePersonal}
            onDeleteAccount={() => openModal('confirm_delete_account')}
            submitDisabled={isPending}
          />

          {saveStatus === 'success' && (
            <div className='-mt-4 flex items-center gap-2 text-sm text-emerald-600'>
              <CheckCircle2 className='h-4 w-4' />
              <span>Данные успешно сохранены</span>
            </div>
          )}

          {saveStatus === 'email_taken' && (
            <div className='-mt-4 flex items-center gap-2 text-sm text-red-500'>
              <CheckCircle2 className='h-4 w-4' />
              <span>Такая почта уже зарегистрирована. Укажите другой e-mail.</span>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className='-mt-4 flex items-center gap-2 text-sm text-red-500'>
              <CheckCircle2 className='h-4 w-4' />
              <span>Не удалось сохранить данные. Попробуйте ещё раз.</span>
            </div>
          )}

          <article className='md:hidden'>
            <LoyaltyLevelCard {...cardProps} />
          </article>

          <ContactInfoForm
            key={contactKey}
            defaultValues={contactDefaults}
            onSubmitEmail={handleSaveContact}
            submitDisabled={isPending}
          />

          <div className='flex w-full md:justify-end'>
            <Button
              variant='link'
              onClick={handleLogout}
              className='mt-4 w-full bg-red-500 text-white hover:bg-red-600 hover:shadow-none md:w-fit'
            >
              Выйти из аккаунта
            </Button>
          </div>
        </article>

        <article className='w-[35%] max-md:hidden'>
          <LoyaltyLevelCard {...cardProps} />
        </article>
      </section>

      <ModalConfirmDeleteAccount
        open={confirm_delete_account}
        setOpen={() => closeModal('confirm_delete_account')}
        handleDelete={handleDeleteAccount}
      />
    </>
  );
};

export default PersonalInfoContent;
