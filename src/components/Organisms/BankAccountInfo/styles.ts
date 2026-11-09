import { styled } from "styled-components";

export const AccountWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  min-width: 0;
  min-height: 10rem;
  height: auto;
  background: ${({ theme }) =>
    `linear-gradient(150deg, ${theme.colors.background} 0%, ${theme.colors.background} 55%, ${theme.colors.primarySoft} 100%)`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1280px) {
    padding: 0.875rem 1rem;
  }
`;

export const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  p {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 1280px) {
      font-size: 1.25rem;
    }
  }
`;

export const AccountInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const AccountType = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Balance = styled.span<{ $negative: boolean }>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ $negative, theme }) =>
    $negative ? theme.colors.danger : theme.colors.textPrimary};

  @media (max-width: 1280px) {
    font-size: 1.5rem;
  }
`;
