import { Goal } from "@/services/goal-service";

export const goalProgress = (goal: Goal): number | null => {
  const target = Number(goal.targetAmount);
  if (!goal.targetAmount || target <= 0) return null;
  return Math.min(1, Math.max(0, Number(goal.savedAmount) / target));
};

export const formatPercent = (value: number) => `${Math.round(value * 100)}%`;
