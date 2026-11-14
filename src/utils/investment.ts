import { IndexType, IndexTypeLabels } from "@/constants/enums/index-type-enum";
import { InvestmentMovementType } from "@/constants/enums/investment-movement-type-enum";
import {
  Investment,
  InvestmentMovement,
} from "@/services/investimentos/InvestmentService/types";

const number = (value: number, digits: number) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);

export const rateLabel = ({
  indexType,
  indexPercentage,
  spreadRate,
}: Pick<Investment, "indexType" | "indexPercentage" | "spreadRate">) => {
  const percentage = Number(indexPercentage);
  const spread = Number(spreadRate);
  const spreadText =
    spread !== 0
      ? ` ${spread > 0 ? "+" : "−"} ${number(Math.abs(spread), 4)}% a.a.`
      : "";

  switch (indexType as IndexType) {
    case IndexType.PreFixado:
      return `Pré-fixado · ${number(spread, 4)}% a.a.`;
    case IndexType.Nenhum:
      return "Sem indexador";
    default: {
      const name = IndexTypeLabels[indexType as IndexType];
      const base =
        percentage === 100 ? name : `${number(percentage, 2)}% do ${name}`;
      return `${base}${spreadText}`;
    }
  }
};

export const formatPercentValue = (value: string | number, digits = 2) =>
  `${number(Number(value), digits)}%`;

export const normalizeRate = (value: string) => value.trim().replace(",", ".");

export const isValidRate = (value: string, decimals: number) =>
  new RegExp(`^-?\\d{1,4}([.,]\\d{1,${decimals}})?$`).test(value.trim());

export const movementEffect = (movement: InvestmentMovement) =>
  movement.type === InvestmentMovementType.Resgate
    ? -Number(movement.amount)
    : Number(movement.amount);
