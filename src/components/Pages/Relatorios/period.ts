export type PeriodPreset =
  | "month"
  | "lastMonth"
  | "quarter"
  | "year"
  | "custom";

export const periodOptions: { value: PeriodPreset; label: string }[] = [
  { value: "month", label: "Este mês" },
  { value: "lastMonth", label: "Mês passado" },
  { value: "quarter", label: "Últimos 3 meses" },
  { value: "year", label: "Este ano" },
  { value: "custom", label: "Personalizado" },
];

const pad = (value: number) => String(value).padStart(2, "0");
const toISO = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const monthsRange = (startOffset: number, endOffset: number) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return {
    startDate: toISO(new Date(year, month + startOffset, 1)),
    endDate: toISO(new Date(year, month + endOffset + 1, 0)),
  };
};

export const presetRange = (preset: Exclude<PeriodPreset, "custom">) => {
  switch (preset) {
    case "month":
      return monthsRange(0, 0);
    case "lastMonth":
      return monthsRange(-1, -1);
    case "quarter":
      return monthsRange(-2, 0);
    case "year": {
      const year = new Date().getFullYear();
      return { startDate: `${year}-01-01`, endDate: `${year}-12-31` };
    }
  }
};
