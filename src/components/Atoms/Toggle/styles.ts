import { styled } from "styled-components";

export const Track = styled.button<{ $checked: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.surfaceElevated};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Thumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 0.15rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.surface : theme.colors.textMuted};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transform: translate(${({ $checked }) => ($checked ? "1.25rem" : "0")}, -50%);
  transition: transform 0.2s ease;
`;
