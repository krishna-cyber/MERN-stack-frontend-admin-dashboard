import { useMutation } from "@tanstack/react-query";
import { login, logout } from "../api";
import { LoginCredentials } from "../../types";
import { useGetSelf } from "../queries/queries";
import { useAuthStore } from "../../store";

export function useUserLogin() {
  const { setUser, logOut } = useAuthStore();
  const { data, refetch } = useGetSelf();
  return useMutation({
    mutationFn: async (data: LoginCredentials) => await login(data),
    onSuccess: async () => {
      refetch();

      if (
        data?.data.result.role == "admin" ||
        data?.data.result.role == "manager"
      ) {
        setUser(data?.data.result);
      } else {
        await logout();
        logOut();
        alert("You are not authorized to access this page");
      }
    },
  });
}
