import { css, styled } from "styled-components";
import { thinScrollbar } from "@/styles/scrollbar";

type Align = "left" | "center" | "right";

const pinnedRight = css`
  position: sticky;
  right: 0;
  box-shadow: inset 1px 0 0 ${({ theme }) => theme.colors.border};
`;

export const Wrapper = styled.div<{ $maxHeight?: string }>`
  width: 100%;
  max-height: ${({ $maxHeight }) => $maxHeight ?? "none"};
  overflow: auto;
  ${thinScrollbar}

  &::-webkit-scrollbar-track {
    margin: 0.75rem;
  }

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  tbody td {
    transition: background-color 0.16s ease;
  }

  tbody tr:hover > td {
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }

  tbody tr + tr {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const HeaderCell = styled.th<{ $align?: Align; $pinned?: "right" }>`
  padding: 0.75rem 1rem;
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 1;

  ${({ $pinned }) =>
    $pinned &&
    css`
      right: 0;
      z-index: 2;
      box-shadow:
        inset 0 -1px 0 ${({ theme }) => theme.colors.border},
        inset 1px 0 0 ${({ theme }) => theme.colors.border};
    `}
`;

export const Cell = styled.td<{ $align?: Align; $pinned?: "right" }>`
  padding: 0.75rem 1rem;
  text-align: ${({ $align }) => $align ?? "left"};
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textPrimary};

  ${({ $pinned, theme }) =>
    $pinned &&
    css`
      ${pinnedRight}
      background-color: ${theme.colors.background};
    `}
`;

export const EmptyCell = styled.td`
  padding: 2rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
