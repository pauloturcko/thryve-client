import { AlertCircle, FileText } from "lucide-react";
import * as S from "./styles";

type ReportPreviewProps = {
  url: string | null;
  isFetching: boolean;
  error: string | null;
  blockedReason: string | null;
};

export const ReportPreview = ({
  url,
  isFetching,
  error,
  blockedReason,
}: ReportPreviewProps) => {
  const status = () => {
    if (blockedReason) return null;
    if (isFetching)
      return (
        <S.PreviewStatus>
          <S.Spinner /> Atualizando prévia
        </S.PreviewStatus>
      );
    if (error)
      return (
        <S.PreviewStatus $tone="danger">
          <AlertCircle size={14} /> Falha na prévia
        </S.PreviewStatus>
      );
    return url ? <S.PreviewStatus>Prévia atualizada</S.PreviewStatus> : null;
  };

  const body = () => {
    if (blockedReason || (!url && error)) {
      return (
        <S.PreviewEmpty>
          <FileText size={32} />
          <p>{blockedReason ?? error}</p>
        </S.PreviewEmpty>
      );
    }
    if (!url) {
      return (
        <S.PreviewEmpty>
          <S.Spinner />
          <p>Gerando a prévia do relatório...</p>
        </S.PreviewEmpty>
      );
    }
    return (
      <S.Frame
        title="Prévia do relatório em PDF"
        src={`${url}#toolbar=0&navpanes=0&view=FitH`}
        $dimmed={isFetching}
      />
    );
  };

  return (
    <S.Preview aria-busy={isFetching}>
      <S.PreviewHeader>
        <h2>Prévia</h2>
        {status()}
      </S.PreviewHeader>
      <S.PreviewBody>{body()}</S.PreviewBody>
    </S.Preview>
  );
};
