import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard component
      <Outlet />
    </div>
  );
};

export default Dashboard;
