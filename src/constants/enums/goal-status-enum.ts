import { enumToOptions } from "@/utils/enum-options";

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

export const GoalStatusOptions = enumToOptions(GoalStatus, GoalStatusLabels);
