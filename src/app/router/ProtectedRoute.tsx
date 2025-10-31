// src/app/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'; // 👈 импорт стора, где есть isAuth
import { useAppStore } from '../store';

export default function ProtectedRoute() {
  const { isAuth } = useAppStore(); // или useAppStore((s) => s.isAuth)
  const token = localStorage.getItem('token');

  if (!isAuth || !token) {
    // ❌ Если не авторизован — редирект на главную
    return <Navigate to='/' replace />;
  }

  // ✅ Если авторизован — показываем контент маршрута
  return <Outlet />;
}
