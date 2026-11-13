"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ThemeProvider } from "styled-components";
import { buildTheme } from "@/styles/theme";
import { DashboardPreview } from "../DashboardPreview";
import { Section } from "../Section";
import { Accent, Container, TextLink } from "../styles";
import { usePreviewScale } from "./usePreviewScale";
import * as S from "./styles";

const productTheme = buildTheme("dark");

export const Hero = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  usePreviewScale(frameRef);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "pending") return undefined;
    const frame = requestAnimationFrame(() => {
      root.dataset.intro = "ready";
    });
    return () => {
      cancelAnimationFrame(frame);
      delete root.dataset.intro;
    };
  }, []);

  return (
    <Section
      id="inicio"
      tone="dark"
      labelledBy="hero-title"
    >
      <S.Glow aria-hidden="true" />
      <Container>
        <S.Intro>
          <S.Title id="hero-title">
            <S.TitleLine>Seu dinheiro em ordem.</S.TitleLine>
            <S.TitleLine $muted>
              Sua vida em <Accent>movimento.</Accent>
            </S.TitleLine>
          </S.Title>
          <S.Lower>
            <S.Lead>
              Organize suas finanças, acompanhe sua evolução e veja seus
              objetivos virarem conquistas. Um espaço para entender seu dinheiro
              e construir o futuro com mais clareza.
            </S.Lead>
            <S.Actions>
              <S.PrimaryCta href="#controle">
                Conheça a plataforma
                <ArrowDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </S.PrimaryCta>
              <TextLink
                as={Link}
                href="/login"
              >
                Acessar minha conta
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </TextLink>
            </S.Actions>
          </S.Lower>
        </S.Intro>
      </Container>
      <S.Stage>
        <S.LightBand
          data-tone="light"
          aria-hidden="true"
        />
        <Container>
          <S.Figure>
            <S.Frame
              ref={frameRef}
              aria-hidden="true"
            >
              <S.Scaler>
                <ThemeProvider theme={productTheme}>
                  <DashboardPreview />
                </ThemeProvider>
              </S.Scaler>
            </S.Frame>
          </S.Figure>
        </Container>
      </S.Stage>
    </Section>
  );
};
