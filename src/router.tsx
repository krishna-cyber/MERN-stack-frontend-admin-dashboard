import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
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
        path: "",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
        ],
      },

      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);
