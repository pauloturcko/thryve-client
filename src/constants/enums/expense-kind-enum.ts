export enum ExpenseKind {
  Fixo = 0,
  Variavel = 1,
}

export const ExpenseKindLabels: Record<ExpenseKind, string> = {
  [ExpenseKind.Fixo]: "Fixo",
  [ExpenseKind.Variavel]: "Variável",
};

export const ExpenseKindOptions = Object.entries(ExpenseKind)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: ExpenseKindLabels[value as ExpenseKind],
  }));
