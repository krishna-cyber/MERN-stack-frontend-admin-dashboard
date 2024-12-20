import { createBrowserRouter } from "react-router-dom";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./layouts/Dashboard";
import App from "./app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
