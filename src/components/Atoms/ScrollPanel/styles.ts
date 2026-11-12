import { styled } from "styled-components";
import { thinScrollbar } from "@/styles/scrollbar";

export const Box = styled.div`
  position: relative;
  min-width: 0;
  min-height: 18rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 1024px) {
    min-height: 0;
  }
`;

export const Scroll = styled.div<{ $gap: string }>`
  position: absolute;
  inset: 0.75rem 0.375rem 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  padding: 0.5rem 0.875rem 0.5rem 1.25rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  ${thinScrollbar}

  > * {
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    position: static;
    max-height: 26rem;
  }
`;
