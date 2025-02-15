import { queryOptions } from "@tanstack/react-query";
import { api } from "./index";
import { CreateExpense } from "../../../server/sharedTypes";

export async function getAllExpenses() {
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

export async function createExpense({ value }: { value: CreateExpense }) {
  const response = await api.expenses.$post({ json: value });
  if (!response.ok) {
    throw new Error("Server error");
  }
  const newExpense = await response.json();
  return newExpense;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 5 * 60 * 1000,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}
