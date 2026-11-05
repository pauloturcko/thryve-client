import { styled } from "styled-components";

export const FieldWrapper = styled.div<{ $inline?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ $inline }) => ($inline ? "auto" : "100%")};
  flex: ${({ $inline }) => ($inline ? "none" : "1 1 auto")};
  min-width: 0;
`;

export const FieldLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FieldError = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.danger};
`;
