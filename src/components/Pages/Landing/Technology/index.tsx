"use client";

import { ThemeProvider } from "styled-components";
import { Section } from "../Section";
import { SectionHeading } from "../SectionHeading";
import { VoiceDemo } from "../VoiceDemo";
import { Accent, Container, DevelopmentTag } from "../styles";
import { landingThemes } from "../theme";
import { reveal } from "../useReveal";
import * as S from "./styles";

export const Technology = () => (
  <Section
    id="tecnologia"
    tone="light"
    surface="raised"
    grain
    labelledBy="tecnologia-title"
  >
    <Container>
      <S.Inner>
        <SectionHeading
          titleId="tecnologia-title"
          layout="wide"
          status={<DevelopmentTag>Em desenvolvimento</DevelopmentTag>}
          title={
            <>
              Menos digitação.
              <br />A decisão continua
              <br />
              <Accent>sendo sua.</Accent>
            </>
          }
          lead="Um aplicativo em construção para reduzir o trabalho manual de registrar cada gasto. Nenhum lançamento é confirmado sem passar pela sua revisão."
        />

        <ThemeProvider theme={landingThemes.dark}>
          <S.Stage
            data-tone="dark"
            {...reveal(0)}
          >
            <VoiceDemo
              intro={
                <S.StageHeader>
                  <S.FeatureTitle>
                    <h3>Registro de despesas por voz</h3>
                  </S.FeatureTitle>
                  <S.StageLead>
                    Um aplicativo mobile enxuto, construído em torno de uma
                    única interação. Em vez de telas e formulários, uma esfera:
                    você toca, fala o que gastou e a Thryve transforma a frase
                    em um registro.
                  </S.StageLead>
                </S.StageHeader>
              }
            />
          </S.Stage>
        </ThemeProvider>
      </S.Inner>
    </Container>
  </Section>
);
