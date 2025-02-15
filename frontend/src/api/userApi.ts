import { queryOptions } from "@tanstack/react-query";
import { api } from "./index";

export async function getCurrentUser() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

export const getUserQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
