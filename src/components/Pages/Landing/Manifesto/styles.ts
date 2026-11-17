import { css, styled } from "styled-components";
import { motion } from "motion/react";
import { armed, beforeReveal, serifType } from "../styles";

export const Watermark = styled(motion.div)`
  position: absolute;
  top: 6%;
  right: max(-6rem, calc(50% - var(--content) / 2 - 10rem));
  z-index: 0;
  height: min(88%, 58rem);
  color: #2f353d;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }

  @media (max-width: 960px) {
    top: auto;
    bottom: 4%;
    right: -30%;
    height: 32rem;
    opacity: 0.6;
  }
`;

export const WatermarkMark = styled.div`
  height: 100%;

  svg {
    height: 100%;
  }

  path {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
  }

  ${beforeReveal(css`
    path {
      stroke-dashoffset: 1;
    }
  `)}

  ${armed(css`
    path {
      transition: stroke-dashoffset 3.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s;
    }
  `)}
`;

export const Page = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  padding-block: clamp(5rem, 11vw, 10rem) clamp(4rem, 8vw, 7rem);
`;

export const Statement = styled.h2`
  ${serifType};
  font-size: clamp(2.75rem, 1rem + 5vw, 6.5rem);
  line-height: 0.98;

  /* Duas linhas fixas no desktop: "Prosperar vai além / de acumular dinheiro." */
  > span {
    display: block;
  }

  em {
    font-style: italic;
  }

  sup {
    margin-left: 0.08em;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.16em;
    font-weight: 500;
    letter-spacing: 0;
    vertical-align: super;
  }

  sup a {
    display: inline-block;
    padding: 0.2em 0.35em;
    border-radius: 0.3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 4.25fr) minmax(0, 3.25fr);
  column-gap: clamp(1.5rem, 4vw, 3.5rem);
  row-gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Lede = styled.p`
  font-size: clamp(1.25rem, 1rem + 0.8vw, 1.6rem);
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-wrap: pretty;

  /* Mantém "futuro." acompanhado na última linha, embaixo da capitular. */
  span {
    white-space: nowrap;
  }

  &::first-letter {
    float: left;
    margin: 0.08em 0.12em 0 0;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 3.9em;
    font-weight: 400;
    line-height: 0.8;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-left: clamp(1.5rem, 4vw, 3.5rem);
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-wrap: pretty;
  }

  @media (max-width: 680px) {
    padding-left: 0;
    border-left: none;
  }
`;

// Verbete de dicionário com a origem do nome.
export const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.1rem 1.2rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.background};
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};

  i {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.15em;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-left: 1.2rem;
    list-style: decimal;
  }

  li::marker {
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    max-width: 24rem;
  }
`;

export const EntryHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;

  dfn {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 2rem;
    font-style: italic;
    font-weight: 400;
    line-height: 1;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.78rem;
  }
`;

export const Closing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding-top: clamp(1rem, 3vw, 2.5rem);
  text-align: center;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p > span {
    display: block;
    font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  p > strong {
    ${serifType};
    display: block;
    margin-top: 0.4rem;
    font-size: clamp(3rem, 1.4rem + 5.4vw, 7rem);
    font-style: italic;
    line-height: 0.95;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ClosingMark = styled.div`
  height: 2.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  svg {
    height: 100%;
  }
`;

export const Colophon = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Footnote = styled.p`
  font-size: 0.85rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  scroll-margin-top: 50vh;

  sup {
    margin-right: 0.35rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  cite {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.15em;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
