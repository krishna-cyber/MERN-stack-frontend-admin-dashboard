import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { self } from "./http/api";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: self,
    retry: false,
  });
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (data) {
      setUser(data?.data.result);
    }
  }, [data, setUser]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default App;
