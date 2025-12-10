import { useState, useEffect, useCallback } from 'react';
import { RESEND_TIME_LIMIT } from '../utils/timer';

/**
 * Хук для управления таймером повторной отправки кода
 * @param open - Открыто ли модальное окно
 * @param onResend - Колбэк при повторной отправке кода
 */
export const useResendTimer = (open: boolean, onResend?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_LIMIT);
  const [isResendActive, setIsResendActive] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(RESEND_TIME_LIMIT);
    setIsResendActive(false);
    onResend?.();
  }, [onResend]);

  // Запускаем таймер при открытии модального окна
  useEffect(() => {
    if (open) {
      startTimer();
    }
  }, [open, startTimer]);

  // Эффект для обратного отсчета
  useEffect(() => {
    if (timeLeft > 0 && open && !isResendActive) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            setIsResendActive(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, open, isResendActive]);

  return {
    timeLeft,
    isResendActive,
    startTimer,
  };
};
