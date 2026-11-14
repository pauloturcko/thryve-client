import { http } from "@/http/http";

type CreateGoalParams = {
  name: string;
  targetAmount?: number | null;
  savedAmount?: number;
  priority: number;
  status?: number;
  deadline?: string | null;
  notes?: string | null;
};

export type Goal = {
  id: number;
  userId: number;
  name: string;
  slug: string;
  targetAmount: string | null;
  savedAmount: string;
  priority: number;
  status: number;
  deadline: string | null;
  completedAt: string | null;
  notes: string | null;
};

type LoadAllGoalsResponse = {
  goals: Goal[];
};

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

export type UpdateGoalParams = Partial<CreateGoalParams> & {
  id: number;
};

export const updateGoalService = {
  updateGoal: ({ id, ...fields }: UpdateGoalParams) =>
    http.patch("/goals/update", { id, ...fields }),
};
