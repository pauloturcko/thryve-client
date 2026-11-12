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
};

export const SplitSettingsView = ({
  title,
  description,
  action,
  message,
  list,
  details,
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
      <S.Layout>
        <ScrollPanel>{list}</ScrollPanel>
        <ScrollPanel gap="1.25rem">{details}</ScrollPanel>
      </S.Layout>
    )}
  </S.Page>
);
