import { styled } from "styled-components";
import { GoalStatus } from "@/constants/enums/goal-status-enum";
import {
  AccountHeader,
  AccountInfoWrapper,
  AccountType,
  AccountWrapper,
} from "@/components/Organisms/BankAccountInfo/styles";

export const GoalWrapper = AccountWrapper;
export const GoalHeader = AccountHeader;
export const GoalInfoWrapper = AccountInfoWrapper;
export const Meta = AccountType;

export const Status = styled.span<{ $status: GoalStatus }>`
  flex-shrink: 0;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme, $status }) =>
    $status === GoalStatus.Concluida
      ? theme.colors.success
      : theme.colors.textSecondary};
  background-color: ${({ theme, $status }) =>
    $status === GoalStatus.Concluida
      ? `${theme.colors.success}1f`
      : theme.colors.surfaceElevated};
`;

export const Saved = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;

  small {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1280px) {
    font-size: 1.5rem;
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.35rem;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Track = styled.div`
  flex: 1;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const Fill = styled.span`
  display: block;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.ringAccent};
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
`;
