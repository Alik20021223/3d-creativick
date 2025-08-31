import { lazy } from "react";
import { MAIN_URL } from "@entities/main/constant";

const MainPage = lazy(() => import("@pages/main-page"));

export const MAIN_ROUTES = [
  {
    path: MAIN_URL.PREFIX,
    element: <MainPage />,
  },
];
