import { styled } from "styled-components";

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Filters = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.75rem;

  > * {
    flex: 0 1 11rem;
    min-width: 8.5rem;
  }

  > [data-segment] {
    flex: none;
    min-width: 0;
  }

  @media (max-width: 1280px) {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const SummaryGrid = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

export const Section = styled.section`
  width: 100%;
  margin-top: 1.5rem;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;

  span {
    font-size: 0.8rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
`;

export const EmptyState = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2.5rem 1rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;
