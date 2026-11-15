import { styled, keyframes } from "styled-components";

const openDown = keyframes`
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Trigger = styled.button<{ $open: boolean; $empty: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 10px 14px;
  border: 1px solid
    ${({ $open, theme }) =>
      $open ? theme.colors.primaryText : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.2;
  text-align: left;
  color: ${({ $empty, theme }) =>
    $empty ? theme.colors.textMuted : theme.colors.textPrimary};
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : theme.colors.surface};
  box-shadow: ${({ $open, theme }) =>
    $open ? `0 0 0 4px rgba(${theme.colors.glowRgb}, 0.22)` : "none"};
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
    transition: transform 0.16s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryText};
    box-shadow: 0 0 0 4px rgba(${({ theme }) => theme.colors.glowRgb}, 0.22);
  }
`;

export const Content = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 36px -12px
    rgba(${({ theme }) => theme.colors.shadowRgb}, 0.45);
  animation: ${openDown} 0.14s ease-out;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 16rem;
  overflow-y: auto;
  list-style: none;
  outline: none;
`;

export const Item = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.surfaceElevated : "transparent"};
  cursor: pointer;
  user-select: none;

  &[aria-selected="true"] {
    font-weight: 600;
  }

  > span:last-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Checkbox = styled.span<{ $checked: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.3rem;
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : "transparent"};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  padding: 0.4rem 0.5rem 0.2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};

  button {
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceElevated};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primaryText};
      outline-offset: 1px;
    }
  }
`;
