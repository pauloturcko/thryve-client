import { http } from "@/http/http";
import { BankAccount } from "./bank-account-service";
import { Card } from "./card-service";
import { Category } from "./category-service";
import { PaymentPreference } from "./payment-preferences-service";

type CreateExpenseParams = {
  expenseKind: number;
  description: string;
  amount: number;
  date: string;
  dueDate?: string | null;
  status: number;
  categoryId: number;
  bankAccountId: number;
  paymentMethodId: number;
  cardId?: number | null;
  notes?: string | null;
  installments?: number;
};

export type Expense = {
  id: number;
  userId: number;
  expenseKind: number;
  description: string;
  amount: string;
  date: string;
  dueDate: string | null;
  status: number;
  categoryId: number;
  bankAccountId: number;
  paymentMethodId: number | null;
  cardId: number | null;
  notes: string | null;
  installmentGroupId: string | null;
  installmentNumber: number | null;
  installmentTotal: number | null;
  category: Category;
  bankAccount: BankAccount | null;
  paymentMethod: PaymentPreference["paymentMethod"] | null;
  card: Card | null;
};

export type ExpenseFilters = {
  month?: string;
  status?: number;
  expenseKind?: number;
  categoryId?: number;
  paymentMethodId?: number;
};

type LoadAllExpensesResponse = {
  expenses: Expense[];
};

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

export type UpdateExpenseParams = Partial<
  Omit<CreateExpenseParams, "installments">
> & {
  id: number;
};

export const updateExpenseService = {
  updateExpense: ({ id, ...fields }: UpdateExpenseParams) =>
    http.patch("/expenses/update", { id, ...fields }),
};
