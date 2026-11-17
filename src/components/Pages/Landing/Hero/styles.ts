import { css, keyframes, styled } from "styled-components";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "../DashboardPreview/styles";
import { PAPER_NOISE } from "../styles";

const rise = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 1.5rem, 0);
  }
`;

const riseSoft = keyframes`
  from {
    opacity: 0;
    filter: blur(6px);
    transform: translate3d(0, 1.25rem, 0);
  }
`;

const present = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 3rem, 0) scale(0.96);
  }
`;

export const intro = (animation: ReturnType<typeof css>) => css`
  html[data-intro="pending"] & {
    opacity: 0;
  }

  html[data-intro="ready"] & {
    ${animation};
  }
`;

const enter = (delay: number) =>
  intro(css`
    animation: ${rise} 0.9s var(--ease-out) ${delay}ms both;
  `);

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      70rem 40rem at 12% -12%,
      rgba(248, 250, 252, 0.1),
      transparent 70%
    ),
    radial-gradient(
      48rem 30rem at 96% 6%,
      rgba(180, 187, 197, 0.06),
      transparent 70%
    );
  pointer-events: none;
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.25rem);
  padding-top: calc(5.5rem + clamp(2.5rem, 8vh, 6rem));
  padding-bottom: clamp(2.75rem, 6vh, 4.5rem);
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(2.6rem, 1rem + 5.4vw, 5.75rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
  text-wrap: balance;

  em {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const TitleLine = styled.span<{ $muted?: boolean }>`
  display: block;
  color: ${({ theme, $muted }) =>
    $muted ? theme.colors.textMuted : theme.colors.textPrimary};
  ${({ $muted }) =>
    intro(css`
      animation: ${riseSoft} 1.1s var(--ease-out) ${$muted ? 220 : 100}ms both;
    `)};
`;

export const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Lead = styled.p`
  max-width: 32rem;
  font-size: clamp(0.98rem, 0.94rem + 0.2vw, 1.075rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  text-wrap: pretty;
  ${enter(300)};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.75rem;
  ${enter(380)};
`;

export const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  height: 3.125rem;
  padding: 0 1.4rem;
  border-radius: 0.8rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 14px 30px -16px rgba(248, 250, 252, 0.45);
  transition:
    background-color 0.2s ease,
    transform 0.16s var(--ease-out);

  svg {
    width: 1.05rem;
    height: 1.05rem;
    transition: transform 0.35s var(--ease-out);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.hover};
    }

    &:hover svg {
      transform: translateY(2px);
    }
  }
`;

export const Stage = styled.div`
  position: relative;
  padding-bottom: clamp(3rem, 6vw, 5rem);
`;

export const LightBand = styled.div`
  position: absolute;
  inset: 52% 0 -1px;
  background: #f8fafc;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${PAPER_NOISE};
    background-size: 180px 180px;
    opacity: 0.07;
    mix-blend-mode: multiply;
  }
`;

// Mesmas regras de largura do header (padding lateral e largura máxima), para
// a prévia alinhar exatamente com as bordas dele.
export const HeaderWidth = styled.div`
  position: relative;
  z-index: 1;
  padding-inline: var(--gutter);

  > * {
    max-width: calc(var(--content) + 1.5rem);
    margin-inline: auto;
  }
`;

export const Figure = styled.figure`
  ${intro(css`
    animation: ${present} 1.4s cubic-bezier(0.16, 1, 0.3, 1) 550ms both;
  `)};
`;

export const Frame = styled.div`
  /* 1240 / 1180: largura do header sobre a largura da janela. */
  --scale: 1.0508;
  position: relative;
  height: calc(${PREVIEW_HEIGHT}px * var(--scale));

  @media (max-width: 1259px) {
    --scale: 0.8;
  }

  @media (max-width: 1023px) {
    --scale: 0.62;
  }

  @media (max-width: 720px) {
    --scale: 0.5;
  }
`;

export const Scaler = styled.div`
  width: ${PREVIEW_WIDTH}px;
  transform: scale(var(--scale));
  transform-origin: 0 0;
  border-radius: 1.5rem;
  box-shadow:
    0 50px 100px -40px rgba(0, 0, 0, 0.85),
    0 30px 60px -30px rgba(0, 0, 0, 0.6);
`;
