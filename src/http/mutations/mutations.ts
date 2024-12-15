import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { LoginCredentials } from "../../types";
import { useGetSelf } from "../queries/queries";
import { useAuthStore } from "../../store";

export function useUserLogin() {
  const { setUser } = useAuthStore();
  const { data, refetch } = useGetSelf();
  return useMutation({
    mutationFn: async (data: LoginCredentials) => await login(data),
    onSuccess: () => {
      refetch();
      setUser(data?.data.result);
    },
  });
}
