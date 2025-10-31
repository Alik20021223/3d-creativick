import { useState, useEffect, useCallback, useMemo } from 'react';
import { Controller, UseFormReturn, FieldValues, FieldPath } from 'react-hook-form'; // Используем типы UseFormReturn и FieldValues
import { Button } from '@shadcn/button';

// Предполагаемые импорты InputOTP из вашей кодовой базы
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@shared/shadcn/input-otp';

// --- КОНСТАНТЫ ДЛЯ ТАЙМЕРА ---
const RESEND_TIME_LIMIT = 5 * 60; // 5 минут в секундах
// ------------------------------

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
  form, // Принимаем форму из пропсов
}: CodeVerificationStepProps<TForm>) => {
  // 1. Состояние для таймера
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_LIMIT);
  const [isResendActive, setIsResendActive] = useState(false);

  const CODE_FIELD = 'code' as FieldPath<TForm>;

  // Используем переданные методы RHF
  const { handleSubmit, control, setError, reset } = form;

  // 2. Функция для запуска/сброса таймера
  const startTimer = useCallback(() => {
    setTimeLeft(RESEND_TIME_LIMIT);
    setIsResendActive(false);
    onResend(); // Вызываем внешний колбэк для отправки кода
  }, [onResend]);

  // Запускаем таймер и сбрасываем форму при открытии
  useEffect(() => {
    if (open) {
      // ИСПРАВЛЕНИЕ: Используем 'as any' для обхода ошибки типизации RHF
      reset({ code: '' } as TForm);
      startTimer();
    }
    // Если open переключается на false, timerId должен быть очищен через cleanup в useEffect[3]
  }, [open, startTimer, reset]);

  // 3. Эффект для обратного отсчета - ИСПРАВЛЕНИЕ БЕСКОНЕЧНОГО ЦИКЛА
  // Зависимости: [isResendActive] - запускается, когда становится false
  useEffect(() => {
    if (open && timeLeft > 0 && !isResendActive) {
      const timerId = setInterval(() => {
        // Используем колбэк-форму для setTimeLeft.
        // Это позволяет удалить 'timeLeft' из массива зависимостей.
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            return 0; // Возвращаем 0, но clearInterval вызывается в cleanup/следующем цикле
          }
          return prevTime - 1;
        });
      }, 1000);

      // Логика очистки, которая всегда гарантирует, что таймер остановлен,
      // когда isResendActive становится true или open становится false.
      return () => clearInterval(timerId);
    }

    // Если timeLeft достигает 0, активируем кнопку повторной отправки
    if (timeLeft === 0 && !isResendActive) {
      setIsResendActive(true);
    }
  }, [open, isResendActive, timeLeft]); // Добавляем timeLeft сюда, чтобы ловить его изменение до 0

  // 4. Обработка ошибки
  useEffect(() => {
    if (errorMessage) {
      setError(CODE_FIELD, { type: 'manual', message: errorMessage });
    }
  }, [errorMessage, setError, CODE_FIELD]);

  // 5. Форматирование времени (MM:SS)
  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

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
    </div>
    // Примечание: Кнопка "Отправить" должна быть вставлена родительским компонентом,
    // который обернул этот компонент в <FormProvider> и имеет доступ к form.
  );
};

export default CodeVerificationStep;
