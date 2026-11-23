import { BankAccount } from "@/services/configuracoes/BankAccountService/types";
import { Card } from "@/services/configuracoes/CardService/types";
import { Category } from "@/services/configuracoes/CategoryService/types";
import { PaymentPreference } from "@/services/configuracoes/PaymentPreferencesService/types";

export type CreateExpenseParams = {
  expenseKind: number;
  description: string;
  amount: number;
  date: string;
  dueDate?: string | null;
  status: number;
  categoryId: number;
  bankAccountId?: number;
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

export type LoadAllExpensesResponse = {
  expenses: Expense[];
};

export type UpdateExpenseParams = Partial<
  Omit<CreateExpenseParams, "installments">
> & {
  id: number;
};
