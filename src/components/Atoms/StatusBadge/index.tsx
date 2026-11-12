import { styled } from "styled-components";

export const StatusBadge = styled.span<{ $isPaid: boolean }>`
  display: inline-flex;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ $isPaid, theme }) =>
    $isPaid ? theme.colors.success : theme.colors.warning};
  background-color: ${({ $isPaid, theme }) =>
    `${$isPaid ? theme.colors.success : theme.colors.warning}1f`};
`;
