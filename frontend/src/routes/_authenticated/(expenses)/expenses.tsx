import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  deleteExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/api/expensesApi";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/_authenticated/(expenses)/expenses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions,
  );

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <Table className="m-auto max-w-lg">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loadingCreateExpense?.expense && (
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4" />
            </TableCell>
            <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
            <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
            <TableCell>
              {loadingCreateExpense?.expense.date.split("T")[0]}
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4" />
            </TableCell>
          </TableRow>
        )}
        {isPending
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2" />
                  </TableCell>
                </TableRow>
              ))
          : data.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.date.split("T")[0]}</TableCell>
                <TableCell>$ {expense.amount}</TableCell>
                <TableCell>
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast({
        variant:"destructive",
        title:"Error",
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast({
        title:"Expense Deleted",
        description: `Successfully deleted expense: ${id}`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        }),
      );
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
      variant="outline"
      size="icon"
    >
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
}
