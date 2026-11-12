import { styled } from "styled-components";

export const TitleCell = styled.span`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 12rem;
  max-width: 18rem;
  font-weight: 600;

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const IconWrapper = styled.span<{ $color: string }>`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => `${$color}26`};
`;

export const StatusButton = styled.button<{ $isPaid: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
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
  transition:
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    border-color: ${({ $isPaid, theme }) =>
      $isPaid ? theme.colors.success : theme.colors.warning};
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Amount = styled.span<{ $variant: "income" | "expense" }>`
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ $variant, theme }) =>
    $variant === "income" ? theme.colors.success : theme.colors.danger};
`;

export const Actions = styled.span`
  display: inline-flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.textSecondary};

  /* O reset global (svg { max-width: 100% }) faz a coluna da tabela encolher
     a largura do ícone para quase zero; sem o limite, ele usa o tamanho real. */
  svg {
    max-width: none;
  }
`;
