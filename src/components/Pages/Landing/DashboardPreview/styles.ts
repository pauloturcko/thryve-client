import { keyframes, styled } from "styled-components";

export const PREVIEW_WIDTH = 1180;
export const PREVIEW_HEIGHT = 824;

const draw = keyframes`
  from {
    clip-path: inset(-20% 100% -20% -4%);
  }
  to {
    clip-path: inset(-20% -4% -20% -4%);
  }
`;

export const Window = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${PREVIEW_WIDTH}px;
  height: ${PREVIEW_HEIGHT}px;
  padding: 1.5rem 1.75rem;
  overflow: hidden;
  border-radius: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background:
    radial-gradient(
      60rem 30rem at 15% -10%,
      rgba(${({ theme }) => theme.colors.glowRgb}, 0.16),
      transparent 70%
    ),
    radial-gradient(
      40rem 24rem at 100% 0%,
      ${({ theme }) => theme.colors.accentSoft},
      transparent 70%
    ),
    ${({ theme }) => theme.colors.background};
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ThemeButton = styled.span`
  display: grid;
  place-items: center;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 0.65rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const UserChip = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
`;

export const Hello = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.15;

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.95rem;
    font-weight: 600;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;

  strong {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ChartSlot = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;

  > div {
    flex: 1;
  }

  div:has(> svg) {
    animation: ${draw} 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.9s both;
  }
`;
