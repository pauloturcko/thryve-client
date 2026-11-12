import { ReactNode } from "react";
import * as S from "./styles";

type SettingsPanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  wide?: boolean;
  children: ReactNode;
};

export const SettingsPanel = ({
  title,
  description,
  action,
  wide,
  children,
}: SettingsPanelProps) => (
  <S.Stage>
    <S.StagePanel
      title={title}
      description={description}
      action={action}
      $wide={wide}
    >
      {children}
    </S.StagePanel>
  </S.Stage>
);
