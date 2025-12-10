import { useEffect, useMemo } from 'react';
import { Controller, UseFormReturn, FieldValues, FieldPath } from 'react-hook-form';
import { Button } from '@shadcn/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/shadcn/input-otp';
import { useResendTimer } from '../../hooks/useResendTimer';
import { formatTime } from '../../utils/timer';

// --- ИНТЕРФЕЙС КОМПОНЕНТА ---

// Используем Generic TForm, который ДОЛЖЕН иметь поле 'code' типа string
interface CodeVerificationStepProps<TForm extends FieldValues> {
  /** Текст описания над полем ввода */
  description: string;
  /** Длина кода (по умолчанию 4) */
  maxLength?: number;
  /** Колбэк при успешной отправке кода */
  onVerify: (data: { code: string }) => void;
  /** Колбэк при повторной отправке кода (запускает таймер) */
  onResend: () => void;
  /** Сообщение об ошибке (если код неверный) */
  errorMessage?: string;
  /** Сброс состояния открытого модального окна */
  open: boolean;

  /**
   * Объект useForm<TForm> из родительского компонента.
   * TForm должен быть типом, включающим code: string.
   */
  form: UseFormReturn<TForm>;
}

/**
 * Универсальный компонент для ввода SMS-кода с таймером и кнопкой повторной отправки.
 * Контролируется внешним объектом useForm<TForm>
 */
const CodeVerificationStep = <TForm extends FieldValues & { code: string }>({
  description,
  maxLength = 4,
  onVerify,
  onResend,
  errorMessage,
  open,
  form,
}: CodeVerificationStepProps<TForm>) => {
  const CODE_FIELD = 'code' as FieldPath<TForm>;

  const { handleSubmit, control, setError, reset } = form;

  const { timeLeft, isResendActive, startTimer } = useResendTimer(open, onResend);

  // Сбрасываем форму при открытии
  useEffect(() => {
    if (open) {
      reset({ code: '' } as TForm);
    }
  }, [open, reset]);

  // Обработка ошибки
  useEffect(() => {
    if (errorMessage) {
      setError(CODE_FIELD, { type: 'manual', message: errorMessage });
    }
  }, [errorMessage, setError, CODE_FIELD]);

  // 6. Функция, которая вызывает внешний onVerify, передавая код
  const handleFormSubmit = handleSubmit((data: TForm) => {
    if (data.code && data.code.length === maxLength) {
      // Передаем только поле code в объекте, как определено в пропсах
      onVerify({ code: data.code });
    }
  });

  // Рендер InputOTPSlot динамически
  const renderSlots = useMemo(() => {
    const slots = [];
    for (let i = 0; i < maxLength; i++) {
      slots.push(<InputOTPSlot key={i} index={i} />);
    }
    return slots;
  }, [maxLength]);

  return (
    <div className='flex flex-col items-center p-4 pt-0'>
      <p className='mb-6 text-center text-base text-gray-700'>{description}</p>

      {/* Используем handleFormSubmit, который привязан к внешнему объекту формы */}
      <form onSubmit={handleFormSubmit} className='mb-6 flex w-full justify-center'>
        <Controller
          // Используем control из пропсов
          control={control}
          name={CODE_FIELD} // 'code' теперь всегда валидное имя
          render={({ field, fieldState }) => (
            <div className='flex w-full flex-col items-center'>
              <InputOTP maxLength={maxLength} {...field}>
                <InputOTPGroup className='gap-4'>{renderSlots}</InputOTPGroup>
              </InputOTP>
              {fieldState.error && (
                <p className='mt-2 text-xs text-red-500'>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </form>

      {/* Блок таймера / повторной отправки */}
      {isResendActive ? (
        <Button
          variant='link'
          onClick={startTimer}
          className='h-auto p-0 font-medium text-blue-600 hover:underline'
        >
          Отправить код повторно
        </Button>
      ) : (
        <p className='text-sm text-gray-500'>
          Отправить код повторно через:{' '}
          <span className='font-semibold'>{formatTime(timeLeft)}</span>
        </p>
      )}
      {/* Примечание: Кнопка "Отправить" должна быть вставлена родительским компонентом,
    который обернул этот компонент в <FormProvider> и имеет доступ к form. */}
    </div>
  );
};

export default CodeVerificationStep;
