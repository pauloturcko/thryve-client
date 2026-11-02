export const parseCurrencyInput = (value: string): number =>
  Number(value.replace(/\./g, "").replace(",", ".")) || 0;

export const parseOptionalNumber = (value?: string): number | undefined =>
  value ? Number(value) : undefined;

export const sumAmounts = (items: { amount: string }[]): number =>
  items.reduce((total, item) => total + Number(item.amount), 0);
