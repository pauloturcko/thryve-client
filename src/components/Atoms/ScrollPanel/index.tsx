import { ReactNode } from "react";
import * as S from "./styles";

type ScrollPanelProps = {
  children: ReactNode;
  gap?: string;
};

export const ScrollPanel = ({ children, gap = "1rem" }: ScrollPanelProps) => (
  <S.Box>
    <S.Scroll $gap={gap}>{children}</S.Scroll>
  </S.Box>
);
