import { createBrowserRouter } from "react-router-dom";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./layouts/Dashboard";
import App from "./app";
import Homepage from "./pages/Homepage";
import Users from "./pages/users/Users";
import Resturants from "./pages/resturants/Resturants";
import Products from "./pages/products/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/tenants",
            element: <Resturants />,
          },
          {
            path: "/products",
            element: <Products />,
          },
        ],
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
