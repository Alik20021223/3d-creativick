// src/app/router/MaintenanceGate.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TechPage from '@pages/tech-page';
// (опц.) из стора
// import { useAppStore } from '@app/store';

type Props = {
  enabled?: boolean; // можно пробрасывать пропом при создании роутера
};

const MaintenanceGate: React.FC<Props> = ({ enabled }) => {
  // приоритет: проп → ENV → (опц.) стор
  const envFlag = import.meta.env.VITE_MAINTENANCE === 'true';
  // const storeFlag = useAppStore((s) => s.maintenanceEnabled);

  const isOn = enabled ?? envFlag; /* ?? storeFlag */

  if (isOn) {
    // показываем тех-страницу вместо любого контента
    return <TechPage />;
  }
  // пропускаем к детям (Layouts/страницы)
  return <Outlet />;
};

export default MaintenanceGate;
