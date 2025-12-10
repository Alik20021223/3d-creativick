import { cn } from '@shared/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * Переиспользуемый компонент для отображения сообщений об ошибках
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        'w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600',
        className,
      )}
    >
      {message}
    </div>
  );
};
