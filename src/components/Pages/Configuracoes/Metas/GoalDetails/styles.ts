import { styled } from "styled-components";

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Progress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

export const ProgressHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.75rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Track = styled.div`
  position: relative;
  height: 0.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const Fill = styled.span`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.ringAccent};
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const Milestone = styled.span<{ $reached: boolean }>`
  position: absolute;
  top: -0.2rem;
  bottom: -0.2rem;
  width: 2px;
  margin-left: -1px;
  border-radius: 1px;
  background: ${({ theme, $reached }) =>
    $reached ? theme.colors.surface : theme.colors.border};
`;

export const CompleteButton = styled.button`
  align-self: flex-start;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
  border: 1px solid ${({ theme }) => `${theme.colors.success}40`};
  background-color: ${({ theme }) => `${theme.colors.success}14`};
  transition:
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.success};
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Details = styled.dl`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.surface};

  div {
    display: grid;
    grid-template-columns: 9rem minmax(0, 1fr);
    gap: 1rem;
    padding: 0.85rem 1rem;
  }

  div + div {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  dt {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.92rem;
    white-space: pre-line;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    div {
      grid-template-columns: 1fr;
      gap: 0.2rem;
    }
  }
`;

export const Overdue = styled.span`
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => `${theme.colors.warning}1f`};
`;
