import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
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

export const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
