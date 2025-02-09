import { zValidator } from "@hono/zod-validator";

import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});
const createPostSchema = expenseSchema.omit({ id: true });
type Expense = z.infer<typeof expenseSchema>;

const expenses: Expense[] = [
  { id: 1, title: "Rent", amount: 1000 },
  { id: 2, title: "Groceries", amount: 500 },
  { id: 3, title: "Entertainment", amount: 200 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses });
  })
  .get("/total-spent", (c) => {
    const total = expenses.reduce((prev, curr) => prev + curr.amount, 0);
    return c.json({ total });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    expenses.push({ ...expense, id: expenses.length + 1 });
    c.status(201);
    return c.json({ ...expense, id: expenses.length + 1 });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = expenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = expenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
