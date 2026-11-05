import Link from "next/link";
import { css, styled } from "styled-components";

type DockVars = {
  $base: number;
  $thickness: number;
  $gap: number;
  $reach: number;
};

export const Root = styled.nav<DockVars>`
  --dock-base: ${({ $base }) => `${$base}px`};
  --dock-thickness: ${({ $thickness }) => `${$thickness}px`};
  --dock-pad: ${({ $thickness, $base }) => `${($thickness - $base) / 2}px`};
  --dock-reach: ${({ $reach }) => `${$reach}px`};
  --dock-radius: calc(var(--dock-base) * 0.3);

  position: fixed;
  left: 50%;
  bottom: max(14px, env(safe-area-inset-bottom));
  z-index: 50;
  display: flex;
  align-items: flex-end;
  gap: ${({ $gap }) => `${$gap}px`};
  height: var(--dock-thickness);
  padding: var(--dock-pad);
  transform: translateX(-50%);
  border-radius: calc(var(--dock-radius) + var(--dock-pad));
  background: ${({ theme }) => theme.colors.glass};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? `inset 0 0 0 1px rgba(255, 255, 255, 0.08),
         inset 0 1px 0 rgba(255, 255, 255, 0.07),
         0 22px 44px -20px rgba(0, 0, 0, 0.8),
         0 6px 16px -8px rgba(0, 0, 0, 0.5)`
      : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.07),
         inset 0 1px 0 rgba(255, 255, 255, 0.95),
         0 22px 44px -22px rgba(${theme.colors.shadowRgb}, 0.3),
         0 6px 16px -10px rgba(${theme.colors.shadowRgb}, 0.16)`};
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  backdrop-filter: blur(20px) saturate(1.6);
  touch-action: manipulation;

  /* keeps the pointer "inside" while hovering the magnified overflow */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: calc(var(--dock-reach) + 8px);
    display: none;
  }

  &:hover::before {
    display: block;
  }
`;

const itemReset = css`
  position: relative;
  flex: none;
  width: var(--dock-base);
  height: var(--dock-base);
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;

  &:hover,
  &:focus-visible {
    z-index: 1;
  }
`;

export const ItemLink = styled(Link)`
  ${itemReset}
`;

export const ItemButton = styled.button`
  ${itemReset}
`;

export const Tile = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--dock-base);
  height: var(--dock-base);
  transform-origin: 0 0;
  pointer-events: none;
`;

export const Face = styled.span<{ $active?: boolean; $tone?: "danger" }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--dock-radius);
  color: ${({ theme, $active }) => ($active ? theme.colors.onPrimary : theme.colors.textPrimary)};
  background: ${({ theme, $active }) =>
    $active
      ? theme.colors.gradientPrimary
      : theme.colors.tile};
  box-shadow: ${({ theme, $active }) =>
    $active
      ? `inset 0 0 0 1px rgba(255, 255, 255, 0.18),
         inset 0 1px 0 rgba(255, 255, 255, 0.35),
         0 8px 18px -6px rgba(${theme.colors.glowRgb}, 0.7)`
      : theme.mode === "dark"
        ? `inset 0 0 0 1px rgba(255, 255, 255, 0.07),
           inset 0 1px 0 rgba(255, 255, 255, 0.12),
           0 4px 10px -4px rgba(0, 0, 0, 0.7)`
        : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.08),
           inset 0 1px 0 #FFFFFF,
           0 4px 10px -5px rgba(${theme.colors.shadowRgb}, 0.25)`};
  transition: filter 0.2s ease, color 0.2s ease;

  svg {
    width: 46%;
    height: 46%;
  }

  ${ItemLink}:active &,
  ${ItemButton}:active & {
    filter: brightness(0.8);
    transition-duration: 0s;
  }

  ${ItemLink}:focus-visible &,
  ${ItemButton}:focus-visible & {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 3px;
  }

  ${({ $tone, theme }) =>
    $tone === "danger" &&
    css`
      ${ItemButton}:hover & {
        color: ${theme.colors.danger};
      }
    `}
`;

export const Dot = styled.span`
  position: absolute;
  left: 50%;
  top: calc(100% + max(var(--dock-pad) / 2, 5px) - 2px);
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.ringAccent};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.ringAccent};
  pointer-events: none;
`;

export const Separator = styled.span`
  flex: none;
  align-self: center;
  width: 1px;
  height: calc(var(--dock-base) * 0.72);
  border-radius: 1px;
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : `rgba(${theme.colors.shadowRgb}, 0.12)`};
`;

export const Label = styled.span`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  padding: 6px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.colors.border},
    0 8px 20px -8px rgba(0, 0, 0, 0.35);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;

  ${ItemLink}:focus-visible &,
  ${ItemButton}:focus-visible & {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (hover: hover) and (pointer: fine) {
    ${ItemLink}:hover &,
    ${ItemButton}:hover & {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;
