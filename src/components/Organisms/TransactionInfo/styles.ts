import { styled } from "styled-components";

export const TransactionWrapper = styled.div`
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto minmax(8rem, auto) auto;
  grid-template-areas: "icon info status amount actions";
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas:
      "icon info actions"
      "footer footer footer";
    gap: 0.75rem;
  }
`;

export const Footer = styled.div`
  display: contents;

  @media (max-width: 768px) {
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
`;

export const IconWrapper = styled.div<{ $color: string }>`
  grid-area: icon;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => `${$color}26`};
`;

export const Info = styled.div`
  grid-area: info;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Details = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatusButton = styled.button<{ $isPaid: boolean }>`
  grid-area: status;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ $isPaid, theme }) =>
    $isPaid ? theme.colors.success : theme.colors.warning};
  background-color: ${({ $isPaid, theme }) =>
    `${$isPaid ? theme.colors.success : theme.colors.warning}1f`};
  border: 1px solid
    ${({ $isPaid, theme }) =>
      `${$isPaid ? theme.colors.success : theme.colors.warning}40`};

  svg {
    flex-shrink: 0;
  }

  &:hover {
    border-color: ${({ $isPaid, theme }) =>
      $isPaid ? theme.colors.success : theme.colors.warning};
  }
`;

export const Amount = styled.span<{ $variant: "income" | "expense" }>`
  grid-area: amount;
  justify-self: end;
  font-size: 1.05rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${({ $variant, theme }) =>
    $variant === "income" ? theme.colors.success : theme.colors.danger};
`;

export const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    display: flex;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  svg {
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 0.4rem;
  }

  button:hover svg {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
    border-color: ${({ theme }) => theme.colors.border};
  }

  .trashIcon:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;
