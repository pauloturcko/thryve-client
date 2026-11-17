import { css, keyframes, styled } from "styled-components";

const titleIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 0.35rem, 0);
  }
`;

const fill = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
  padding-block: clamp(4.5rem, 9vw, 8rem);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: start;
  gap: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
`;

export const Cell = styled.div`
  display: flex;
  min-width: 0;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 1.25rem;
  background: #ffffff;
  box-shadow:
    inset 0 0 0 1px rgba(11, 13, 16, 0.07),
    0 1px 0 rgba(11, 13, 16, 0.03),
    0 28px 56px -40px rgba(11, 13, 16, 0.35);
`;

export const Visual = styled.div`
  position: relative;
  padding: clamp(1rem, 2vw, 1.5rem);
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Faces = styled.div`
  display: grid;

  > * {
    grid-area: 1 / 1;
  }
`;

export const Face = styled.div`
  align-self: start;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0, 0.5rem, 0);
  filter: blur(4px);
  transition:
    opacity 0.45s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.45s ease,
    visibility 0s linear 0.6s;

  &[data-active] {
    opacity: 1;
    visibility: visible;
    transform: none;
    filter: none;
    transition-delay: 0.15s, 0.15s, 0.15s, 0s;
  }
`;

export const Caption = styled.div<{ $split?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem clamp(1.25rem, 2.4vw, 1.75rem) 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.textPrimary};

    ${({ $split }) =>
      $split &&
      css`
        animation: ${titleIn} 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
      `}
  }
`;

export const Indicators = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const Indicator = styled.button`
  position: relative;
  width: 1.75rem;
  height: 0.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    inset: -0.75rem -0.2rem;
  }

  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline-offset: 4px;
  }
`;

export const IndicatorFill = styled.span<{
  $duration: number;
  $running: boolean;
}>`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.textPrimary};
  transform-origin: left;
  animation: ${fill} ${({ $duration }) => $duration}ms linear both;
  animation-play-state: ${({ $running }) => ($running ? "running" : "paused")};
`;
