import { useCallback } from "react";
import { Currency } from "@/constants/enums/currency-enum";
import { useUser } from "@/hooks/useUser";
import { formatCurrency } from "@/utils/format";

export const useFormatCurrency = () => {
  const { systemPreferences } = useUser();
  const currency = systemPreferences?.currency ?? Currency.Real;

  return useCallback(
    (value: number) => formatCurrency(value, currency),
    [currency]
  );
};
