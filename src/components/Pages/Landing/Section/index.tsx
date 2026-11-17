"use client";

import { ReactNode } from "react";
import { styled, ThemeProvider } from "styled-components";
import { landingThemes, Tone } from "../theme";
import { paperGrain } from "../styles";

type Surface = "base" | "raised";

type SectionProps = {
  id?: string;
  tone: Tone;
  surface?: Surface;
  grain?: boolean;
  labelledBy?: string;
  children: ReactNode;
};

// Cada seção força o próprio tom; os componentes do produto usados dentro dela
// (logo, cards, gráficos) se ajustam pelo tema, como no dashboard.
export const Section = ({
  id,
  tone,
  surface = "base",
  grain = false,
  labelledBy,
  children,
}: SectionProps) => (
  <ThemeProvider theme={landingThemes[tone]}>
    <Root
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      $surface={surface}
      $grain={grain}
    >
      {children}
    </Root>
  </ThemeProvider>
);

const Root = styled.section<{ $surface: Surface; $grain: boolean }>`
  position: relative;
  isolation: isolate;
  overflow: clip;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme, $surface }) =>
    $surface === "base"
      ? theme.colors.background
      : theme.mode === "dark"
        ? theme.colors.surface
        : theme.colors.surfaceElevated};

  ${({ $grain }) => $grain && paperGrain};
`;
