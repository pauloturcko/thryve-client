import { http } from "@/http/http";
import { Report, ReportConfig } from "./types";

export const reportService = {
  preview: async (config: ReportConfig): Promise<Blob> => {
    const response = await http.post<Blob>("/reports/preview", config, {
      responseType: "blob",
    });
    return response.data;
  },

  generate: async (config: ReportConfig): Promise<Report> => {
    const response = await http.post<{ report: Report }>(
      "/reports/generate",
      config
    );
    return response.data.report;
  },

  loadAll: async (): Promise<Report[]> => {
    const response = await http.get<{ reports: Report[] }>(
      "/reports/user-reports"
    );
    return response.data.reports;
  },

  download: async (id: number): Promise<Blob> => {
    const response = await http.get<Blob>(`/reports/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },

  delete: ({ id }: { id: number }) =>
    http.delete("/reports/delete", { data: { id } }),
};
