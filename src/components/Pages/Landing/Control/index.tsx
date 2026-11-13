"use client";

import { Section } from "../Section";
import { SectionHeading } from "../SectionHeading";
import { Accent, Container } from "../styles";
import { reveal } from "../useReveal";
import { FeatureCard } from "./FeatureCard";
import { AccountsSpecimen } from "./specimens/AccountsSpecimen";
import { CategoriesSpecimen } from "./specimens/CategoriesSpecimen";
import { DashboardSpecimen } from "./specimens/DashboardSpecimen";
import { InstallmentsSpecimen } from "./specimens/InstallmentsSpecimen";
import { RotatingFeatureCard } from "./RotatingFeatureCard";
import { TransactionsSpecimen } from "./specimens/TransactionsSpecimen";
import * as S from "./styles";

export const Control = () => (
  <Section
    id="controle"
    tone="light"
    grain
    labelledBy="controle-title"
  >
    <Container>
      <S.Inner>
        <SectionHeading
          titleId="controle-title"
          title={
            <>
              Seu mês inteiro, em uma <Accent>única visão.</Accent>
            </>
          }
          lead="Receitas, despesas, contas, cartões e parcelas ficam organizados do seu jeito. Você registra cada movimentação e a Thryve mostra para onde o dinheiro está indo e o que ainda vai vencer."
        />
        <S.Grid>
          <S.Column>
            <S.Cell {...reveal(0)}>
              <FeatureCard title="Dashboard financeiro">
                <DashboardSpecimen />
              </FeatureCard>
            </S.Cell>
            <S.Cell {...reveal(1)}>
              <RotatingFeatureCard
                faces={[
                  {
                    title: "Receitas e despesas",
                    content: <TransactionsSpecimen />,
                  },
                  {
                    title: "Compras parceladas",
                    content: <InstallmentsSpecimen />,
                  },
                ]}
              />
            </S.Cell>
          </S.Column>
          <S.Column>
            <S.Cell {...reveal(1)}>
              <FeatureCard title="Contas bancárias e cartões">
                <AccountsSpecimen />
              </FeatureCard>
            </S.Cell>
            <S.Cell {...reveal(2)}>
              <FeatureCard title="Categorias personalizadas">
                <CategoriesSpecimen />
              </FeatureCard>
            </S.Cell>
          </S.Column>
        </S.Grid>
      </S.Inner>
    </Container>
  </Section>
);
