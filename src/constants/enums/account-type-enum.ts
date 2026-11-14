import { enumToOptions } from "@/utils/enum-options";

export enum AccountType {
  ContaDigital = 0,
  ContaCorrente = 1,
  Poupanca = 2,
  CarteiraDigital = 3,
  Dinheiro = 4,
}

export const AccountTypeLabels: Record<AccountType, string> = {
  [AccountType.ContaDigital]: "Conta Digital",
  [AccountType.ContaCorrente]: "Conta Corrente",
  [AccountType.Poupanca]: "Poupança",
  [AccountType.CarteiraDigital]: "Carteira Digital",
  [AccountType.Dinheiro]: "Dinheiro",
};

export const AccountTypeOptions = enumToOptions(AccountType, AccountTypeLabels);
