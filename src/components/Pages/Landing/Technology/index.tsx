"use client";

import { ThemeProvider } from "styled-components";
import { ReviewPreview } from "../ReviewPreview";
import { Section } from "../Section";
import { SectionHeading } from "../SectionHeading";
import { VoiceDemo } from "../VoiceDemo";
import { Accent, Container, DevelopmentTag } from "../styles";
import { demoBankSync, demoStatement } from "../data";
import { landingThemes } from "../theme";
import { reveal } from "../useReveal";
import * as S from "./styles";

const IMPORT_STEPS = [
  "Você envia o arquivo do extrato do banco ou da fatura do cartão.",
  "A Thryve lê as transações e cria pré-cadastros de receitas e despesas.",
  "Você revisa, completa o que faltou e confirma.",
];

const BANK_STEPS = [
  "Você autoriza a conexão com o seu banco por meio da Pluggy.",
  "As novas movimentações da conta chegam à Thryve como pré-cadastros.",
  "Você revisa, ajusta o que for preciso e confirma o lançamento.",
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
          lead="Três funcionalidades em construção para reduzir o trabalho manual de registrar cada movimentação. Em todas, nenhum lançamento é confirmado sem passar pela sua revisão."
        />

        <S.FeatureRow>
          <S.Feature {...reveal(0)}>
            <S.FeatureTitle>
              <h3>
                Importação inteligente
                <br />
                de extratos
              </h3>
            </S.FeatureTitle>
            <S.FeatureSteps>
              {IMPORT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </S.FeatureSteps>
            <S.Aside>
              Não depende de conexão com o banco. Você escolhe o arquivo e
              decide o que entra.
            </S.Aside>
          </S.Feature>
          <S.FeatureVisual {...reveal(1)}>
            <ReviewPreview
              source={demoStatement}
              origin="file"
              footer="Nada é salvo antes da sua confirmação."
            />
          </S.FeatureVisual>
        </S.FeatureRow>

        <S.FeatureRow $reverse>
          <S.Feature {...reveal(0)}>
            <S.FeatureTitle>
              <h3>
                Conexão com o seu banco
                <br />
                pela Pluggy
              </h3>
            </S.FeatureTitle>
            <S.FeatureSteps>
              {BANK_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </S.FeatureSteps>
            <S.Aside>
              O que você gasta no banco aparece na Thryve, mas só vira
              lançamento depois da sua confirmação.
            </S.Aside>
          </S.Feature>
          <S.FeatureVisual {...reveal(1)}>
            <ReviewPreview
              source={demoBankSync}
              origin="bank"
              footer="Cada movimentação espera a sua revisão."
            />
          </S.FeatureVisual>
        </S.FeatureRow>

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
