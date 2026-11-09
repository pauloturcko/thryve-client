import { styled } from "styled-components";

export const Nav = styled.nav<{ $pill: string; $activeInk: string }>`
  --gn-pill: ${({ $pill }) => $pill};
  --gn-active-ink: ${({ $activeInk }) => $activeInk};
  --gn-ink: ${({ theme }) => theme.colors.textPrimary};
  --gn-muted: ${({ theme }) => theme.colors.textSecondary};

  position: relative;
  display: inline-flex;
  align-self: flex-start;
  max-width: 100%;
  padding: 6px;
  border-radius: 999px;
  font-size: 14px;
  line-height: 1.2;
  background: ${({ theme }) => theme.colors.glass};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)"
      : `0 22px 44px -22px rgba(${theme.colors.shadowRgb}, 0.3), 0 6px 16px -10px rgba(${theme.colors.shadowRgb}, 0.16)`};
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  backdrop-filter: blur(20px) saturate(1.6);
`;

export const Rim = styled.span`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.07)"
      : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.95)`};
  pointer-events: none;
`;

export const Stage = styled.div`
  position: relative;
  max-width: 100%;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  max-width: none;
  pointer-events: none;
`;

export const Fallback = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  border-radius: 999px;
  background: var(--gn-pill);
  pointer-events: none;
`;

export const List = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ActiveList = styled(List)`
  position: absolute;
  inset: 0;
  color: var(--gn-active-ink);
  visibility: hidden;
  clip-path: inset(100%);
  pointer-events: none;
`;

export const Item = styled.li`
  display: flex;
`;

export const LinkStyle = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--gn-muted);
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  ${ActiveList} & {
    color: inherit;
  }

  ${Item}[data-active] & {
    color: var(--gn-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--gn-ink);
    outline-offset: 2px;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--gn-ink);
    }
  }
`;

export const Icon = styled.span`
  display: inline-flex;
  flex: none;

  svg {
    width: 1.15em;
    height: 1.15em;
  }
`;
