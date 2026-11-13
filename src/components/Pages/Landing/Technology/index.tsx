"use client";

import { ThemeProvider } from "styled-components";
import { Section } from "../Section";
import { SectionHeading } from "../SectionHeading";
import { StatementImport } from "../StatementImport";
import { VoiceDemo } from "../VoiceDemo";
import { Accent, Container, DevelopmentTag } from "../styles";
import { landingThemes } from "../theme";
import { reveal } from "../useReveal";
import * as S from "./styles";

const IMPORT_STEPS = [
  "Você envia o arquivo do extrato do banco ou da fatura do cartão.",
  "A Thryve lê as transações e cria pré-cadastros de receitas e despesas.",
  "Você revisa, completa o que faltou e confirma.",
];

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
          status={<DevelopmentTag>Em desenvolvimento</DevelopmentTag>}
          title={
            <>
              Menos digitação.
              <br />A decisão continua <Accent>sendo sua.</Accent>
            </>
          }
          lead="Duas funcionalidades em construção para reduzir o trabalho manual de registrar cada movimentação. Em ambas, nenhum lançamento é confirmado sem passar pela sua revisão."
        />

        <S.ImportRow>
          <S.Feature {...reveal(0)}>
            <S.FeatureTitle>
              <S.FeatureIndex>4.1</S.FeatureIndex>
              <h3>Importação inteligente de extratos</h3>
            </S.FeatureTitle>
            <S.FeatureSteps>
              {IMPORT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </S.FeatureSteps>
            <S.Aside>
              Não é uma conexão com o seu banco. Você escolhe o arquivo e decide
              o que entra.
            </S.Aside>
          </S.Feature>
          <S.ImportVisual {...reveal(1)}>
            <StatementImport />
          </S.ImportVisual>
        </S.ImportRow>

        <ThemeProvider theme={landingThemes.dark}>
          <S.Stage
            data-tone="dark"
            {...reveal(0)}
          >
            <VoiceDemo
              intro={
                <S.StageHeader>
                  <S.FeatureTitle>
                    <S.FeatureIndex>4.2</S.FeatureIndex>
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
