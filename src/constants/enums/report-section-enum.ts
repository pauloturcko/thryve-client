import { enumToOptions } from "@/utils/enum-options";

export enum ReportSection {
  VisaoGeral = 0,
  Rendas = 1,
  Gastos = 2,
  Investimentos = 3,
}

export const ReportSectionLabels: Record<ReportSection, string> = {
  [ReportSection.VisaoGeral]: "Visão geral",
  [ReportSection.Rendas]: "Rendas",
  [ReportSection.Gastos]: "Gastos",
  [ReportSection.Investimentos]: "Investimentos",
};

export const ReportSectionDescriptions: Record<ReportSection, string> = {
  [ReportSection.VisaoGeral]: "Totais do período e evolução mês a mês",
  [ReportSection.Rendas]: "Por categoria e conta, com os lançamentos",
  [ReportSection.Gastos]: "Por categoria, forma de pagamento, cartão e conta",
  [ReportSection.Investimentos]: "Aplicações, rendimentos e movimentações",
};

export const ReportSectionOptions = enumToOptions(
  ReportSection,
  ReportSectionLabels
);
