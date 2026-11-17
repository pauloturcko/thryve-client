import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { buildTheme } from "@/styles/theme";
import * as S from "./styles";

const productTheme = buildTheme("light");

type FeatureCardProps = {
  title: string;
  children: ReactNode;
};

export const FeatureCard = ({ title, children }: FeatureCardProps) => (
  <S.Card>
    <ThemeProvider theme={productTheme}>
      <S.Visual aria-hidden="true">{children}</S.Visual>
    </ThemeProvider>
    <S.Caption>
      <h3>{title}</h3>
    </S.Caption>
  </S.Card>
);
