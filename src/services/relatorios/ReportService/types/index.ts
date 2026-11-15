import { ReportSection } from "@/constants/enums/report-section-enum";

export type ReportConfig = {
  title?: string | null;
  startDate: string;
  endDate: string;
  sections: ReportSection[];
  bankAccountIds: number[];
  cardIds: number[];
  categoryIds: number[];
  includeTransactions: boolean;
  timezone: string;
};

export type Report = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  filters: {
    sections: ReportSection[];
    bankAccountIds: number[];
    cardIds: number[];
    categoryIds: number[];
    includeTransactions: boolean;
  };
  fileName: string;
  fileSize: number;
  createdAt: string;
};
