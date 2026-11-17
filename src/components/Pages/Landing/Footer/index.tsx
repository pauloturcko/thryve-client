"use client";

import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { Logo } from "@/components/Atoms/Logo";
import { NAV_ITEMS } from "../Header";
import { Container } from "../styles";
import { landingThemes } from "../theme";
import * as S from "./styles";

export const LandingFooter = () => (
  <ThemeProvider theme={landingThemes.dark}>
    <S.Footer data-tone="dark">
      <Container>
        <S.Top>
          <S.Brand>
            <Logo height={32} />
            <p lang="en">More than money. A mindset for growth.</p>
          </S.Brand>
          <S.Links>
            <nav aria-label="Seções da página no rodapé">
              <S.GroupLabel>Navegação</S.GroupLabel>
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
            </nav>
            <div>
              <S.GroupLabel>Plataforma</S.GroupLabel>
              <ul>
                <li>
                  <Link href="/login">Acessar a plataforma</Link>
                </li>
              </ul>
            </div>
          </S.Links>
        </S.Top>
        <S.Bottom>
          <span>© 2026 Thryve</span>
          <span>
            Projeto de estudo e portfólio em evolução. Os valores exibidos nesta
            página são fictícios.
          </span>
        </S.Bottom>
      </Container>
    </S.Footer>
  </ThemeProvider>
);
