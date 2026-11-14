import { enumToOptions } from "@/utils/enum-options";

export enum ExpenseKind {
  Fixo = 0,
  Variavel = 1,
}

export const ExpenseKindLabels: Record<ExpenseKind, string> = {
  [ExpenseKind.Fixo]: "Fixo",
  [ExpenseKind.Variavel]: "Variável",
};

export const ExpenseKindOptions = enumToOptions(ExpenseKind, ExpenseKindLabels);
