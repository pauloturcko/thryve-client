import { styled } from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
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

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 2.75rem;
  padding: 10px 14px 10px 14px;
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
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);

  border: none;
  background: transparent;
  cursor: pointer;
`;
