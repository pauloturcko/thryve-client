import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 2.375rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const Label = styled.span`
  min-width: 0;
  width: 10.5rem;
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const NavButton = styled.button`
  flex-shrink: 0;
  width: 2.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;
