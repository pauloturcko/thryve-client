import { createGlobalStyle, css, RuleSet, styled } from "styled-components";

export const PAPER_NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const paperGrain = css`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: ${PAPER_NOISE};
    background-size: 180px 180px;
    opacity: ${({ theme }) => (theme.mode === "dark" ? 0.05 : 0.07)};
    mix-blend-mode: ${({ theme }) =>
      theme.mode === "dark" ? "soft-light" : "multiply"};
    pointer-events: none;
  }
`;

export const LandingGlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5.5rem;
  }

  body {
    background: #0B0D10;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;

export const Root = styled.div`
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --gutter: clamp(1rem, 4vw, 2.5rem);
  --content: 76rem;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0b0d10;
  font-family: ${({ theme }) => theme.fonts.sans};

  [data-tone="dark"] :focus-visible,
  [data-tone="light"] [data-tone="dark"] :focus-visible {
    outline-color: #f8fafc;
  }

  [data-tone="light"] :focus-visible,
  [data-tone="dark"] [data-tone="light"] :focus-visible {
    outline-color: #0b0d10;
  }

  [data-tone="dark"] ::selection,
  [data-tone="light"] [data-tone="dark"] ::selection {
    background: #f8fafc;
    color: #0b0d10;
  }

  [data-tone="light"] ::selection,
  [data-tone="dark"] [data-tone="light"] ::selection {
    background: #0b0d10;
    color: #f8fafc;
  }

  &[data-motion] [data-reveal]:not([data-inview]) {
    opacity: 0;
    transform: translate3d(0, 1.5rem, 0);
  }

  &[data-motion-armed] [data-reveal] {
    transition:
      opacity 0.8s var(--ease-out) calc(var(--reveal-order, 0) * 90ms),
      transform 1s var(--ease-out) calc(var(--reveal-order, 0) * 90ms);
  }
`;

export const SkipLink = styled.a`
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 60;
  padding: 0.75rem 1rem;
  border-radius: 0.6rem;
  background: #f8fafc;
  color: #0b0d10;
  font-size: 0.9rem;
  font-weight: 600;
  transform: translateY(-200%);

  &:focus-visible {
    transform: none;
    outline: 2px solid #0b0d10;
    outline-offset: 2px;
  }
`;

export const beforeReveal = (rules: RuleSet<object>) => css`
  [data-motion] [data-reveal]:not([data-inview]) & {
    ${rules};
  }
`;

export const armed = (rules: RuleSet<object>) => css`
  [data-motion-armed] & {
    ${rules};
  }
`;

export const staticPreview = css`
  pointer-events: none;
  cursor: default;
  user-select: none;

  * {
    cursor: default;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: calc(var(--content) + var(--gutter) * 2);
  margin: 0 auto;
  padding-inline: var(--gutter);
`;

export const displayType = css`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.04;
  text-wrap: balance;
`;

export const serifType = css`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
  letter-spacing: -0.012em;
  line-height: 1.02;
  text-wrap: balance;
`;

export const monoLabel = css`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
`;

export const Accent = styled.em`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.1em;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DevelopmentTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.65rem 0.3rem 0.55rem;
  border-radius: 999px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::before {
    content: "";
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    border: 1.5px solid currentColor;
  }
`;

export const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: linear-gradient(currentColor, currentColor) 0 100% / 100% 1px
    no-repeat;
  transition: background-size 0.35s var(--ease-out);

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.35s var(--ease-out);
  }

  @media (hover: hover) {
    &:hover {
      background-size: 0% 1px;
      background-position: 100% 100%;
    }

    &:hover svg {
      transform: translateX(3px);
    }
  }
`;
