import styled from "styled-components";

export const AccountsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
