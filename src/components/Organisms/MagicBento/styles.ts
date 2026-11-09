import { css, styled } from "styled-components";

const FALLOFF = [1, 0.973, 0.837, 0.593, 0.317, 0.104, 0.009];

const radialGlow = (size: string, alpha: string, amount: string) =>
  `radial-gradient(
    ${size} circle at var(--mb-x, -999px) var(--mb-y, -999px),
    ${FALLOFF.map(
      (f, i) =>
        `rgba(var(--mb-glow-rgb), calc(${alpha} * var(${amount}, 0) * ${f})) ${i * 15}%`
    ).join(",\n    ")},
    rgba(var(--mb-glow-rgb), 0) 100%
  )`;

const waveRing = `radial-gradient(
  circle at var(--mb-wx, -999px) var(--mb-wy, -999px),
  rgba(var(--mb-glow-rgb), 0) calc(var(--mb-wr, 0px) - 110px),
  rgba(var(--mb-glow-rgb), calc(var(--mb-glow-alpha) * var(--mb-wa, 0) * 0.1)) calc(var(--mb-wr, 0px) - 80px),
  rgba(var(--mb-glow-rgb), calc(var(--mb-glow-alpha) * var(--mb-wa, 0) * 0.32)) calc(var(--mb-wr, 0px) - 52px),
  rgba(var(--mb-glow-rgb), calc(var(--mb-glow-alpha) * var(--mb-wa, 0) * 0.68)) calc(var(--mb-wr, 0px) - 28px),
  rgba(var(--mb-glow-rgb), calc(var(--mb-glow-alpha) * var(--mb-wa, 0) * 0.94)) calc(var(--mb-wr, 0px) - 10px),
  rgba(var(--mb-glow-rgb), calc(var(--mb-glow-alpha) * var(--mb-wa, 0))) calc(var(--mb-wr, 0px) - 3px),
  rgba(var(--mb-glow-rgb), 0) var(--mb-wr, 0px)
)`;

export const Grid = styled.div<{
  $cols: number;
  $rowHeight: number;
  $gap: number;
  $radius: number;
  $spot: number;
}>`
  --mb-spring: cubic-bezier(0.34, 1.4, 0.64, 1);
  --mb-glow-rgb: ${({ theme }) => theme.colors.glowRgb};
  --mb-glow-alpha: ${({ theme }) => (theme.mode === "dark" ? 0.9 : 0.55)};
  --mb-spot-alpha: ${({ theme }) => (theme.mode === "dark" ? 0.11 : 0.06)};
  --mb-radius: ${({ $radius }) => `${$radius}px`};
  --mb-pad: ${({ $radius }) =>
    `${Math.round(Math.min(22, Math.max(14, $radius * 0.9)))}px`};
  --mb-spot-size: ${({ $spot }) => `${$spot}px`};
  --mb-border-size: ${({ $spot }) => `${Math.round($spot * 0.75)}px`};

  position: relative;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(${({ $cols }) => $cols}, minmax(0, 1fr));
  grid-auto-rows: ${({ $cols, $rowHeight }) =>
    $cols === 1
      ? `minmax(${Math.round($rowHeight * 0.7)}px, auto)`
      : `${$rowHeight}px`};
  gap: ${({ $gap }) => `${$gap}px`};
  width: 100%;
  color: ${({ theme }) => theme.colors.textPrimary};
  -webkit-tap-highlight-color: transparent;
`;

export const Cell = styled.div`
  position: relative;
  min-width: 0;
  min-height: 0;
  --mb-delay: 0ms;

  ${Grid}[data-intro] & {
    opacity: 0;
    transform: translate3d(0, 16px, 0) scale(0.97);
  }

  ${Grid}[data-intro] &[data-state="in"] {
    opacity: 1;
    transform: none;
    transition:
      opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) var(--mb-delay),
      transform 760ms var(--mb-spring) var(--mb-delay);
  }
`;

export const Card = styled.div<{ $clickable?: boolean; $tone?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--mb-radius);
  isolation: isolate;
  outline: none;
  color: inherit;
  text-align: left;
  background: ${({ theme, $tone }) => ($tone ? $tone : theme.colors.card)};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 24px 48px -28px rgba(0, 0, 0, 0.85), 0 8px 18px -12px rgba(0, 0, 0, 0.6)"
      : `0 24px 48px -30px rgba(${theme.colors.shadowRgb}, 0.28), 0 8px 18px -14px rgba(${theme.colors.shadowRgb}, 0.16)`};
  transform: perspective(900px)
    translate3d(var(--mb-tx, 0px), var(--mb-ty, 0px), 0)
    rotateX(var(--mb-rx, 0deg)) rotateY(var(--mb-ry, 0deg))
    scale(var(--mb-press, 1));
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryText};
  }
`;

export const Light = styled.span`
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background: ${radialGlow(
    "var(--mb-spot-size)",
    "var(--mb-spot-alpha)",
    "--mb-hot"
  )};
  pointer-events: none;
`;

export const Rim = styled.span`
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "inset 0 0 0 1px rgba(255, 255, 255, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
      : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.08), inset 0 1px 0 #FFFFFF`};
  pointer-events: none;
`;

export const Border = styled.span`
  position: absolute;
  inset: 0;
  z-index: 4;
  padding: 1px;
  border-radius: inherit;
  background:
    ${radialGlow("var(--mb-border-size)", "var(--mb-glow-alpha)", "--mb-near")},
    ${waveRing};
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
  pointer-events: none;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  padding: var(--mb-pad);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

export const IconBadge = styled.span<{ $color?: string }>`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex: none;
  border-radius: 0.65rem;
  color: ${({ $color, theme }) => $color ?? theme.colors.textPrimary};
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : `rgba(${theme.colors.shadowRgb}, 0.04)`};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "inset 0 0 0 1px rgba(255, 255, 255, 0.07)"
      : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.07)`};

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const figure = css`
  font-family: ${({ theme }) => theme.fonts.display};
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
`;

export const Figure = styled.p<{ $color?: string; $size?: "md" | "lg" | "xl" }>`
  ${figure};
  font-weight: 600;
  font-size: ${({ $size }) =>
    $size === "xl"
      ? "clamp(2.25rem, 4vw, 3.25rem)"
      : $size === "lg"
        ? "clamp(1.75rem, 2.6vw, 2.25rem)"
        : "1.5rem"};
  color: ${({ $color, theme }) => $color ?? theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Note = styled.p<{ $color?: string }>`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ $color, theme }) => $color ?? theme.colors.textSecondary};
  text-wrap: pretty;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: auto;
`;

export const Visual = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  justify-content: flex-end;
`;
