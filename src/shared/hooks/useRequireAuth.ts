// src/shared/hooks/useRequireAuth.ts
import { useAppStore } from '@app/store';

type AuthIntent =
  | { type: 'checkout'; payload?: { cart_id?: number } }
  | { type: 'favorite'; payload: { uuid: string } };

export const useRequireAuth = () => {
  const { isAuth, setExclusive, setAuthIntent } = useAppStore();
  return (intent: AuthIntent, onAuthed: () => void) => {
    if (isAuth) {
      onAuthed();
      return;
    }
    // сохраняем намерение и открываем модалку ЛК/регистрации
    setAuthIntent(intent);
    setExclusive('lk', true);
  };
};
