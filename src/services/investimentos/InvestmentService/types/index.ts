import { BankAccount } from "@/services/configuracoes/BankAccountService/types";

export type CreateInvestmentParams = {
  bankAccountId: number;
  name: string;
  indexType: number;
  indexPercentage?: string;
  spreadRate?: string;
  initialAmount: number;
  date: string;
  maturityDate?: string | null;
  notes?: string | null;
};

// Resumo e projeção já vêm calculados pela API em cada investimento.
export type Investment = {
  id: number;
  userId: number;
  bankAccountId: number;
  name: string;
  slug: string;
  indexType: number;
  indexPercentage: string;
  spreadRate: string;
  maturityDate: string | null;
  status: number;
  notes: string | null;
  bankAccount: BankAccount | null;
  startDate: string | null;
  initialAmount: string;
  investedAmount: string;
  yieldAmount: string;
  yieldPercentage: string | null;
  currentAmount: string;
  monthYield: string;
  estimatedAmount: string;
  estimatedYield: string;
  currentAnnualRate: string | null;
  ratesUpdatedUntil: string | null;
};

export type InvestmentMovement = {
  id: number;
  userId: number;
  investmentId: number;
  type: number;
  amount: string;
  date: string;
  notes: string | null;
};

export type InvestmentFilters = {
  month?: string;
  status?: number;
  bankAccountId?: number;
};

export type InvestmentMovementFilters = {
  investmentId?: number;
  type?: number;
  month?: string;
};

export type UpdateInvestmentParams = Partial<
  Omit<CreateInvestmentParams, "initialAmount" | "date">
> & {
  id: number;
  status?: number;
};

export type UpdateInvestmentValueParams = {
  investmentId: number;
  currentAmount: number;
  date: string;
  notes?: string | null;
};

export type CreateMovementParams = {
  investmentId: number;
  type: number;
  amount: number;
  date: string;
  notes?: string | null;
};

export type UpdateMovementParams = Partial<
  Omit<CreateMovementParams, "investmentId">
> & {
  id: number;
};
