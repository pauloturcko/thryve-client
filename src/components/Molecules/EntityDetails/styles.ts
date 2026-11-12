import { styled } from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  h3 {
    font-size: 1.35rem;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  cursor: pointer;
  transition:
    background-color 0.16s ease,
    border-color 0.16s ease,
    color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.danger : theme.colors.textPrimary};
    border-color: ${({ theme, $danger }) =>
      $danger ? `${theme.colors.danger}66` : theme.colors.border};
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div<{ $negative: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.9rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-size: 1.15rem;
    font-variant-numeric: tabular-nums;
    color: ${({ theme, $negative }) =>
      $negative ? theme.colors.danger : theme.colors.textPrimary};
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Description = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  span {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
