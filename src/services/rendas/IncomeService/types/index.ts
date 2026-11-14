import { BankAccount } from "@/services/configuracoes/BankAccountService/types";
import { Category } from "@/services/configuracoes/CategoryService/types";

export type CreateIncomeParams = {
  incomeKind: number;
  amount: number;
  date: string;
  status: number;
  categoryId: number;
  bankAccountId: number;
  source?: string | null;
  notes?: string | null;
  linkedTransactionId?: number | null;
};

export type Income = {
  id: number;
  userId: number;
  incomeKind: number;
  amount: string;
  date: string;
  status: number;
  categoryId: number;
  bankAccountId: number;
  source: string | null;
  notes: string | null;
  linkedTransactionId: number | null;
  category: Category;
  bankAccount: BankAccount | null;
};

export type IncomeFilters = {
  month?: string;
  status?: number;
  incomeKind?: number;
  categoryId?: number;
};

export type LoadAllIncomesResponse = {
  incomes: Income[];
};

export type UpdateIncomeParams = Partial<CreateIncomeParams> & {
  id: number;
};
