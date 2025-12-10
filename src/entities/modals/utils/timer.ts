/**
 * Константы и утилиты для работы с таймером повторной отправки кода
 */

export const RESEND_TIME_LIMIT = 5 * 60; // 5 минут в секундах

/**
 * Форматирует секунды в формат MM:SS
 */
export const formatTime = (totalSeconds: number): string => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
