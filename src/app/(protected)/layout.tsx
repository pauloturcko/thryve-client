"use client";

import { AppDock } from "@/components/Organisms/AppDock";
import { TopBar } from "@/components/Organisms/TopBar";
import styled from "styled-components";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      <ContentContainer>
        <TopBar />
        {children}
      </ContentContainer>
      <AppDock />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background:
    radial-gradient(
      60rem 30rem at 15% -10%,
      rgba(${({ theme }) => theme.colors.glowRgb}, ${({ theme }) => (theme.mode === "dark" ? 0.16 : 0.08)}),
      transparent 70%
    ),
    radial-gradient(40rem 24rem at 100% 0%, ${({ theme }) => theme.colors.accentSoft}, transparent 70%),
    ${({ theme }) => theme.colors.background};
`;

const ContentContainer = styled.main`
  width: 100%;
  max-width: 1440px;
  min-width: 0;
  margin: 0 auto;
  padding: 1.5rem 2rem 8rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 1280px) {
    padding: 1.25rem 1.25rem 7.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 7rem;
  }
`;
