import * as RadixSelect from "@radix-ui/react-select";
import styled, { keyframes } from "styled-components";

const openDown = keyframes`
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const openUp = keyframes`
  from { opacity: 0; transform: translateY(4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
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

export const Trigger = styled(RadixSelect.Trigger)<{
  $hasError?: boolean;
  $compact?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? "2.375rem" : "2.75rem")};
  padding: ${({ $compact }) => ($compact ? "6px 12px" : "10px 14px")};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
  line-height: 1.2;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : theme.colors.surface};
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  > span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: transform 0.16s ease;
  }

  &[data-state="open"] svg {
    transform: rotate(180deg);
  }

  &:hover:not([data-disabled]) {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.textMuted};
  }

  &:focus-visible,
  &[data-state="open"] {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryText};
    box-shadow: 0 0 0 4px rgba(${({ theme }) => theme.colors.glowRgb}, 0.22);
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Content = styled(RadixSelect.Content)`
  z-index: 1000;
  min-width: var(--radix-select-trigger-width);
  max-height: min(18rem, var(--radix-select-content-available-height));
  overflow: hidden;
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 36px -12px
    rgba(${({ theme }) => theme.colors.shadowRgb}, 0.45);
  transform-origin: var(--radix-select-content-transform-origin);

  &[data-side="bottom"] {
    animation: ${openDown} 0.14s ease-out;
  }

  &[data-side="top"] {
    animation: ${openUp} 0.14s ease-out;
  }
`;

export const Viewport = styled(RadixSelect.Viewport)`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Item = styled(RadixSelect.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  user-select: none;
  outline: none;

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }

  &[data-state="checked"] {
    font-weight: 600;
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ItemIndicator = styled(RadixSelect.ItemIndicator)`
  display: flex;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: default;
`;
