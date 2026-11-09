import { styled } from "styled-components";

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  min-width: 0;
  min-height: 15rem;
  height: auto;
  background: ${({ theme }) =>
    `linear-gradient(150deg, ${theme.colors.background} 0%, ${theme.colors.background} 55%, ${theme.colors.primarySoft} 100%)`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  opacity: 75%;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1280px) {
    padding: 0.875rem 1rem;
    min-height: 14rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: 700;

    @media (max-width: 1280px) {
      font-size: 1.25rem;
    }
  }
`;

export const CardLastFourDigits = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;

  @media (max-width: 1280px) {
    font-size: 1.05rem;
  }
`;

export const CardInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 0.95rem;

  @media (max-width: 1280px) {
    font-size: 0.85rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  span {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
