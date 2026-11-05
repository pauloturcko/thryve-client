import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    right: 15px;
    top: 50%;
    width: 7px;
    height: 7px;
    border-right: 1.5px solid ${({ theme }) => theme.colors.textSecondary};
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.textSecondary};
    transform: translateY(-70%) rotate(45deg);
    pointer-events: none;
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 2px;
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 2.75rem;
  padding: 10px 36px 10px 14px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : theme.colors.surface};
  transition:
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.textMuted};
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryText};
    box-shadow: 0 0 0 4px rgba(${({ theme }) => theme.colors.glowRgb}, 0.22);
  }
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;

  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: -4px;
`;
