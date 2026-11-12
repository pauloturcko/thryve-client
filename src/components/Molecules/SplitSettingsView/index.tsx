import { ReactNode } from "react";
import { ScrollPanel } from "@/components/Atoms/ScrollPanel";
import * as S from "./styles";

type SplitSettingsViewProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  message?: string;
  list: ReactNode;
  details: ReactNode;
  equalColumns?: boolean;
  listGap?: string;
};

export const SplitSettingsView = ({
  title,
  description,
  action,
  message,
  list,
  details,
  equalColumns = false,
  listGap,
}: SplitSettingsViewProps) => (
  <S.Page>
    <S.Header>
      <S.Heading>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </S.Heading>
      {action}
    </S.Header>
    {message ? (
      <S.Message>{message}</S.Message>
    ) : (
      <S.Layout $equalColumns={equalColumns}>
        <ScrollPanel gap={listGap}>{list}</ScrollPanel>
        <ScrollPanel gap={equalColumns ? listGap : "1.25rem"}>
          {details}
        </ScrollPanel>
      </S.Layout>
    )}
  </S.Page>
);
