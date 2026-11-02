export enum TransactionStatus {
  Pendente = 0,
  Pago = 1,
}

export const ExpenseStatusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.Pendente]: "Pendente",
  [TransactionStatus.Pago]: "Pago",
};

export const IncomeStatusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.Pendente]: "Pendente",
  [TransactionStatus.Pago]: "Recebido",
};

const toOptions = (labels: Record<TransactionStatus, string>) =>
  Object.entries(TransactionStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([_, value]) => ({
      value,
      label: labels[value as TransactionStatus],
    }));

export const ExpenseStatusOptions = toOptions(ExpenseStatusLabels);

export const IncomeStatusOptions = toOptions(IncomeStatusLabels);
