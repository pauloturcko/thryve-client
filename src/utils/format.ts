import { Currency, CurrencySymbols } from "@/constants/enums/currency-enum";

const amountFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCurrency = (
  value: number,
  currency: Currency = Currency.Real
): string => {
  const sign = value < 0 ? "-" : "";
  return `${sign}${CurrencySymbols[currency]}\u00A0${amountFormatter.format(Math.abs(value))}`;
};

export const formatCurrencyInput = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatMonthYear = (isoDate: string): string =>
  new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));

export const formatExpiryDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${month}/${year}`;
};
