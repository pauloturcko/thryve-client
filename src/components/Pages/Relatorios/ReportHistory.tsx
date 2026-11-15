import { Download, FileText, Inbox, Trash2 } from "lucide-react";
import { ReportSectionLabels } from "@/constants/enums/report-section-enum";
import { useConfirm } from "@/hooks/useConfirm";
import { useReport, useReportsHistory } from "@/hooks/useReport";
import { Report } from "@/services/relatorios/ReportService/types";
import { formatDateBR } from "@/utils/date";
import * as S from "./styles";

const createdAtFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;

const describe = (report: Report) => {
  const sections = report.filters.sections
    .map((section) => ReportSectionLabels[section])
    .join(", ");
  const filtered =
    report.filters.bankAccountIds.length +
      report.filters.cardIds.length +
      report.filters.categoryIds.length >
    0
      ? " · com filtros"
      : "";

  const period = `${formatDateBR(report.startDate)} a ${formatDateBR(report.endDate)}`;
  // Título automático de período quebrado já é o próprio período: não repete na linha de baixo.
  const parts = report.title === period ? [sections] : [period, sections];

  return `${parts.join(" · ")}${filtered}`;
};

export const ReportHistory = () => {
  const { data: reports = [], isLoading } = useReportsHistory();
  const { download, deleteReport } = useReport();
  const { confirm } = useConfirm();

  const handleDelete = (report: Report) => {
    confirm({
      title: "Excluir relatório",
      message: `Tem certeza que deseja excluir "${report.title}" do histórico? O arquivo não poderá ser baixado de novo.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteReport.mutate({ id: report.id }),
    });
  };

  return (
    <S.History aria-label="Histórico de relatórios">
      <S.HistoryHeader>
        <h2>Histórico</h2>
        <span>{reports.length}</span>
      </S.HistoryHeader>
      <S.HistoryBody>
        {isLoading && <p>Carregando...</p>}
        {!isLoading && reports.length === 0 && (
          <S.EmptyState>
            <Inbox size={28} />
            <p>
              Os relatórios que você gerar ficam salvos aqui para baixar de novo
              quando precisar.
            </p>
          </S.EmptyState>
        )}
        <S.HistoryList>
          {reports.map((report) => (
            <S.HistoryItem key={report.id}>
              <S.FileIcon>
                <FileText size={20} />
              </S.FileIcon>
              <S.HistoryInfo>
                <strong>{report.title}</strong>
                <span>{describe(report)}</span>
                <span>
                  Gerado em {createdAtFormat.format(new Date(report.createdAt))}{" "}
                  · {formatSize(report.fileSize)}
                </span>
              </S.HistoryInfo>
              <S.HistoryActions>
                <S.IconButton
                  type="button"
                  aria-label={`Baixar ${report.title}`}
                  title="Baixar PDF"
                  onClick={() => download(report)}
                >
                  <Download size={20} />
                </S.IconButton>
                <S.IconButton
                  type="button"
                  aria-label={`Excluir ${report.title}`}
                  title="Excluir"
                  $danger
                  onClick={() => handleDelete(report)}
                >
                  <Trash2 size={20} />
                </S.IconButton>
              </S.HistoryActions>
            </S.HistoryItem>
          ))}
        </S.HistoryList>
      </S.HistoryBody>
    </S.History>
  );
};
