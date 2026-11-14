import { enumToOptions } from "@/utils/enum-options";

export enum InvestmentStatus {
  Ativo = 0,
  Resgatado = 1,
}

export const InvestmentStatusLabels: Record<InvestmentStatus, string> = {
  [InvestmentStatus.Ativo]: "Ativo",
  [InvestmentStatus.Resgatado]: "Resgatado",
};

export const InvestmentStatusOptions = enumToOptions(
  InvestmentStatus,
  InvestmentStatusLabels
);
