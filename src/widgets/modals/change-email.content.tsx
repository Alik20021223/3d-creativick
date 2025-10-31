import ModalChangeNumberEmailCode from '@entities/modals/ui/modal-change-email-code';
import { useModalStore } from '@entities/modals/store';
import ModalSuccessAuth from '@entities/modals/ui/modal-success-auth';
import ModalChangeEmailForm from '@entities/modals/ui/modal-change-email-form/ui';

const ChangeEmailContent = () => {
  const { email_otp, change_email_form, change_email_success } = useModalStore();

  return (
    <>
      <ModalChangeNumberEmailCode open={email_otp} />
      <ModalChangeEmailForm open={change_email_form} />
      <ModalSuccessAuth open={change_email_success} />
    </>
  );
};

export default ChangeEmailContent;
