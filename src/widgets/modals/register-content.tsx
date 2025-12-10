import ModalRegisterForm from '@entities/modals/ui/modal-register-form';
import { useModalStore } from '@entities/modals/store';
import ModalRegisterProfileForm from '@entities/modals/ui/modal-register-profile-form';
import ModalSuccessAuth from '@entities/modals/ui/modal-success-auth';

const RegisterContent = () => {
  const { register_otp, register_form, register_success } = useModalStore();

  return (
    <>
      <ModalRegisterForm open={register_otp} />
      <ModalRegisterProfileForm open={register_form} />
      <ModalSuccessAuth
        open={register_success}
        title='Регистрация прошла успешно!'
        modalKey='register_success'
      />
    </>
  );
};

export default RegisterContent;
