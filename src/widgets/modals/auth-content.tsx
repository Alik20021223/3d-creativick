import ModalAuthForm from '@entities/modals/ui/modal-auth-form';
import { useModalStore } from '@entities/modals/store';
import ModalSuccessAuth from '@entities/modals/ui/modal-success-auth';

const AuthContent = () => {
  const { auth_otp, success_auth_otp } = useModalStore();

  return (
    <>
      <ModalAuthForm open={auth_otp} />
      <ModalSuccessAuth open={success_auth_otp} />
    </>
  );
};

export default AuthContent;
