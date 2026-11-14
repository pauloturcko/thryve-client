import { http } from "@/http/http";
import {
  CreateExpenseParams,
  Expense,
  ExpenseFilters,
  LoadAllExpensesResponse,
  UpdateExpenseParams,
} from "./types";

export const createExpenseService = {
  createExpense: (params: CreateExpenseParams) =>
    http.post("/expenses/register", params),
};

export const loadExpensesService = {
  loadAll: async (filters: ExpenseFilters = {}): Promise<Expense[]> => {
    const response = await http.get<LoadAllExpensesResponse>(
      "/expenses/user-expenses",
      { params: filters }
    );
    return response.data.expenses;
  },
};

export const deleteExpenseService = {
  deleteExpense: ({ id }: { id: number }) =>
    http.delete("/expenses/delete", { data: { id } }),
};

export const updateExpenseService = {
  updateExpense: ({ id, ...fields }: UpdateExpenseParams) =>
    http.patch("/expenses/update", { id, ...fields }),
};
