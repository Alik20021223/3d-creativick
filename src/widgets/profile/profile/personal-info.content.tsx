// src/entities/profile/ui/personal-info-content/index.tsx
import { useMemo } from 'react';
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

const PersonalInfoContent = () => {
  const currentTotal = 61000;
  const cardProps = buildLoyaltyCard(currentTotal);

  const { data: user } = useGetInfoProfile(); // <- данные юзера приходят позже
  const { mutate, isPending } = useUpdateInfoProfile();
  const { setIsAuth } = useAppStore();

  // Ключи чтобы форснуть перерисовку форм после прихода данных (если формы сами не делают reset)
  const personalKey = user ? `pi-${user.uuid}-${user.id ?? ''}` : 'pi-loading';
  const contactKey = user ? `ci-${user.uuid}-${user.id ?? ''}` : 'ci-loading';

  const personalDefaults: PersonalInfoValues = useMemo(
    () => ({
      fullName: user?.firstname ?? '',
      gender: (user?.gender as 'male' | 'female') ?? 'unknown',
      // если в форме можно null — лучше null чем undefined
      birthDate: user?.birthday ? new Date(user.birthday) : undefined,
    }),
    [user],
  );

  const contactDefaults = useMemo(
    () => ({
      email: user?.email ?? '',
    }),
    [user],
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth?.(false);
  };

  // === handlers ===

  // Сохранение персональных данных
  const handleSavePersonal = (v: PersonalInfoValues) => {
    const payload = {
      firstname: v.fullName?.trim() || undefined,
      gender: v.gender === 'unknown' ? undefined : v.gender,
      birthday: formatDateYYYYMMDD(v.birthDate ?? undefined),
    } as const;

    mutate(payload, {
      onSuccess: () => {
        // здесь можно показать toast
        console.log('Профиль обновлён');
      },
      onError: (e) => {
        console.error('Ошибка обновления профиля', e);
      },
    });
  };

  return (
    <section className='flex w-full justify-between'>
      <article className='flex flex-col gap-8 md:w-1/2'>
        <PersonalInfoForm
          key={personalKey}
          defaultValues={personalDefaults}
          onSubmit={handleSavePersonal}
          onDeleteAccount={() => console.log('delete account')}
          submitDisabled={isPending} // если у формы есть такой проп
        />

        <article className='md:hidden'>
          <LoyaltyLevelCard {...cardProps} />
        </article>

        <ContactInfoForm key={contactKey} defaultValues={contactDefaults} />

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
  );
};

export default PersonalInfoContent;
