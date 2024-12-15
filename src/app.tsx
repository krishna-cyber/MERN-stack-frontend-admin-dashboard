import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetSelf } from "./http/queries/queries";
import { useAuthStore } from "./store";

const App = () => {
  const { data, isLoading } = useGetSelf();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (data) {
      setUser(data?.data.result);
    }
  }, [data, setUser]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default App;
