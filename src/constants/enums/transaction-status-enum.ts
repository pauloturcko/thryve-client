import { enumToOptions } from "@/utils/enum-options";

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

export const ExpenseStatusOptions = enumToOptions(
  TransactionStatus,
  ExpenseStatusLabels
);

export const IncomeStatusOptions = enumToOptions(
  TransactionStatus,
  IncomeStatusLabels
);
