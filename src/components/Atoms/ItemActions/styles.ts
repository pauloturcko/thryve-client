import { styled } from "styled-components";

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  color: inherit;
  cursor: pointer;

  svg {
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 0.4rem;
    transition:
      background-color 0.16s ease,
      border-color 0.16s ease,
      color 0.16s ease;
  }

  &:hover svg {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.danger : "inherit"};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
    border-radius: 0.4rem;
  }
`;
