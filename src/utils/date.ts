// Datas da API são "AAAA-MM-DD" e meses "AAAA-MM". Montamos tudo pelo fuso local:
// new Date("2026-11-01") seria meia-noite UTC, que no Brasil ainda é outubro.
const pad = (value: number) => String(value).padStart(2, "0");

const toMonthParam = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

export const currentMonth = (): string => toMonthParam(new Date());

export const todayISO = (): string => {
  const today = new Date();
  return `${toMonthParam(today)}-${pad(today.getDate())}`;
};

export const shiftMonth = (month: string, delta: number): string => {
  const [year, monthNumber] = month.split("-").map(Number);
  return toMonthParam(new Date(year, monthNumber - 1 + delta, 1));
};

export const formatMonthLabel = (month: string): string => {
  const [year, monthNumber] = month.split("-").map(Number);
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthNumber - 1, 1));

  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const formatDateBR = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};
