"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Logo } from "@/components/Atoms/Logo";
import { landingThemes } from "../theme";
import { useHeaderState } from "./useHeaderState";
import * as S from "./styles";

export const NAV_ITEMS = [
  { id: "controle", label: "Produto" },
  { id: "progresso", label: "Progresso" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "manifesto", label: "Manifesto" },
];

const MENU_ID = "landing-menu";

export const LandingHeader = () => {
  const { tone, activeId, scrolled } = useHeaderState();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const desktop = window.matchMedia(
      `(min-width: ${S.MENU_BREAKPOINT + 1}px)`
    );
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <ThemeProvider theme={landingThemes[tone]}>
      <S.Bar
        data-scrolled={scrolled || menuOpen ? "" : undefined}
        data-open={menuOpen ? "" : undefined}
      >
        <S.Glass>
          <S.Brand
            href="#inicio"
            aria-label="Thryve, voltar ao início"
          >
            <Logo height={32} />
          </S.Brand>
          <S.Nav aria-label="Seções da página">
            <S.NavList>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <S.NavLink
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </S.NavLink>
                </li>
              ))}
            </S.NavList>
          </S.Nav>
          <S.Actions>
            <S.SignIn
              as={Link}
              href="/login"
            >
              Entrar
            </S.SignIn>
            <S.MenuButton
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <S.MenuIcon aria-hidden="true" />
            </S.MenuButton>
          </S.Actions>
        </S.Glass>
        <S.MenuPanel
          id={MENU_ID}
          inert={!menuOpen}
        >
          <nav aria-label="Menu">
            <S.MenuList>
              {NAV_ITEMS.map((item, index) => (
                <li key={item.id}>
                  <S.MenuLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </S.MenuLink>
                </li>
              ))}
            </S.MenuList>
          </nav>
          <S.MenuSignIn
            as={Link}
            href="/login"
            onClick={closeMenu}
          >
            Acessar a plataforma
          </S.MenuSignIn>
        </S.MenuPanel>
      </S.Bar>
    </ThemeProvider>
  );
};
