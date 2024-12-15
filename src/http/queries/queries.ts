import { useQuery } from "@tanstack/react-query";
import { self } from "../api";

function useGetSelf() {
  return useQuery({
    queryKey: ["self"],
    queryFn: self,
  });
}

export { useGetSelf };
