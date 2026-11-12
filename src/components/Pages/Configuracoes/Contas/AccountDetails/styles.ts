import { styled } from "styled-components";

export const Amount = styled.span<{ $isIncome: boolean }>`
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $isIncome }) =>
    $isIncome ? theme.colors.success : theme.colors.textPrimary};
`;
