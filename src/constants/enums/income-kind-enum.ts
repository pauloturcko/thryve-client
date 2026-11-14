import { enumToOptions } from "@/utils/enum-options";

export enum IncomeKind {
  Recorrente = 0,
  Pontual = 1,
  Reembolso = 2,
}

export const IncomeKindLabels: Record<IncomeKind, string> = {
  [IncomeKind.Recorrente]: "Recorrente",
  [IncomeKind.Pontual]: "Pontual",
  [IncomeKind.Reembolso]: "Reembolso",
};

export const IncomeKindOptions = enumToOptions(IncomeKind, IncomeKindLabels);
