import { styled } from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: 34rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2rem 2.25rem;
  gap: 1.5rem;

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
