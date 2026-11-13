"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeProvider } from "styled-components";
import { Logo } from "@/components/Atoms/Logo";
import { NAV_ITEMS } from "../Header";
import { Container, TextLink } from "../styles";
import { landingThemes } from "../theme";
import * as S from "./styles";

export const LandingFooter = () => (
  <ThemeProvider theme={landingThemes.dark}>
    <S.Footer data-tone="dark">
      <Container>
        <S.Top>
          <S.Brand>
            <Logo height={36} />
            <p lang="en">More than money. A mindset for growth.</p>
          </S.Brand>
          <TextLink
            as={Link}
            href="/login"
          >
            Criar conta ou entrar
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.75}
            />
          </TextLink>
        </S.Top>
        <S.Nav aria-label="Seções da página no rodapé">
          <ul>
            <li>
              <a href="#inicio">Início</a>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </S.Nav>
        <S.Bottom>
          <span>© 2026 Thryve. Todos os direitos reservados.</span>
          <span>Os valores exibidos nesta página são fictícios.</span>
        </S.Bottom>
      </Container>
    </S.Footer>
  </ThemeProvider>
);
