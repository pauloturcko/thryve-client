import { http } from "@/http/http";
import { BankAccount } from "./bank-account-service";
import { Category } from "./category-service";

type CreateIncomeParams = {
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

type LoadAllIncomesResponse = {
  incomes: Income[];
};

export const createIncomeService = {
  createIncome: (params: CreateIncomeParams) =>
    http.post("/incomes/register", params),
};

export const loadIncomesService = {
  loadAll: async (filters: IncomeFilters = {}): Promise<Income[]> => {
    const response = await http.get<LoadAllIncomesResponse>(
      "/incomes/user-incomes",
      { params: filters }
    );
    return response.data.incomes;
  },
};

export const deleteIncomeService = {
  deleteIncome: ({ id }: { id: number }) =>
    http.delete("/incomes/delete", { data: { id } }),
};

export type UpdateIncomeParams = Partial<CreateIncomeParams> & {
  id: number;
};

export const updateIncomeService = {
  updateIncome: ({ id, ...fields }: UpdateIncomeParams) =>
    http.patch("/incomes/update", { id, ...fields }),
};
