"use client";

import { ThemeProvider } from "styled-components";
import { buildTheme } from "@/styles/theme";
import { Section } from "../Section";
import { SectionHeading } from "../SectionHeading";
import { Accent, Container } from "../styles";
import { reveal } from "../useReveal";
import { GoalPreview } from "./GoalPreview";
import * as S from "./styles";

const productTheme = buildTheme("dark");

export const Progress = () => (
  <Section
    id="progresso"
    tone="dark"
    labelledBy="progresso-title"
  >
    <S.Glow aria-hidden="true" />
    <Container>
      <S.Inner>
        <SectionHeading
          titleId="progresso-title"
          layout="stacked"
          title={
            <>
              Perceba o <Accent>próprio progresso.</Accent>
            </>
          }
          lead="Controlar o dinheiro é só o começo. Com as metas, você define o que quer conquistar e acompanha cada aporte até chegar lá."
        />
        <S.Body>
          <S.Thought {...reveal(0)}>
            <p>
              Todo patrimônio começa como uma decisão.{" "}
              <em>O resto é persistência.</em>
            </p>
            <S.Afterthought>
              Pequenas decisões, repetidas todo mês, constroem o que nenhum
              grande gesto isolado consegue.
            </S.Afterthought>
          </S.Thought>
          <S.GoalSlot {...reveal(1)}>
            <ThemeProvider theme={productTheme}>
              <GoalPreview />
            </ThemeProvider>
          </S.GoalSlot>
        </S.Body>
      </S.Inner>
    </Container>
  </Section>
);
