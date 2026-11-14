export enum GoalPriority {
  Baixa = 0,
  Media = 1,
  Alta = 2,
}

export const GoalPriorityLabels: Record<GoalPriority, string> = {
  [GoalPriority.Baixa]: "Baixa",
  [GoalPriority.Media]: "Média",
  [GoalPriority.Alta]: "Alta",
};

export const GoalPriorityOptions = Object.entries(GoalPriority)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: GoalPriorityLabels[value as GoalPriority],
  }));
