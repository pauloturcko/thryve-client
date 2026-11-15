import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useToastContext } from "@/contexts/ToastContext";
import { reportService } from "@/services/relatorios/ReportService/report-service";
import {
  Report,
  ReportConfig,
} from "@/services/relatorios/ReportService/types";
import { downloadBlob } from "@/utils/download-file";
import { getErrorMessage } from "@/utils/get-error-message";

export const REPORTS_QUERY_KEY = ["Reports-LoadAll"];
const REPORT_PREVIEW_QUERY_KEY = ["Reports-Preview"];

const readBlobError = async (error: unknown) => {
  if (isAxiosError(error) && error.response?.data instanceof Blob) {
    try {
      error.response.data = JSON.parse(await error.response.data.text());
    } catch {}
  }
  return error;
};

export function useReport() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const download = async (report: Pick<Report, "id" | "fileName">) => {
    try {
      downloadBlob(await reportService.download(report.id), report.fileName);
    } catch (error) {
      dispatchToast({
        type: "error",
        message: getErrorMessage(
          await readBlobError(error),
          "Erro ao baixar relatório"
        ),
      });
    }
  };

  const generateReport = useMutation({
    mutationFn: reportService.generate,
    onSuccess: async (report) => {
      dispatchToast({ type: "success", message: "Relatório gerado" });
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEY });
      await download(report);
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao gerar relatório"),
      });
    },
  });

  const deleteReport = useMutation({
    mutationFn: reportService.delete,
    onSuccess: () => {
      dispatchToast({ type: "success", message: "Relatório excluído" });
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao excluir relatório"),
      });
    },
  });

  return { generateReport, deleteReport, download };
}

export function useReportsHistory() {
  return useQuery({
    queryKey: REPORTS_QUERY_KEY,
    queryFn: reportService.loadAll,
  });
}

export function useReportPreview(config: ReportConfig | null) {
  const query = useQuery({
    queryKey: [...REPORT_PREVIEW_QUERY_KEY, config],
    queryFn: async () => {
      try {
        return URL.createObjectURL(await reportService.preview(config!));
      } catch (error) {
        throw await readBlobError(error);
      }
    },
    enabled: !!config,
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    placeholderData: (previous) => previous,
    meta: { silent: true },
  });

  const lastUrl = useRef<string | null>(null);
  useEffect(() => {
    const previous = lastUrl.current;
    lastUrl.current = query.data ?? null;
    if (previous && previous !== query.data) URL.revokeObjectURL(previous);
  }, [query.data]);

  return { ...query, url: query.data ?? null };
}
