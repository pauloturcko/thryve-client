import { enumToOptions } from "@/utils/enum-options";

export enum InvestmentMovementType {
  Aporte = 0,
  Resgate = 1,
  Rendimento = 2,
}

export const InvestmentMovementTypeLabels: Record<
  InvestmentMovementType,
  string
> = {
  [InvestmentMovementType.Aporte]: "Aporte",
  [InvestmentMovementType.Resgate]: "Resgate",
  [InvestmentMovementType.Rendimento]: "Rendimento",
};

export const InvestmentMovementTypeOptions = enumToOptions(
  InvestmentMovementType,
  InvestmentMovementTypeLabels
);
