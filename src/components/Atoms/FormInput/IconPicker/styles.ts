import { styled } from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const Label = styled.span<{ $hasError?: boolean }>`
  font-size: 0.925rem;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.danger : "inherit"};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 2px;
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.75rem, 1fr));
  gap: 0.5rem;
`;

export const IconOption = styled.button<{
  $selected: boolean;
  $color?: string;
}>`
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background-color 0.15s;
  border: 1px solid
    ${({ $selected, $color, theme }) =>
      $selected ? ($color ?? theme.colors.primary) : theme.colors.border};
  background-color: ${({ $selected, $color, theme }) =>
    $selected
      ? $color
        ? `${$color}26`
        : theme.colors.primarySoft
      : theme.colors.background};
  color: ${({ $selected, $color, theme }) =>
    $selected ? ($color ?? theme.colors.primary) : theme.colors.textSecondary};

  &:hover {
    border-color: ${({ $selected, $color, theme }) =>
      $selected ? ($color ?? theme.colors.primary) : theme.colors.textMuted};
    color: ${({ $selected, $color, theme }) =>
      $selected ? ($color ?? theme.colors.primary) : theme.colors.textPrimary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
