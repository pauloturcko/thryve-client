import { ReactNode } from "react";
import * as S from "./styles";

type SettingsPanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export const SettingsPanel = ({
  title,
  description,
  action,
  children,
}: SettingsPanelProps) => (
  <S.Stage>
    <S.StagePanel
      title={title}
      description={description}
      action={action}
    >
      {children}
    </S.StagePanel>
  </S.Stage>
);
