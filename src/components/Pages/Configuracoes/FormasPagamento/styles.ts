import styled from "styled-components";

export const PreferencesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
