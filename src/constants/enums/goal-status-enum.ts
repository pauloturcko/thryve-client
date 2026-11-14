export enum GoalStatus {
  EmAndamento = 0,
  Concluida = 1,
  Cancelada = 2,
}

export const GoalStatusLabels: Record<GoalStatus, string> = {
  [GoalStatus.EmAndamento]: "Em andamento",
  [GoalStatus.Concluida]: "Concluída",
  [GoalStatus.Cancelada]: "Cancelada",
};

export const GoalStatusOptions = Object.entries(GoalStatus)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: GoalStatusLabels[value as GoalStatus],
  }));
