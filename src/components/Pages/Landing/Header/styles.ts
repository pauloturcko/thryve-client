import { css, keyframes, styled } from "styled-components";

const dropIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -1.25rem, 0);
  }
`;

export const MENU_BREAKPOINT = 860;

const glassSurface = css`
  --glass-fill: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(21, 24, 29, 0.68)"
      : "rgba(248, 250, 252, 0.72)"};
  --glass-edge: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 255, 255, 0.09)"
      : "rgba(11, 13, 16, 0.08)"};
  --glass-rim: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 255, 255, 0.14)"
      : "rgba(255, 255, 255, 0.95)"};
  --glass-drop: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(11, 13, 16, 0.22)"};

  background-color: var(--glass-fill);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  backdrop-filter: blur(18px) saturate(1.5);
  box-shadow:
    inset 0 0 0 1px var(--glass-edge),
    inset 0 1px 0 var(--glass-rim),
    0 18px 40px -24px var(--glass-drop);
`;

export const Bar = styled.header`
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem var(--gutter) 0;
  pointer-events: none;

  html[data-intro="pending"] & {
    opacity: 0;
  }

  html[data-intro="ready"] & {
    animation: ${dropIn} 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.textPrimary};
    outline-offset: 2px;
  }
`;

export const Glass = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: calc(var(--content) + 1.5rem);
  height: 3.5rem;
  padding: 0 0.5rem 0 1.1rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  pointer-events: auto;
  transition:
    background-color 0.45s var(--ease-out),
    box-shadow 0.45s var(--ease-out),
    backdrop-filter 0.45s var(--ease-out),
    -webkit-backdrop-filter 0.45s var(--ease-out),
    color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      linear-gradient(
        104deg,
        transparent 28%,
        rgba(
            255,
            255,
            255,
            ${({ theme }) => (theme.mode === "dark" ? 0.06 : 0.5)}
          )
          44%,
        transparent 60%
      ),
      linear-gradient(
        180deg,
        rgba(
          255,
          255,
          255,
          ${({ theme }) => (theme.mode === "dark" ? 0.05 : 0.4)}
        ),
        transparent 45%
      );
    opacity: 0;
    transition: opacity 0.45s var(--ease-out);
    pointer-events: none;
  }

  ${Bar}[data-scrolled] & {
    ${glassSurface};
  }

  ${Bar}[data-scrolled] &::before {
    opacity: 1;
  }

  @media (max-width: ${MENU_BREAKPOINT}px) {
    gap: 0.75rem;
    height: 3.25rem;
    padding-left: 0.95rem;
  }
`;

export const Brand = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  flex: none;
  padding: 0.35rem 0;
  border-radius: 0.4rem;

  svg {
    color: inherit;
    transition: color 0.3s ease;
  }
`;

export const Nav = styled.nav`
  position: relative;
  margin-inline: auto;

  @media (max-width: ${MENU_BREAKPOINT}px) {
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const NavLink = styled.a`
  position: relative;
  display: block;
  padding: 0.5rem 0.85rem;
  border-radius: 0.6rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0.3rem;
    width: 0.25rem;
    height: 0.25rem;
    margin-left: -0.125rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0;
    transform: scale(0.25);
    transition:
      opacity 0.3s var(--ease-out),
      transform 0.3s var(--ease-out);
  }

  &[aria-current="true"] {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &[aria-current="true"]::after {
    opacity: 1;
    transform: none;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      background-color: ${({ theme }) =>
        theme.mode === "dark"
          ? "rgba(255, 255, 255, 0.06)"
          : "rgba(11, 13, 16, 0.05)"};
    }
  }
`;

export const Actions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  @media (max-width: ${MENU_BREAKPOINT}px) {
    margin-left: auto;
  }
`;

export const SignIn = styled.a`
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 1.1rem;
  border-radius: 0.7rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition:
    background-color 0.2s ease,
    transform 0.16s var(--ease-out);

  &:active {
    transform: scale(0.97);
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.hover};
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.7rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: background-color 0.2s ease;

  &:active {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(11, 13, 16, 0.06)"};
  }

  @media (max-width: ${MENU_BREAKPOINT}px) {
    display: grid;
  }
`;

export const MenuIcon = styled.span`
  position: relative;
  width: 1.1rem;
  height: 0.6rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1.5px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.35s var(--ease-out);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  ${Bar}[data-open] &::before {
    transform: translateY(0.27rem) rotate(45deg);
  }

  ${Bar}[data-open] &::after {
    transform: translateY(-0.27rem) rotate(-45deg);
  }
`;

export const MenuPanel = styled.div`
  ${glassSurface};
  display: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  pointer-events: auto;
  opacity: 0;
  transform: translate3d(0, -0.5rem, 0) scale(0.98);
  transform-origin: top center;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.3s var(--ease-out),
    visibility 0s linear 0.3s;

  ${Bar}[data-open] & {
    opacity: 1;
    transform: none;
    visibility: visible;
    transition:
      opacity 0.25s ease,
      transform 0.35s var(--ease-out),
      visibility 0s;
  }

  @media (max-width: ${MENU_BREAKPOINT}px) {
    display: block;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MenuLink = styled.a`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.03em;

  li + li & {
    border-top: 1px solid var(--glass-edge);
    border-radius: 0;
  }
`;

export const MenuSignIn = styled(SignIn)`
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  font-size: 0.95rem;
`;
