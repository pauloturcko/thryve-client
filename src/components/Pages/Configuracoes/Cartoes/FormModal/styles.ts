import { styled } from "styled-components";

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const Hint = styled.p`
  width: 100%;
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: -0.5rem;
`;
