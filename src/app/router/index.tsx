import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@app/layout/defaultLayout";
import { MAIN_ROUTES } from "@entities/main/router";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: MAIN_ROUTES,
  },
]);
