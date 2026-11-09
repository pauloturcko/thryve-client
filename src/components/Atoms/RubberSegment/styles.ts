import { motion } from "motion/react";
import { styled } from "styled-components";

type TrackVars = {
  $height: number;
  $font: number;
  $pad: number;
  $min: number;
  $fullWidth: boolean;
};

export const Track = styled.div<TrackVars>`
  --rs-inset: 3px;
  --rs-thumb-radius: 9px;
  --rs-h: ${({ $height }) => `${$height}px`};
  --rs-font: ${({ $font }) => `${$font}px`};
  --rs-pad: ${({ $pad }) => `${$pad}px`};
  --rs-min: ${({ $min }) => `${$min}px`};

  position: relative;
  display: ${({ $fullWidth }) => ($fullWidth ? "grid" : "inline-grid")};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  vertical-align: middle;
  padding: var(--rs-inset);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  &[data-held],
  &[data-held] button {
    cursor: grabbing;
  }
`;

export const Item = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: calc(var(--rs-h) - var(--rs-inset) * 2);
  min-width: var(--rs-min);
  padding: 0 var(--rs-pad);
  border-radius: var(--rs-thumb-radius);
  color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0.65;
  font: inherit;
  font-size: var(--rs-font);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    opacity 160ms ease,
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);

  &[aria-checked="true"] {
    cursor: grab;
  }

  &[data-pressed] {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 3px;
  }

  @media (hover: hover) and (pointer: fine) {
    &[aria-checked="false"]:hover {
      opacity: 0.9;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 160ms ease;
  }
`;

export const Thumb = styled(motion.div)`
  position: absolute;
  inset: var(--rs-inset);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.hover} 0%, ${theme.colors.primary} 100%)`};
  color: ${({ theme }) => theme.colors.onPrimary};
  pointer-events: none;
`;

export const Copy = styled(Item)`
  color: inherit;
  opacity: 1;
  cursor: default;
`;
