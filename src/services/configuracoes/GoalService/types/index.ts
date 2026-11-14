export type CreateGoalParams = {
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

export type LoadAllGoalsResponse = {
  goals: Goal[];
};

export type UpdateGoalParams = Partial<CreateGoalParams> & {
  id: number;
};
