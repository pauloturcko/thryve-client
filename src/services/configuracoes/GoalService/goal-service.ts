import { http } from "@/http/http";
import {
  CreateGoalParams,
  Goal,
  LoadAllGoalsResponse,
  UpdateGoalParams,
} from "./types";

export const createGoalService = {
  createGoal: (params: CreateGoalParams) =>
    http.post("/goals/register", params),
};

export const loadGoalsService = {
  loadAll: async (): Promise<Goal[]> => {
    const response = await http.get<LoadAllGoalsResponse>("/goals/user-goals");
    return response.data.goals;
  },
};

export const deleteGoalService = {
  deleteGoal: ({ id }: { id: number }) =>
    http.delete("/goals/delete", { data: { id } }),
};

export const updateGoalService = {
  updateGoal: ({ id, ...fields }: UpdateGoalParams) =>
    http.patch("/goals/update", { id, ...fields }),
};
