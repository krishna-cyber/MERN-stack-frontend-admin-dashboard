import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Homepage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <>
      <div>
        This is homepage
        <Outlet />
      </div>
    </>
  );
};

export default Homepage;
