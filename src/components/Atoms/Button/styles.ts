import { css, styled } from "styled-components";

export type ButtonVariant = "confirm" | "cancel" | "danger";

const variants = {
  confirm: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.hover};
      border-color: ${({ theme }) => theme.colors.hover};
    }
  `,
  cancel: css`
    background: ${({ theme }) => theme.colors.onPrimary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.border};

    &:hover {
      border-color: ${({ theme }) => theme.colors.textMuted};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
    border-color: ${({ theme }) => theme.colors.danger};

    &:hover {
      filter: brightness(1.08);
    }
  `,
};

export const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 6.5rem;
  height: 2.25rem;
  padding: 0 1.125rem;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.16s cubic-bezier(0.2, 0.8, 0.2, 1),
    background-color 0.16s ease,
    border-color 0.16s ease,
    filter 0.16s ease;

  ${({ $variant }) => variants[$variant]};

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;
