import { styled } from "styled-components";
import { PAPER_NOISE } from "../styles";

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
  padding-block: clamp(5rem, 10vw, 9rem);
`;

export const FeatureRow = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $reverse }) =>
    $reverse
      ? "minmax(0, 7fr) minmax(0, 1fr) minmax(0, 4fr)"
      : "minmax(0, 4fr) minmax(0, 1fr) minmax(0, 7fr)"};
  grid-template-areas: ${({ $reverse }) =>
    $reverse ? '"visual . feature"' : '"feature . visual"'};
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "feature"
      "visual";
    row-gap: 2rem;
  }
`;

export const Feature = styled.div`
  grid-area: feature;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FeatureTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.85rem;

  h3 {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const FeatureSteps = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    padding: 0.85rem 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.98rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Aside = styled.p`
  padding-left: 0.9rem;
  border-left: 2px solid ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FeatureVisual = styled.div`
  grid-area: visual;
`;

// Um pouco mais largo que a coluna de conteúdo (e que o header), para o
// conteúdo se distribuir na horizontal e o palco ficar mais baixo.
export const Stage = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  width: min(calc(100vw - var(--gutter)), calc(var(--content) + 6rem));
  margin-inline: calc(
    (100% - min(100vw - var(--gutter), var(--content) + 6rem)) / 2
  );
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 5vw, 4.5rem);
  overflow: hidden;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background:
    radial-gradient(
      40rem 32rem at 78% 55%,
      rgba(230, 234, 240, 0.07),
      transparent 70%
    ),
    ${({ theme }) => theme.colors.background};
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 60px 120px -60px rgba(11, 13, 16, 0.6);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: ${PAPER_NOISE};
    background-size: 180px 180px;
    opacity: 0.05;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  @media (max-width: 720px) {
    width: auto;
    margin-inline: calc(var(--gutter) * -0.5);
    border-radius: 1.5rem;
  }
`;

export const StageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StageLead = styled.p`
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-wrap: pretty;
`;
