/**
 * Форматирует номер телефона в формат +7 (xxx) ххх-хх-хх
 * @param value - значение для форматирования
 * @returns отформатированная строка
 */
export function formatPhoneMask(value: string): string {
  // Удаляем все нецифровые символы
  const numbers = value.replace(/\D/g, '');

  // Если пусто, возвращаем пустую строку
  if (!numbers) return '';

  // Если начинается не с 7 или 8, добавляем 7
  let phone = numbers;
  if (phone.length > 0 && phone[0] !== '7' && phone[0] !== '8') {
    phone = '7' + phone;
  }

  // Если начинается с 8, заменяем на 7
  if (phone[0] === '8') {
    phone = '7' + phone.slice(1);
  }

  // Ограничиваем до 11 цифр (7 + 10 цифр)
  phone = phone.slice(0, 11);

  // Форматируем по маске +7 (xxx) ххх-хх-хх
  if (phone.length === 0) return '';
  if (phone.length <= 1) return `+${phone}`;
  if (phone.length <= 4) return `+${phone.slice(0, 1)} (${phone.slice(1)}`;
  if (phone.length <= 7) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4)}`;
  if (phone.length <= 9) {
    return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
  }
  return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
}

/**
 * Обработчик изменения значения для телефона
 * @param e - событие изменения input
 * @param onChange - функция onChange из react-hook-form
 * @param inputRef - ссылка на input элемент для управления позицией курсора
 */
export function handlePhoneChange(
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
  inputRef: React.RefObject<HTMLInputElement | null>,
) {
  const input = e.target;
  const cursorPosition = input.selectionStart || 0;
  const oldValue = input.value;
  const newValue = formatPhoneMask(input.value);

  onChange(newValue);

  // Восстанавливаем позицию курсора
  requestAnimationFrame(() => {
    if (inputRef.current) {
      // Считаем количество цифр до позиции курсора в старом значении
      const digitsBeforeCursor = oldValue.slice(0, cursorPosition).replace(/\D/g, '').length;
      
      // Находим позицию в новом значении с таким же количеством цифр
      let digitCount = 0;
      let newCursorPosition = newValue.length;
      
      for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
          digitCount++;
          if (digitCount === digitsBeforeCursor) {
            // Ставим курсор после этой цифры
            newCursorPosition = i + 1;
            break;
          }
        }
      }

      inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  });
}

