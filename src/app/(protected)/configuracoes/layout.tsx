"use client";

import styled from "styled-components";
import { ReactNode } from "react";
import { SettingsMenu } from "@/components/Molecules/SettingsMenu";
import { settingsMenuItems } from "@/constants/settingsMenuItems";

export default function Configuracoes({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      <SettingsMenu items={settingsMenuItems} />
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
  /* Avança sobre parte do respiro reservado ao dock, deixando o painel
     quase encostado nele sem gerar scroll na página. */
  margin-bottom: -2rem;

  @media (max-width: 768px) {
    margin-bottom: -1.25rem;
  }
`;

const ContentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: calc(min(68vh, 40rem) + 4rem);
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 1rem;

  @media (max-width: 1024px) {
    min-height: calc(min(68vh, 40rem) + 2.5rem);
    padding: 1.25rem;
  }
`;
