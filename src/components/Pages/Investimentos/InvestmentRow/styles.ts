import { css, keyframes, styled } from "styled-components";
import { InvestmentMovementType } from "@/constants/enums/investment-movement-type-enum";

const open = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -0.35rem, 0);
  }
`;

export const Card = styled.article<{ $muted: boolean }>`
  width: 100%;
  min-width: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  transition: border-color 0.2s ease;

  &[data-expanded] {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  ${({ $muted }) =>
    $muted &&
    css`
      & > div:first-child {
        opacity: 0.75;
      }
    `}
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(9rem, auto) auto;
  grid-template-areas: "toggle yield amount actions";
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "toggle actions"
      "yield amount";
    gap: 0.75rem;
  }
`;

export const Toggle = styled.button`
  grid-area: toggle;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  border-radius: 0.5rem;
  text-align: left;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 4px;
  }
`;

export const IconWrapper = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const Info = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Badge = styled.span`
  flex-shrink: 0;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const Details = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Yield = styled.span<{ $negative: boolean }>`
  grid-area: yield;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.danger : theme.colors.success};
  background-color: ${({ theme, $negative }) =>
    `${$negative ? theme.colors.danger : theme.colors.success}1f`};

  small {
    font-size: 0.75rem;
    opacity: 0.85;
  }
`;

export const Amount = styled.span`
  grid-area: amount;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  font-size: 1.05rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  small {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Chevron = styled.button`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    background-color 0.16s ease,
    color 0.16s ease;

  svg {
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem 1rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${open} 0.3s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const Facts = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.85rem 1rem;
    border-radius: 0.65rem;
    background-color: ${({ theme }) => theme.colors.background};
  }

  dt {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-size: 1rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  small {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

export const QuickAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 2.25rem;
  padding: 0 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Notes = styled.p`
  flex: 1 1 14rem;
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: right;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: left;
  }
`;

export const Movements = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MovementsTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Muted = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MovementList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Movement = styled.li`
  display: grid;
  grid-template-columns: 5.5rem 7rem minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 640px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas:
      "date type actions"
      "notes notes value";
    row-gap: 0.25rem;

    > :nth-child(1) {
      grid-area: date;
    }
    > :nth-child(2) {
      grid-area: type;
      justify-self: start;
    }
    > :nth-child(3) {
      grid-area: notes;
    }
    > :nth-child(4) {
      grid-area: value;
    }
    > :nth-child(5) {
      grid-area: actions;
    }
  }
`;

export const MovementDate = styled.span`
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const typeTone = {
  [InvestmentMovementType.Aporte]: "textPrimary",
  [InvestmentMovementType.Resgate]: "warning",
  [InvestmentMovementType.Rendimento]: "success",
} as const;

export const MovementType = styled.span<{ $type: number }>`
  justify-self: start;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme, $type }) =>
    theme.colors[typeTone[$type as InvestmentMovementType] ?? "textPrimary"]};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const MovementNotes = styled.span`
  min-width: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Signed = styled.span<{ $negative: boolean }>`
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-align: right;
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.danger : theme.colors.success};
`;
