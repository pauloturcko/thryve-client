import { http } from "@/http/http";
import {
  CreateInvestmentParams,
  Investment,
  InvestmentMovement,
  InvestmentFilters,
  InvestmentMovementFilters,
  UpdateInvestmentParams,
  UpdateInvestmentValueParams,
  CreateMovementParams,
  UpdateMovementParams,
} from "./types";

export const investmentService = {
  create: (params: CreateInvestmentParams) =>
    http.post("/investments/register", params),

  loadAll: async (filters: InvestmentFilters = {}): Promise<Investment[]> => {
    const response = await http.get<{ investments: Investment[] }>(
      "/investments/user-investments",
      { params: filters }
    );
    return response.data.investments;
  },

  update: ({ id, ...fields }: UpdateInvestmentParams) =>
    http.patch("/investments/update", { id, ...fields }),

  delete: ({ id }: { id: number }) =>
    http.delete("/investments/delete", { data: { id } }),

  updateValue: (params: UpdateInvestmentValueParams) =>
    http.post("/investments/update-value", params),
};

export const investmentMovementService = {
  create: (params: CreateMovementParams) =>
    http.post("/investments/movements/register", params),

  loadAll: async (
    filters: InvestmentMovementFilters = {}
  ): Promise<InvestmentMovement[]> => {
    const response = await http.get<{ movements: InvestmentMovement[] }>(
      "/investments/movements",
      { params: filters }
    );
    return response.data.movements;
  },

  update: ({ id, ...fields }: UpdateMovementParams) =>
    http.patch("/investments/movements/update", { id, ...fields }),

  delete: ({ id }: { id: number }) =>
    http.delete("/investments/movements/delete", { data: { id } }),
};
