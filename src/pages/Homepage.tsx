import { Typography } from "antd";
import { useAuthStore } from "../store";
const { Title } = Typography;

const Homepage = () => {
  const { user } = useAuthStore();
  return (
    <>
      <div>
        <Title level={3}>Welcome back , {user?.firstName} 🙏</Title>
      </div>
    </>
  );
};

export default Homepage;
