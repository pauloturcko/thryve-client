import { motion } from "motion/react";
import { styled } from "styled-components";

export const Group = styled.div<{
  $gap: number;
  $radius: number;
  $height: number;
  $font: number;
  $px: number;
}>`
  --jr-radius: ${({ $radius }) => `${$radius}px`};
  --jr-h: ${({ $height }) => `${$height}px`};
  --jr-font: ${({ $font }) => `${$font}px`};
  --jr-px: ${({ $px }) => `${$px}px`};
  --jr-pad-x: 16px;
  --jr-pad-y: 6px;

  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ $gap }) => `${$gap}px`};
  padding: var(--jr-pad-y) var(--jr-pad-x);
  margin: calc(var(--jr-pad-y) * -1) calc(var(--jr-pad-x) * -1);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const Chip = styled(motion.button)`
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;
  transform-origin: 50% 50%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &[data-on="true"] {
    cursor: default;
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }

  &:focus-visible > span {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Skin = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  height: var(--jr-h);
  padding: 0 var(--jr-px);
  border-radius: var(--jr-radius);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: var(--jr-font);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition:
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
    background-color 200ms ease,
    color 200ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.textPrimary};
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    ${Chip}[data-on="false"]:not(:disabled):hover &::before {
      opacity: 0.08;
    }
  }

  ${Chip}:active & {
    transform: scale(0.97);
  }

  ${Chip}[data-on="true"] & {
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 6px 16px -8px ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }

  @media (prefers-reduced-motion: reduce) {
    ${Chip}:active & {
      transform: none;
    }
  }
`;

export const Icon = styled.span`
  display: inline-flex;

  svg {
    width: 1.1em;
    height: 1.1em;
  }
`;
