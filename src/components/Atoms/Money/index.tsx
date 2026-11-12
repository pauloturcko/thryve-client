"use client";

import { useFormatCurrency } from "@/hooks/useFormatCurrency";

type MoneyProps = {
  value: number;
};

export const Money = ({ value }: MoneyProps) => {
  const formatCurrency = useFormatCurrency();
  return <>{formatCurrency(value)}</>;
};
