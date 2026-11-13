import { styled } from "styled-components";
import {
  AccountHeader,
  AccountInfoWrapper,
  AccountType,
  AccountWrapper,
} from "@/components/Organisms/BankAccountInfo/styles";
import { Actions, Stat } from "@/components/Molecules/EntityDetails/styles";
import { staticPreview } from "../../styles";

export const StaticActions = styled(Actions)`
  ${staticPreview};
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 42fr) minmax(0, 58fr);
  align-items: start;
  gap: 1.25rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -48px rgba(0, 0, 0, 0.9);

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GoalWrapper = styled(AccountWrapper)`
  max-width: none;
  min-height: 0;
`;
export const GoalHeader = styled(AccountHeader)`
  p {
    font-size: 1.2rem;
  }
`;
export const GoalInfoWrapper = AccountInfoWrapper;
export const Meta = AccountType;

export const Saved = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;

  small {
    font-size: 0.85rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CardProgress = styled.div`
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

export const CardTrack = styled.div`
  flex: 1;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const CardFill = styled.span`
  display: block;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.ringAccent};
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;

  ${Stat} {
    padding: 0.8rem 0.85rem;
  }

  ${Stat} strong {
    font-size: 1rem;
    white-space: nowrap;
  }
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

export const Facts = styled.dl`
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
    font-size: 0.92rem;
    line-height: 1.45;
  }

  div:last-child dd {
    min-height: calc(2 * 1.45em);
  }

  @media (max-width: 480px) {
    div {
      grid-template-columns: 1fr;
      gap: 0.2rem;
    }
  }
`;
