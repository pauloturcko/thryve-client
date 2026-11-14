import { http } from "@/http/http";
import {
  CreateIncomeParams,
  Income,
  IncomeFilters,
  LoadAllIncomesResponse,
  UpdateIncomeParams,
} from "./types";

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

export const updateIncomeService = {
  updateIncome: ({ id, ...fields }: UpdateIncomeParams) =>
    http.patch("/incomes/update", { id, ...fields }),
};
