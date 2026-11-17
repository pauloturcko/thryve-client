"use client";

import { useRef } from "react";
import { Control } from "./Control";
import { LandingFooter } from "./Footer";
import { LandingHeader } from "./Header";
import { Hero } from "./Hero";
import { Manifesto } from "./Manifesto";
import { Progress } from "./Progress";
import { Technology } from "./Technology";
import { useReveal } from "./useReveal";
import * as S from "./styles";

export const LandingPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <S.Root ref={rootRef}>
      <S.LandingGlobalStyle />
      <S.SkipLink href="#conteudo">Pular para o conteúdo</S.SkipLink>
      <LandingHeader />
      <main id="conteudo">
        <Hero />
        <Control />
        <Progress />
        <Technology />
        <Manifesto />
      </main>
      <LandingFooter />
    </S.Root>
  );
};
